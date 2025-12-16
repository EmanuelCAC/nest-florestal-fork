# 🔄 Sistema de Backup Automático

Sistema completo de backup do banco de dados MySQL com upload automático para Google Drive e agendamento via cronjob.

## 📋 Índice

1. [Pré-requisitos](#pré-requisitos)
2. [Instalação](#instalação)
3. [Configuração Google Drive](#configuração-google-drive)
4. [Configuração das Variáveis de Ambiente](#configuração-das-variáveis-de-ambiente)
5. [Como Testar](#como-testar)
6. [Configurar Cronjob](#configurar-cronjob)
7. [Scripts Disponíveis](#scripts-disponíveis)
8. [Solução de Problemas](#solução-de-problemas)

---

## 🔧 Pré-requisitos

- Node.js instalado
- MySQL instalado e rodando
- `mysqldump` disponível no PATH (vem com MySQL)
- Conta Google (para Google Drive)

---

## 📦 Instalação

### 1. Instalar dependências necessárias

```bash
npm install googleapis
npm install -D @types/node
```

---

## 🔐 Configuração Google Drive

### Passo 1: Criar Projeto no Google Cloud Console

1. Acesse: https://console.cloud.google.com/
2. Clique em "Select a project" → "NEW PROJECT"
3. Nome do projeto: `Serra Mar Backup` (ou o nome que preferir)
4. Clique em "CREATE"

### Passo 2: Habilitar Google Drive API

1. No menu lateral, vá em: **APIs & Services** → **Library**
2. Pesquise por: `Google Drive API`
3. Clique em "ENABLE"

### Passo 3: Criar Credenciais (Service Account)

1. Vá em: **APIs & Services** → **Credentials**
2. Clique em: **+ CREATE CREDENTIALS** → **Service account**
3. Preencha:
   - **Service account name**: `backup-service`
   - **Service account ID**: será gerado automaticamente
4. Clique em **CREATE AND CONTINUE**
5. Em "Grant this service account access to project":
   - Selecione a role: **Basic** → **Editor** (ou crie uma role customizada se preferir)
6. Clique em **CONTINUE** e depois **DONE**

### Passo 4: Gerar Chave JSON

1. Na lista de Service Accounts, clique no email da conta criada
2. Vá na aba **KEYS**
3. Clique em **ADD KEY** → **Create new key**
4. Selecione **JSON**
5. Clique em **CREATE**
6. Um arquivo JSON será baixado automaticamente

### Passo 5: Salvar o Arquivo de Credenciais

1. Renomeie o arquivo baixado para: `google-credentials.json`
2. Mova para o diretório do projeto:
   ```
   projeto_serra_mar_oficial/nest-florestal/google-credentials.json
   ```

⚠️ **IMPORTANTE**: Adicione esse arquivo ao `.gitignore` para não commitar credenciais!

### Passo 6: Criar Pasta no Google Drive (Opcional mas Recomendado)

1. Acesse seu Google Drive: https://drive.google.com
2. Crie uma pasta chamada: `Backups Serra Mar`
3. Clique com botão direito na pasta → "Share"
4. Adicione o email do Service Account (está no arquivo JSON no campo `client_email`)
   - Exemplo: `backup-service@serra-mar-backup.iam.gserviceaccount.com`
5. Dê permissão de **Editor**
6. Copie o **ID da pasta** da URL:
   - URL: `https://drive.google.com/drive/folders/1a2B3c4D5e6F7g8H9i0J`
   - ID: `1a2B3c4D5e6F7g8H9i0J` (tudo depois de `/folders/`)

---

## ⚙️ Configuração das Variáveis de Ambiente

Edite o arquivo `.env` e adicione:

```env
# Configuração existente do banco
JWT_SECRET=JHSAHSHSADHDASHG
DATABASE_URL="mysql://root:a1b2c3d4@localhost:3306/serra_mar_db"

# ==================== CONFIGURAÇÃO DE BACKUP ====================

# Caminho para o arquivo de credenciais do Google
GOOGLE_CREDENTIALS_PATH="./google-credentials.json"

# ID da pasta do Google Drive (opcional, mas recomendado)
# Se não especificar, os backups ficarão na raiz do Drive
GOOGLE_DRIVE_FOLDER_ID="1a2B3c4D5e6F7g8H9i0J"
```

### 📝 Exemplo Completo do `.env`

```env
JWT_SECRET=JHSAHSHSADHDASHG
DATABASE_URL="mysql://root:a1b2c3d4@localhost:3306/serra_mar_db"
GOOGLE_CREDENTIALS_PATH="./google-credentials.json"
GOOGLE_DRIVE_FOLDER_ID="1a2B3c4D5e6F7g8H9i0J"
```

---

## 🧪 Como Testar

### Teste 1: Backup Local (sem upload)

```bash
npx ts-node scripts/backup-database.ts
```

**O que esperar:**
- ✅ Mensagem: "Backup criado com sucesso"
- ✅ Arquivo criado em: `backups/serra_mar_db_backup_YYYY-MM-DD_HH-MM-SS.sql`
- ✅ Tamanho do arquivo exibido

### Teste 2: Upload para Google Drive

```bash
npx ts-node scripts/upload-to-drive.ts backups/seu-arquivo-backup.sql
```

**O que esperar:**
- ✅ Mensagem: "Upload concluído com sucesso"
- ✅ ID do arquivo no Drive
- ✅ Link para visualização

**Verificar:**
- Acesse seu Google Drive
- Vá na pasta "Backups Serra Mar" (se configurou)
- O arquivo de backup deve estar lá

### Teste 3: Processo Completo (Backup + Upload)

```bash
npx ts-node scripts/run-backup.ts
```

**O que esperar:**
```
═══════════════════════════════════════════════════════
🔄 BACKUP AUTOMÁTICO DO BANCO DE DADOS
═══════════════════════════════════════════════════════
⏰ Horário: 15/12/2024, 14:30:00
═══════════════════════════════════════════════════════

🚀 Iniciando backup do banco de dados...
📁 Diretório de backup: C:\...\backups
📄 Arquivo de backup: serra_mar_db_backup_2024-12-15_14-30-00.sql
⏳ Executando mysqldump...
✅ Backup criado com sucesso!
📊 Tamanho do arquivo: 1.23 MB
📍 Localização: C:\...\backups\serra_mar_db_backup_2024-12-15_14-30-00.sql

🧹 Removendo backups antigos (mantendo 7 mais recentes)...
✅ 0 backup(s) antigo(s) removido(s)

☁️  Iniciando upload para Google Drive...
📄 Arquivo: serra_mar_db_backup_2024-12-15_14-30-00.sql
📊 Tamanho: 1.23 MB
📁 Pasta de destino: 1a2B3c4D5e6F7g8H9i0J
⏳ Fazendo upload...
✅ Upload concluído com sucesso!
🆔 ID do arquivo: 9z8y7x6w5v4u3t2s1r0q
🔗 Link: https://drive.google.com/file/d/...

🧹 Limpando backups antigos do Google Drive...
📋 Encontrados 3 backup(s) no Drive
✅ Nenhum backup antigo para remover

═══════════════════════════════════════════════════════
✅ BACKUP CONCLUÍDO COM SUCESSO!
═══════════════════════════════════════════════════════
```

---

## ⏰ Configurar Cronjob (Backup Automático)

### Windows (Task Scheduler)

#### Opção 1: Interface Gráfica

1. Abra o **Task Scheduler** (Agendador de Tarefas)
2. Clique em **Create Basic Task**
3. Nome: `Serra Mar Database Backup`
4. Descrição: `Backup automático diário do banco de dados`
5. Trigger: **Daily** → Escolha o horário (ex: 03:00 AM)
6. Action: **Start a program**
   - Program/script: `C:\Program Files\nodejs\node.exe`
   - Arguments: `C:\Users\kleyt\Documents\PROJETOS\projeto_serra_mar_oficial\nest-florestal\node_modules\.bin\ts-node C:\Users\kleyt\Documents\PROJETOS\projeto_serra_mar_oficial\nest-florestal\scripts\run-backup.ts`
   - Start in: `C:\Users\kleyt\Documents\PROJETOS\projeto_serra_mar_oficial\nest-florestal`

#### Opção 2: Script BAT (Mais Fácil)

Crie um arquivo `run-backup.bat` na raiz do projeto:

```batch
@echo off
cd /d "C:\Users\kleyt\Documents\PROJETOS\projeto_serra_mar_oficial\nest-florestal"
call npx ts-node scripts/run-backup.ts >> logs/backup.log 2>&1
```

Depois agende este arquivo `.bat` no Task Scheduler.

### Linux/Mac (Crontab)

```bash
# Editar crontab
crontab -e

# Adicionar linha (backup diário às 3h da manhã)
0 3 * * * cd /caminho/do/projeto/nest-florestal && npx ts-node scripts/run-backup.ts >> logs/backup.log 2>&1
```

**Exemplos de agendamentos:**
- `0 3 * * *` - Todo dia às 3h da manhã
- `0 */6 * * *` - A cada 6 horas
- `0 0 * * 0` - Todo domingo à meia-noite
- `0 2 * * 1-5` - Segunda a sexta às 2h

---

## 📜 Scripts Disponíveis

### 1. `backup-database.ts`
Cria backup local do banco de dados MySQL.

```bash
npx ts-node scripts/backup-database.ts
```

**Funcionalidades:**
- ✅ Faz dump completo do banco
- ✅ Gera arquivo com timestamp
- ✅ Remove backups antigos (mantém últimos 7)

### 2. `upload-to-drive.ts`
Faz upload de um arquivo para o Google Drive.

```bash
npx ts-node scripts/upload-to-drive.ts <caminho-do-arquivo>
```

**Funcionalidades:**
- ✅ Upload autenticado com Service Account
- ✅ Organiza em pasta específica
- ✅ Remove backups antigos do Drive (mantém últimos 7)

### 3. `run-backup.ts`
Executa o processo completo: backup + upload.

```bash
npx ts-node scripts/run-backup.ts
```

**Funcionalidades:**
- ✅ Backup do banco
- ✅ Upload para Drive
- ✅ Limpeza de backups antigos (local e Drive)
- ✅ Logs formatados e coloridos

---

## 🔍 Adicionar ao package.json

Adicione estes scripts no `package.json` para facilitar:

```json
{
  "scripts": {
    "backup": "ts-node scripts/run-backup.ts",
    "backup:local": "ts-node scripts/backup-database.ts",
    "backup:upload": "ts-node scripts/upload-to-drive.ts"
  }
}
```

Agora você pode usar:
```bash
npm run backup           # Backup completo
npm run backup:local     # Apenas backup local
npm run backup:upload    # Apenas upload (precisa passar arquivo)
```

---

## 🐛 Solução de Problemas

### Erro: "mysqldump: command not found"

**Solução Windows:**
1. Encontre onde o MySQL está instalado (geralmente `C:\Program Files\MySQL\MySQL Server 8.0\bin`)
2. Adicione ao PATH do sistema:
   - Painel de Controle → Sistema → Configurações avançadas
   - Variáveis de Ambiente
   - Editar PATH e adicionar o caminho do bin do MySQL

### Erro: "DATABASE_URL não encontrada"

**Solução:**
- Verifique se o arquivo `.env` está na raiz do projeto
- Confirme que a variável `DATABASE_URL` está definida

### Erro: "GOOGLE_CREDENTIALS_PATH não definida"

**Solução:**
- Adicione `GOOGLE_CREDENTIALS_PATH="./google-credentials.json"` no `.env`
- Verifique se o arquivo `google-credentials.json` existe no caminho especificado

### Erro: "Insufficient Permission" no Google Drive

**Solução:**
- Verifique se você compartilhou a pasta do Drive com o email do Service Account
- Confirme que deu permissão de "Editor"
- Verifique se o `GOOGLE_DRIVE_FOLDER_ID` está correto

### Erro: "Access denied for user"

**Solução:**
- Verifique as credenciais do MySQL na `DATABASE_URL`
- Confirme que o usuário tem permissões de leitura no banco

### Backup criado mas arquivo vazio

**Solução:**
- Verifique se o banco de dados tem dados
- Confirme que o usuário MySQL tem permissões adequadas
- Tente executar o mysqldump manualmente para ver mensagens de erro

---

## 📊 Estrutura de Arquivos Criada

```
nest-florestal/
├── scripts/
│   ├── backup-database.ts      # Script de backup do MySQL
│   ├── upload-to-drive.ts      # Script de upload para Drive
│   └── run-backup.ts            # Script completo
├── backups/                     # Pasta criada automaticamente
│   └── serra_mar_db_backup_*.sql
├── google-credentials.json      # Credenciais do Google (não commitar!)
└── .env                         # Variáveis de ambiente
```

---

## 🎯 Checklist de Configuração

- [ ] Dependências instaladas (`googleapis`)
- [ ] Google Cloud Console configurado
- [ ] Google Drive API habilitada
- [ ] Service Account criado
- [ ] Arquivo `google-credentials.json` baixado e colocado no projeto
- [ ] Pasta criada no Google Drive
- [ ] Service Account adicionado à pasta com permissão de Editor
- [ ] Variáveis `GOOGLE_CREDENTIALS_PATH` e `GOOGLE_DRIVE_FOLDER_ID` no `.env`
- [ ] Teste de backup local executado com sucesso
- [ ] Teste de upload executado com sucesso
- [ ] Teste do processo completo executado com sucesso
- [ ] Cronjob/Task Scheduler configurado
- [ ] `.gitignore` atualizado para excluir `google-credentials.json` e `backups/`

---

## 🔒 Segurança

⚠️ **NUNCA** commite no Git:
- `google-credentials.json`
- Arquivos de backup (`.sql`)
- Arquivo `.env`

Adicione ao `.gitignore`:
```
google-credentials.json
backups/
*.sql
.env
```

---

## 📞 Suporte

Se encontrar problemas, verifique:
1. Logs de erro detalhados no console
2. Permissões do MySQL
3. Credenciais do Google Drive
4. Conectividade com internet (para upload)

---

**Criado em:** 15/12/2024  
**Última atualização:** 15/12/2024
