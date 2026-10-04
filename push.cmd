@echo off
REM Words Adventure - double-click to commit + push everything to GitHub (-> words.jacobsiler.com).
setlocal
set "PS1=%~dp0scripts\wa-push.ps1"
if not exist "%PS1%" (
  echo Could not find %PS1%
  pause
  exit /b 1
)
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%PS1%"
endlocal
