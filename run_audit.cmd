@echo off
setlocal
set SCRIPT_DIR=%~dp0
node "%SCRIPT_DIR%audit_runner.js" %*
endlocal
