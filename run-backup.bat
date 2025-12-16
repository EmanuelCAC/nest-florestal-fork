@echo off
echo ========================================
echo BACKUP AUTOMATICO - SERRA MAR
echo ========================================
echo.

cd /d "C:\Users\kleyt\Documents\PROJETOS\projeto_serra_mar_oficial\nest-florestal"

echo Executando backup...
call npx ts-node scripts/run-backup.ts

echo.
echo ========================================
echo Backup finalizado!
echo ========================================
pause
