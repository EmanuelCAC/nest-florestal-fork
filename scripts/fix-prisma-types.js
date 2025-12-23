const fs = require('fs');
const path = require('path');

// Corrigir os arquivos prismaNamespace.ts e prismaNamespaceBrowser.ts
const files = [
  path.join(__dirname, '../src/generated/prisma/internal/prismaNamespace.ts'),
  path.join(__dirname, '../src/generated/prisma/internal/prismaNamespaceBrowser.ts'),
];

files.forEach((filePath) => {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Arquivo não encontrado: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Substituir as definições problemáticas no objeto NullTypes
  content = content.replace(
    /DbNull: runtime\.NullTypes\.DbNull as \(new \(secret: never\) => typeof runtime\.DbNull\),/g,
    'DbNull: runtime.DbNull as unknown as (new (secret: never) => typeof runtime.DbNull),'
  );

  content = content.replace(
    /JsonNull: runtime\.NullTypes\.JsonNull as \(new \(secret: never\) => typeof runtime\.JsonNull\),/g,
    'JsonNull: runtime.JsonNull as unknown as (new (secret: never) => typeof runtime.JsonNull),'
  );

  content = content.replace(
    /AnyNull: runtime\.NullTypes\.AnyNull as \(new \(secret: never\) => typeof runtime\.AnyNull\),/g,
    'AnyNull: runtime.AnyNull as unknown as (new (secret: never) => typeof runtime.AnyNull),'
  );

  fs.writeFileSync(filePath, content);
  console.log(`✅ ${path.basename(filePath)} corrigido com sucesso.`);
});

console.log('✅ Todos os tipos Prisma foram modificados com sucesso.');