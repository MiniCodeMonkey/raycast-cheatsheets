# tmux cheat sheet

Default key bindings. Press the prefix **C-b**, then the key.

## Sessions
| Key | Action |
|---|---|
| `d` | Detach |
| `s` | List sessions |
| `$` | Rename session |
| `(` / `)` | Previous / next session |
| `L` | Last session |

## Windows
| Key | Action |
|---|---|
| `c` | New window |
| `,` | Rename window |
| `&` | Kill window |
| `n` / `p` | Next / previous window |
| `l` | Last window |
| `0`..`9` | Jump to window |
| `w` | Pick window from a tree |
| `.` | Move window to index |

## Panes
| Key | Action |
|---|---|
| `%` | Split left/right |
| `"` | Split top/bottom |
| `Arrows` | Move between panes |
| `o` | Next pane |
| `;` | Last pane |
| `q` | Show pane numbers |
| `z` | Zoom pane |
| `x` | Kill pane |
| `!` | Break pane into a window |
| `{` / `}` | Swap pane with previous / next |
| `Space` | Cycle layouts |
| `C-Arrows` | Resize by 1 |
| `M-Arrows` | Resize by 5 |

## Copy mode
| Key | Action |
|---|---|
| `[` | Enter copy mode |
| `]` | Paste |
| `PageUp` | Enter copy mode and scroll up |
| `=` | Choose a paste buffer |

## Misc
| Key | Action |
|---|---|
| `:` | Command prompt |
| `?` | List all key bindings |
| `t` | Show a clock |
| `C-b` | Send a literal C-b |

## From the shell
```
tmux new -s work          # new session named work
tmux ls                   # list sessions
tmux attach -t work       # attach to work
tmux kill-session -t work
```
