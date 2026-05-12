import * as fs from 'fs';

const translateText = async (text: string) => {
    try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(text)}`;
        const res = await fetch(url);
        const data = await res.json();
        return data[0].map((item: any) => item[0]).join('');
    } catch (err) {
        return null;
    }
};

const chunkArray = (arr: any[], size: number) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
        arr.slice(i * size, i * size + size)
    );
};

const main = async () => {
    const files = ['vocabService.ts', 'chunk1.ts', 'chunk2.ts', 'chunk3.ts', 'chunk4.ts', 'chunk5.ts', 'chunk6.ts', 'chunk7.ts', 'chunk8.ts', 'chunk9.ts', 'chunk10.ts'];
    
    for (const file of files) {
        const path = `./src/${file}`;
        if (!fs.existsSync(path)) continue;
        
        console.log(`Processing ${file}...`);
        let content = fs.readFileSync(path, 'utf8');
        
        const matches = Array.from(content.matchAll(/example: '([^']+)'(?:,\s*exampleVN: '([^']+)')?/g));
        const pendingMatches = matches.filter(m => !m[2]);
        
        if (pendingMatches.length === 0) {
            console.log(`File ${file} has no pending translations.`);
            continue;
        }

        const batches = chunkArray(pendingMatches, 10);
        let count = 0;

        for (const batch of batches) {
            const results = await Promise.all(batch.map(async match => {
                const vnText = await translateText(match[1]);
                return { match, vnText };
            }));

            for (const { match, vnText } of results) {
                if (vnText) {
                    const originalFull = match[0];
                    const replaced = `example: '${match[1]}', exampleVN: '${vnText.replace(/'/g, "\\'")}'`;
                    content = content.replace(originalFull, replaced);
                }
            }
            count += batch.length;
            console.log(`  Done ${count}/${pendingMatches.length}`);
        }
        
        fs.writeFileSync(path, content);
    }
    console.log('Finished translating all chunks.');
};

main();
