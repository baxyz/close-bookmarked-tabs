// Create context menu item under "Close Multiple Tabs"
browser.contextMenus.create({
  id: "close-bookmarked-tabs",
  title: browser.i18n.getMessage("closeBookmarkedTabs"),
  contexts: ["tab"],
  parentId: "close-multiple-tabs"
});

// Listen for menu click
browser.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "close-bookmarked-tabs") {
    const bookmarks = await browser.bookmarks.getTree();
    const urls = [];
    function extractUrls(nodes) {
      for (const node of nodes) {
        if (node.url) urls.push(node.url);
        if (node.children) extractUrls(node.children);
      }
    }
    extractUrls(bookmarks);

    const tabs = await browser.tabs.query({});
    for (const t of tabs) {
      if (urls.includes(t.url)) {
        browser.tabs.remove(t.id);
      }
    }
  }
});
