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

## Multiplayer + game lobby (Oct 2026)
All six games support Solo, Teamwork, Face-off and Race, plus a "Find a game to join" lobby that lists open rooms from every family
(`wordGameRoomsPublic`; only game, mode, first name, avatar and player count are published, never a family code).
A room can be set to family-only with the toggle on the room screen.
Multiplayer switches itself on when the site can read the Realtime Database (a quick probe at start-up); until the rules are published
the games stay solo-only. To publish: run `scripts\wa-deploy-rules.cmd` (or `C:\dev\firebase-rules\deploy.cmd homeschool-math`).
`firebase\database.rules.json` is the full set for Math + Words, so it is safe for both apps. Add `?mp=0` to the URL to force solo.
