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

To jump straight to one sheet, type `cheatsheet`, press Tab, type the sheet name (or just its start, like `tm`) and press Enter. If more than one sheet matches, you get the list filtered to those.

## Writing cheat sheets

A cheat sheet is a regular Markdown file. The file name, minus its extension, becomes the name shown in the list, so `docker.md` shows up as "docker". Headings, tables and fenced code blocks all render. On narrow sheets the side pane works well; for wide tables, press Enter to see the full width.

To use a different folder, open the extension's preferences in Raycast (`⌘K` → Configure Extension) and change **Cheat Sheet Folder**. `~` expands to your home folder.

## License

MIT
