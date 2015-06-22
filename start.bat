
@echo off
echo.

set NodePackagesPath=E:\Projects\OpenShift\Materials\Node.jsPackageManager // This is my path, you can edit them

set Path=%NodePackagesPath%\node_modules\.bin;%PATH%
set Path=%NodePackagesPath%;%PATH%

set NODE_PATH=%NodePackagesPath%\node_modules;%NODE_PATH%
set NODE_ENV=production
set tokenKey=mykeysign123456
rem set DATABASE_URL=postgres://xwrolrqorvsjkc:NkXAGM4WvRMpjlub0PmtCdNKgR@ec2-54-83-25-238.compute-1.amazonaws.com:5432/d92uop68rtvi2q
set DATABASE_URL=postgres://node:node@127.0.0.1:5433/business
echo Environment variables are successfully added.
echo. 
echo. 
echo. 

nodemon app.js