import * as fs from 'fs';

const files = ['vocabService.ts', 'chunk1.ts', 'chunk2.ts', 'chunk3.ts', 'chunk4.ts', 'chunk5.ts', 'chunk6.ts', 'chunk7.ts', 'chunk8.ts', 'chunk9.ts', 'chunk10.ts'];
for (const file of files) {
    const path = `./src/${file}`;
    if (!fs.existsSync(path)) continue;
    
    let content = fs.readFileSync(path, 'utf8');
    
    // find pattern: exampleVN: '...', exampleVN: '...'
    // and replace with just one
    content = content.replace(/(exampleVN: '[^']+'),\s*exampleVN: '[^']+'/g, '$1');
    content = content.replace(/(exampleVN: "[^"]+"),\s*exampleVN: "[^"]+"/g, '$1');
    
    fs.writeFileSync(path, content);
}
console.log('Fixed dupes!');
