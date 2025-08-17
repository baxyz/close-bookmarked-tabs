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
 * Menu item identifier
 * @constant {string}
 */
export const MENU_ITEM_ID = 'close-bookmarked-tabs';

/**
 * Create the context menu item for closing bookmarked tabs
 */
export async function createContextMenuItem() {
  return browser.menus.create({
    id: MENU_ITEM_ID,
    title: browser.i18n.getMessage("closeBookmarkedTabs"),
    contexts: ["tab"],
    icons: {
      "16": "icons/empty_16.png",
    },
    enabled: false
  });
}

/**
 * Update menu item state based on whether there are bookmarked tabs
 * @param {boolean} hasBookmarks - Whether there are bookmarked tabs
 */
export async function updateMenuState(hasBookmarks) {
  await browser.menus.update(MENU_ITEM_ID, {
    enabled: hasBookmarks
  });
  await browser.menus.refresh();
}
