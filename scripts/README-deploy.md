# Words Adventure - push + auto-push watcher

Live site: https://words.jacobsiler.com (GitHub Pages, branch `main`, repo root).

## One-off push
Double-click `push.cmd` in the repo root. It refuses to commit secret-looking files, rebases if GitHub is
ahead (never force-pushes), commits everything (message from `.pending-commit.txt` if present), and pushes.

## Auto-push (tray watcher)
1. Double-click `scripts\wa-start-watcher.cmd` once. It starts the watcher and adds it to Windows startup.
2. A violet "W" appears in the system tray. Right-click: Push now, Pause, logs, open site, Quit.
3. The canary is `deploy-tick.txt` (gitignored). Any time its modified-time changes, the watcher waits
   ~8 s and runs the push. Tick it by hand with:  `echo %date% %time% > deploy-tick.txt`
   Claude ticks it after finishing substantial changes.
Colours: green idle, yellow change detected, blue pushing, red failed, gray paused.
Stop it with `scripts\wa-stop-watcher.cmd`. Logs: `logs\push.log`, `logs\watcher.log`.

## Games (wa-games.js + wa-game-*.js)
Play Games button: home screen and learner dashboard. Solo works everywhere. Playing together (co-op, face-off, race)
is OFF until you open the site with `?mp=1` AND the Realtime Database rules are published:
run `scripts\wa-deploy-rules.cmd` once (one rules file covers Math + Words rooms, because they share the database).
Add a game: copy any `wa-game-*.js`, change the data, add a `<script>` line in index.html next to the others.
