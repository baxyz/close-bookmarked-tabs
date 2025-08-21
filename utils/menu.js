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
 * Get dynamic menu label based on number of bookmarked tabs
 * @param {number} count - Number of bookmarked tabs
 * @returns {string} Localized menu label
 */
function getMenuLabel(count) {
  if (count === 0) {
    return browser.i18n.getMessage("menuNoTabs");
  } else if (count === 1) {
    return browser.i18n.getMessage("menuSingleTab");
  } else {
    return browser.i18n.getMessage("menuMultipleTabs", [count.toString()]);
  }
}

/**
 * Create the context menu item for closing bookmarked tabs
 */
export async function createContextMenuItem() {
  return browser.menus.create({
    id: MENU_ITEM_ID,
    title: getMenuLabel(0),
    contexts: ["tab"],
    icons: {
      "16": "icons/empty_16.png",
    },
    enabled: false
  });
}

/**
 * Update menu item state based on number of bookmarked tabs
 * @param {number} count - Number of bookmarked tabs
 */
export async function updateMenuState(count) {
  await browser.menus.update(MENU_ITEM_ID, {
    title: getMenuLabel(count),
    enabled: count > 0
  });
  await browser.menus.refresh();
}
