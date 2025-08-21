/**
 * Close Bookmarked Tabs - Firefox Extension
 * Copyright (C) 2025 baxyz
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

/**
 * Cache management for bookmark URLs
 * @private
 */
const bookmarkCache = {
  urls: null,
  lastUpdate: null
};

/**
 * Invalidate the URL cache
 */
export function invalidateCache() {
  bookmarkCache.urls = null;
  bookmarkCache.lastUpdate = null;
}

/**
 * Get cached URLs or fetch new ones
 * @private
 */
async function getCachedUrls() {
  if (!bookmarkCache.urls) {
    const bookmarkTree = await browser.bookmarks.getTree();
    bookmarkCache.urls = extractUrls(bookmarkTree);
    bookmarkCache.lastUpdate = Date.now();
  }
  return bookmarkCache.urls;
}

/**
 * Get all URLs from bookmarks and close matching tabs
 * @returns {Promise<number>} Number of tabs closed
 */
export async function closeBookmarkedTabs() {
  // Get bookmarked URLs from cache
  const bookmarkUrls = await getCachedUrls();

  // Find and close matching tabs
  const tabs = await browser.tabs.query({});
  const tabIdsToClose = tabs
    .filter(tab => bookmarkUrls.includes(tab.url))
    .map(tab => tab.id);

  if (tabIdsToClose.length > 0) {
    await browser.tabs.remove(tabIdsToClose);

    // Show notification
    const message = tabIdsToClose.length === 1
      ? browser.i18n.getMessage('notificationSingle', [tabIdsToClose.length.toString()])
      : browser.i18n.getMessage('notificationMultiple', [tabIdsToClose.length.toString()]);

    await browser.notifications.create({
      type: 'basic',
      // iconUrl: 'icons/icon_48.png',
      title: browser.i18n.getMessage('notificationTitle'),
      message: message
    });
  }

  return tabIdsToClose.length;
}

/**
 * Check if there are any open tabs that are bookmarked
 * @returns {Promise<boolean>}
 */
export async function hasBookmarkedTabs() {
  const bookmarkUrls = await getCachedUrls();
  const tabs = await browser.tabs.query({});
  return tabs.some(tab => bookmarkUrls.includes(tab.url));
}

/**
 * Count how many open tabs are bookmarked
 * @returns {Promise<number>}
 */
export async function countBookmarkedTabs() {
  const bookmarkUrls = await getCachedUrls();
  const tabs = await browser.tabs.query({});
  return tabs.filter(tab => bookmarkUrls.includes(tab.url)).length;
}

/**
 * Extract URLs from bookmark tree
 * @private
 */
function extractUrls(nodes) {
  return Array.from(nodes).flatMap(node => [
    ...(node.url ? [node.url] : []),
    ...(node.children ? extractUrls(node.children) : [])
  ]);
}