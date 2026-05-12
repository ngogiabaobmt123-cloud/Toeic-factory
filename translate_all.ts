import * as fs from 'fs';

const translateText = async (text: string) => {
    try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(text)}`;
        const res = await fetch(url);
        const data = await res.json();
        return data[0].map((item: any) => item[0]).join('');
    } catch (err) {
        console.error('Translation error for:', text, err);
        return null;
    }
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const main = async () => {
    const files = ['chunk1.ts', 'chunk2.ts', 'chunk3.ts', 'chunk4.ts', 'chunk5.ts', 'chunk6.ts', 'chunk7.ts', 'chunk8.ts', 'chunk9.ts', 'chunk10.ts'];
    
    for (const file of files) {
        const path = `./src/${file}`;
        if (!fs.existsSync(path)) continue;
        
        console.log(`Processing ${file}...`);
        let content = fs.readFileSync(path, 'utf8');
        
        // Match each block: { id: '...', word: '...', meaning: '...', example: '...' }
        // We will extract it, parse it or just use regex replace asynchronously.
        // It's safer to use regex to find all examples and then replace them.
        
        const matches = Array.from(content.matchAll(/example: '([^']+)'(?:,\s*exampleVN: '([^']+)')?/g));
        
        for (const match of matches) {
            const originalFull = match[0];
            const englishEx = match[1];
            const existingVn = match[2];
            
            if (!existingVn) {
                const vnText = await translateText(englishEx);
                if (vnText) {
                    const replaced = `example: '${englishEx.replace(/'/g, "\\'")}', exampleVN: '${vnText.replace(/'/g, "\\'")}'`;
                    content = content.replace(originalFull, replaced);
                }
                await delay(50); // slight delay to avoid rate limiting
            }
        }
        
        fs.writeFileSync(path, content);
    }
    console.log('Finished translating all chunks.');
};

main();
