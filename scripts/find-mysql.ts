import * as fs from 'fs';
import * as path from 'path';

console.log('🔍 Procurando instalação do MySQL no seu computador...\n');

const possiblePaths = [
  'C:\\Program Files\\MySQL',
  'C:\\Program Files (x86)\\MySQL',
  'C:\\xampp\\mysql',
  'C:\\wamp64\\bin\\mysql',
  'C:\\wamp\\bin\\mysql',
];

let found = false;

for (const basePath of possiblePaths) {
  if (fs.existsSync(basePath)) {
    console.log(`📁 Encontrado MySQL em: ${basePath}`);
    
    // Tenta encontrar o mysqldump.exe
    try {
      const searchForMysqldump = (dir: string): string[] => {
        const results: string[] = [];
        const items = fs.readdirSync(dir);
        
        for (const item of items) {
          const fullPath = path.join(dir, item);
          const stat = fs.statSync(fullPath);
          
          if (stat.isDirectory()) {
            results.push(...searchForMysqldump(fullPath));
          } else if (item === 'mysqldump.exe') {
            results.push(fullPath);
          }
        }
        
        return results;
      };
      
      const mysqldumps = searchForMysqldump(basePath);
      
      if (mysqldumps.length > 0) {
        console.log('✅ mysqldump.exe encontrado em:');
        mysqldumps.forEach((p) => console.log(`   ${p}`));
        console.log('\n📋 Copie um desses caminhos e use no próximo passo!');
        found = true;
      }
    } catch (error) {
      console.log('   (Erro ao procurar arquivos nesta pasta)');
    }
    
    console.log('');
  }
}

if (!found) {
  console.log('❌ MySQL não foi encontrado nas localizações padrão.');
  console.log('\n💡 Por favor, me diga onde você instalou o MySQL!');
  console.log('   Exemplos de onde procurar:');
  console.log('   - No Painel de Controle → Programas');
  console.log('   - Na pasta de instalação do XAMPP/WAMP');
  console.log('   - Procure por "MySQL" no explorador de arquivos');
}

console.log('\n═══════════════════════════════════════════════════════');
console.log('Pressione qualquer tecla para fechar...');
