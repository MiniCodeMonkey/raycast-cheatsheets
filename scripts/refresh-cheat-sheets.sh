#!/bin/bash

# @raycast.schemaVersion 1
# @raycast.title Refresh Cheat Sheets
# @raycast.mode compact
# @raycast.icon 🔄
# @raycast.packageName Cheat Sheets

# Writes one "Cheatsheet: <name>" command per file in ~/cheatsheets (or $CHEATSHEETS_DIR). Markdown
# sheets open inside the Cheat Sheets extension, anything else in its default app.
# Raycast reads metadata lines anywhere in a script, so the generated headers
# are assembled from $tag and never appear literally here.
dir="$(cd "$(dirname "$0")" && pwd)"
tag='# @raycast'
sheets="${CHEATSHEETS_DIR:-$HOME/cheatsheets}"
extension='raycast://extensions/mathias/cheatsheets/index'

rm -f "$dir"/cheat-*.sh "$dir"/cheatsheet.sh
count=0
for file in "$sheets"/*; do
  [ -f "$file" ] || continue
  name="$(basename "${file%.*}")"
  slug="$(echo "$name" | tr -c 'a-zA-Z0-9\n' '-')"
  if [[ "$file" == *.md ]]; then
    context="$(jq -rn --arg sheet "$name" '{sheet: $sheet} | tojson | @uri')"
    target="$extension?launchContext=$context"
  else
    target="$file"
  fi
  printf '#!/bin/bash\n\n%s.schemaVersion 1\n%s.title Cheatsheet: %s\n%s.mode silent\n%s.icon 📄\n%s.packageName Cheat Sheets\n\nopen "%s"\n' \
    "$tag" "$tag" "$name" "$tag" "$tag" "$tag" "$target" > "$dir/cheat-$slug.sh"
  chmod +x "$dir/cheat-$slug.sh"
  count=$((count + 1))
done
echo "$count cheat sheets"
