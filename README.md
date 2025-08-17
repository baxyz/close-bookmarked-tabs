# Close Bookmarked Tabs

A Firefox extension that closes all tabs that are present in your bookmarks.

## Features

- Adds a "Close bookmarked tabs" option in the tab context menu
- Works with Firefox's "Close Multiple Tabs" submenu
- Smart bookmark caching for better performance
- Multi-language support (EN, FR)

## Description

**Description :**
Streamline your browsing experience with this efficient Firefox extension that instantly closes all tabs already saved in your bookmarks. Perfect for users who bookmark pages for later reading but forget to close them, leading to cluttered tab bars and slower browser performance. Simply right-click any tab and select "Close bookmarked tabs" from the context menu to automatically identify and close all tabs that are already safely stored in your bookmarks. Features smart caching for optimal performance and supports multiple languages including English and French.

## Installation

### For Development

1. Clone this repository:
```bash
git clone https://github.com/yourusername/close-bookmarked-tabs.git
cd close-bookmarked-tabs
```

2. In Firefox, go to `about:debugging`
3. Click on "This Firefox"
4. Click on "Load Temporary Add-on"
5. Select the project's `manifest.json` file

### For Usage

- The extension will soon be available on the Firefox Add-ons Store

## Usage

1. Right-click on a tab
2. In the "Close Multiple Tabs" submenu
3. Click on "Close bookmarked tabs"

## Development

### Project Structure

```
close-bookmarked-tabs/
├── manifest.json          # Extension configuration
├── background.js         # Main script
├── utils/
│   └── bookmarks.js     # Bookmark management utilities
└── _locales/            # Translation files
    ├── en/
    │   └── messages.json
    └── fr/
        └── messages.json
```

### Useful Commands

```bash
# Create distribution zip
zip -r close-bookmarked-tabs.zip manifest.json background.js utils/ _locales/ icons/ --exclude="*.zip"
```

## License

AGPL-3.0

## Contributing

Contributions are welcome! Feel free to:
1. Fork the project
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request