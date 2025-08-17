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
 * @returns {Promise<void>}
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
  }
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
 * Extract URLs from bookmark tree
 * @private
 */
function extractUrls(nodes) {
  return Array.from(nodes).flatMap(node => [
    ...(node.url ? [node.url] : []),
    ...(node.children ? extractUrls(node.children) : [])
  ]);
}