/**
 * Menu management utilities
 */

/**
 * Menu item identifier
 * @constant {string}
 */
export const MENU_ITEM_ID = 'close-bookmarked-tabs';

/**
 * Create the context menu item for closing bookmarked tabs
 */
export function createContextMenuItem() {
  browser.menus.create({
    id: MENU_ITEM_ID,
    title: browser.i18n.getMessage("closeBookmarkedTabs"),
    contexts: ["tab"],
    icons: {
      "16": "icons/icon-16.png"
    },
    enabled: false
  });
}

/**
 * Update menu item state based on whether there are bookmarked tabs
 * @param {boolean} enabled - Whether there are bookmarked tabs
 */
export async function updateMenuState(hasBookmarks) {
  await browser.menus.update(MENU_ITEM_ID, {
    enabled: hasBookmarks
  });
  await browser.menus.refresh();
}
