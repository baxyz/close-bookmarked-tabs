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

import { closeBookmarkedTabs, invalidateCache, countBookmarkedTabs } from './utils/bookmarks.js';
import { MENU_ITEM_ID, createContextMenuItem, updateMenuState } from './utils/menu.js';

// Initialize context menu and check initial state
async function initialize() {
  await createContextMenuItem();
  await checkMenuState();
}

// Check initial state
async function checkMenuState() {
  const count = await countBookmarkedTabs();
  await updateMenuState(count);
}

// Start initialization
initialize();

// Listen for tab updates to check menu state
['onUpdated', 'onRemoved', 'onCreated'].forEach(event => {
  browser.tabs[event].addListener(checkMenuState);
});

// Listen for bookmark changes
['onCreated', 'onRemoved', 'onChanged', 'onMoved'].forEach(event => {
  browser.bookmarks[event].addListener(() => {
    invalidateCache();
    checkMenuState();
  });
});

// Listen for menu click
browser.menus.onClicked.addListener((info, tab) => {
  console.log("Menu clicked:", info.menuItemId);
  if (info.menuItemId === MENU_ITEM_ID) {
    closeBookmarkedTabs();
  }
});
