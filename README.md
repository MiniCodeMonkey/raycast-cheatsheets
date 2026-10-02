# Raycast Cheat Sheets

A small Raycast extension for keeping cheat sheets one keystroke away. Put Markdown files in a folder, open Raycast, type `cheatsheet`, and search them with a live preview. Press Enter to read the whole sheet inside Raycast.

## What it does

- Lists every file in your cheat sheet folder (`~/cheatsheets` by default).
- Shows a Markdown preview in the side pane as you move through the list.
- Enter opens the full sheet in Raycast. `⌘K` offers "Open in Default App" and "Show in Finder".
- Files that aren't Markdown, like PDFs, open in their default app because Raycast can't display them.
- New files show up the next time you open the command.

## Install

This extension isn't in the Raycast Store, so you install it from source. You need [Node.js](https://nodejs.org) 22 or newer.

```sh
git clone https://github.com/MiniCodeMonkey/raycast-cheatsheets.git
cd raycast-cheatsheets
npm install
npm run dev
```

`npm run dev` builds the extension and adds it to Raycast. When you see `built extension successfully`, press `Ctrl-C` to stop it. The extension stays installed and appears under **Development** in Raycast's root search.

Then add a sheet. The repo includes a generic tmux one:

```sh
mkdir -p ~/cheatsheets
cp examples/tmux.md ~/cheatsheets/
```

Open Raycast, type `cheatsheet`, and press Enter.

## Writing cheat sheets

A cheat sheet is a regular Markdown file. The file name, minus its extension, becomes the name shown in the list, so `docker.md` shows up as "docker". Headings, tables and fenced code blocks all render. On narrow sheets the side pane works well; for wide tables, press Enter to see the full width.

To use a different folder, open the extension's preferences in Raycast (`⌘K` → Configure Extension) and change **Cheat Sheet Folder**. `~` expands to your home folder.

## Optional: one command per sheet

If you'd rather type `cheat tmux` in root search and land on that sheet directly, `scripts/refresh-cheat-sheets.sh` generates a Raycast script command called "Cheatsheet: <name>" for each file.

1. Copy `scripts/refresh-cheat-sheets.sh` into a folder of your own, for example `~/.config/raycast/scripts`.
2. In Raycast settings, open **Script Commands** and add that folder.
3. Run **Refresh Cheat Sheets** from Raycast. Run it again whenever you add or remove a sheet.

Markdown sheets open inside the extension; anything else opens in its default app. The first time a generated command opens the extension, Raycast asks for permission. Choose **Always Run Command**. If your sheets live somewhere other than `~/cheatsheets`, change the `sheets=` line near the top of the script. The script uses [`jq`](https://jqlang.org) to build the links.

## License

MIT
