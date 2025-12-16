# 🚀 GUIA RÁPIDO DE INSTALAÇÃO - BACKUP AUTOMÁTICO

## Passo 1️⃣: Instalar Dependência

```bash
npm install googleapis
```

## Passo 2️⃣: Configurar Google Drive

### A) Criar Service Account no Google Cloud

1. Acesse: https://console.cloud.google.com/
2. Crie novo projeto: "Serra Mar Backup"
3. Habilite "Google Drive API"
4. Crie Service Account:
   - Nome: `backup-service`
   - Role: Editor
5. Crie chave JSON e baixe o arquivo

### B) Salvar Credenciais

1. Renomeie arquivo baixado para: `google-credentials.json`
2. Coloque na raiz do projeto: `nest-florestal/google-credentials.json`

### C) Criar Pasta no Drive

1. Crie pasta: "Backups Serra Mar"
2. Compartilhe com email do Service Account (está no JSON)
3. Dê permissão de "Editor"
4. Copie o ID da pasta (da URL)

## Passo 3️⃣: Configurar .env

Adicione no arquivo `.env`:

```env
# Configuração de Backup
GOOGLE_CREDENTIALS_PATH="./google-credentials.json"
GOOGLE_DRIVE_FOLDER_ID="COLE_O_ID_DA_PASTA_AQUI"
```

## Passo 4️⃣: Testar

```bash
# Teste completo
npm run backup

# Ou use o arquivo BAT (Windows)
run-backup.bat
```

## Passo 5️⃣: Agendar (Windows)

1. Abra "Agendador de Tarefas" (Task Scheduler)
2. Criar Tarefa Básica
3. Nome: "Backup Serra Mar"
4. Gatilho: Diário às 3h da manhã
5. Ação: Executar `run-backup.bat`

## ✅ Pronto!

Seu backup automático está configurado! 🎉

---

📖 **Documentação completa:** Veja `BACKUP-README.md`
