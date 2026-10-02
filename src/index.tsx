import { Action, ActionPanel, Detail, getPreferenceValues, Icon, LaunchProps, List, openExtensionPreferences } from "@raycast/api";
import { existsSync, readdirSync, readFileSync } from "fs";
import { homedir } from "os";
import { extname, join, parse } from "path";

const directory = getPreferenceValues<{ directory?: string }>().directory?.trim().replace(/^~(?=$|\/)/, homedir()) || join(homedir(), "cheatsheets");

type Sheet = { name: string; path: string; isMarkdown: boolean };

function loadSheets(): Sheet[] {
  if (!existsSync(directory)) {
    return [];
  }
  return readdirSync(directory)
    .filter((file) => !file.startsWith("."))
    .sort()
    .map((file) => ({
      name: parse(file).name,
      path: join(directory, file),
      isMarkdown: extname(file).toLowerCase() === ".md",
    }));
}

// Raycast can't render PDFs, so those get a placeholder and open in their default app.
function markdownFor(sheet: Sheet): string {
  return sheet.isMarkdown ? readFileSync(sheet.path, "utf8") : `# ${sheet.name}\n\nPDF. Press Enter to open it.`;
}

function SheetDetail({ sheet }: { sheet: Sheet }) {
  return (
    <Detail
      navigationTitle={sheet.name}
      markdown={markdownFor(sheet)}
      actions={
        <ActionPanel>
          <Action.Open title="Open in Default App" target={sheet.path} />
          <Action.ShowInFinder path={sheet.path} />
        </ActionPanel>
      }
    />
  );
}

export default function Command(props: LaunchProps<{ launchContext: { sheet?: string } }>) {
  const sheets = loadSheets();

  const requested = sheets.find((sheet) => sheet.name === props.launchContext?.sheet);
  if (requested) {
    return <SheetDetail sheet={requested} />;
  }

  return (
    <List isShowingDetail searchBarPlaceholder="Search cheat sheets">
      <List.EmptyView
        icon={Icon.Document}
        title="No cheat sheets yet"
        description={`Add Markdown files to ${directory}, or pick another folder in the extension preferences.`}
        actions={
          <ActionPanel>
            <Action title="Open Extension Preferences" icon={Icon.Gear} onAction={openExtensionPreferences} />
          </ActionPanel>
        }
      />
      {sheets.map((sheet) => (
        <List.Item
          key={sheet.path}
          title={sheet.name}
          icon={sheet.isMarkdown ? Icon.Document : Icon.Book}
          detail={<List.Item.Detail markdown={markdownFor(sheet)} />}
          actions={
            <ActionPanel>
              {sheet.isMarkdown && (
                <Action.Push title="View Full Sheet" icon={Icon.Eye} target={<SheetDetail sheet={sheet} />} />
              )}
              <Action.Open title="Open in Default App" target={sheet.path} />
              <Action.ShowInFinder path={sheet.path} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
