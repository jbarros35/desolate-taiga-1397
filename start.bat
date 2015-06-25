@echo off
echo.

set Path=%NodePackagesPath%\node_modules\.bin;%PATH%
set Path=%NodePackagesPath%;%PATH%

set NODE_PATH=%NodePackagesPath%\node_modules;%NODE_PATH%
set NODE_ENV=production
set tokenKey=mykeysign123456
set DATABASE_URL=postgres://node:node@127.0.0.1:5432/business
rem set BATCH=true
echo Environment variables are successfully added.
echo. 
echo. 
echo. 

nodemon app.js
pause