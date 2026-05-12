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

const makeSentence = (word: string, phrase: string) => {
    const lPhrase = phrase.toLowerCase().replace(/['.]/g, '').trim();
    const lWord = word.toLowerCase();
    
    // Some manual overrides
    if (lPhrase === 'don\'t cry' || lPhrase === 'dont cry') return "Please don't cry.";
    if (lPhrase === 'don\'t forget' || lPhrase === 'dont forget') return "Please don't forget.";
    if (lPhrase === 'don\'t bother' || lPhrase === 'dont bother') return "Please don't bother.";
    if (lPhrase === 'don\'t complicate it' || lPhrase === 'dont complicate it') return "Please don't complicate it.";
    
    const firstWord = lPhrase.split(' ')[0];
    const preps = new Set(['in', 'on', 'at', 'for', 'with', 'by', 'to', 'under', 'about']);
    const pronouns = new Set(['my', 'your', 'his', 'her', 'our', 'their', 'a', 'an', 'the']);
    
    if (lPhrase.startsWith(lWord) && lPhrase.includes(' ')) {
        // likely a verb phrase if the word comes first (e.g., "consume alcohol", "cross the street")
        // Exception: what if the word is an adjective? like "fast food"
        if (['fast', 'sweet', 'crucial', 'cultural', 'corporate', 'conventional', 'convenient'].includes(lWord)) {
            return `They talked about ${lPhrase}.`;
        }
        return `We need to ${lPhrase}.`;
    }
    
    if (preps.has(firstWord)) {
        return `The situation is ${lPhrase}.`;
    }
    
    if (pronouns.has(firstWord)) {
        return `They discussed ${lPhrase}.`;
    }
    
    return `We should focus on ${lPhrase}.`;
}

const chunkArray = (arr: any[], size: number) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
        arr.slice(i * size, i * size + size)
    );
};

const main = async () => {
    const files = ['chunk1.ts', 'chunk2.ts', 'chunk3.ts', 'chunk4.ts', 'chunk5.ts', 'chunk6.ts', 'chunk7.ts', 'chunk8.ts', 'chunk9.ts', 'chunk10.ts'];
    
    for (const file of files) {
        const path = `./src/${file}`;
        if (!fs.existsSync(path)) continue;
        
        console.log(`Processing ${file}...`);
        let content = fs.readFileSync(path, 'utf8');
        
        // Find broken examples
        const matches = Array.from(content.matchAll(/word:\s*'([^']+)'[^}]*example:\s*["']He gave a presentation about the ([^"']+)["']/g));
        // Also find "Don't [word]" which was corrupted differently, although we fixed some manually
        
        if (matches.length > 0) {
            console.log(`Found ${matches.length} matches in ${file}`);
            
            const batches = chunkArray(matches, 10);
            
            for (const batch of batches) {
                const results = await Promise.all(batch.map(async (match) => {
                    const originalWord = match[1];
                    let phrase = match[2];
                    if (phrase.endsWith('.')) phrase = phrase.slice(0, -1);
                    
                    if (phrase.startsWith('the ')) phrase = phrase.substring(4);
                    
                    const sentence = makeSentence(originalWord, phrase);
                    const translated = await translateText(sentence);
                    
                    return { match, sentence, translated };
                }));
                
                for (const { match, sentence, translated } of results) {
                    if (translated) {
                        const fullMatchString = match[0]; // e.g. word: 'consume', meaning: 'tiêu thụ', example: 'He gave a presentation about the consume alcohol.'
                        // We need to carefully replace just the example part.
                        // Actually, it's easier to regex replace the exact example string we matched.
                        const oldExampleVal = `He gave a presentation about the ${match[2]}`;
                        // We also need to hit exampleVN and replace it.
                        // To be safe, we'll replace the entire object string inside { } via regex for this specific word id?
                        // No, just replacing the substring is fine.
                        
                        // the regex matched: word: '...', ... example: 'He gave ...'
                        // Let's do a direct string replace for the old example string, but we also want to update exampleVN.
                        const originalWord = match[1];
                        const wordRegex = new RegExp(`(word:\\s*['"]${originalWord}['"][^}]+example:\\s*['"])${escapeRegExp(oldExampleVal)}(['"][^}]+exampleVN:\\s*['"])[^'"]+(['"])`, 'g');
                        
                        let didReplace = false;
                        content = content.replace(wordRegex, `$1${sentence}$2${translated}$3`);
                        
                        // Fallback if exampleVN uses different quotes or doesn't match perfectly
                        if (!content.includes(sentence)) {
                             // manual fallback
                             const oldStr = `example: '${oldExampleVal}'`;
                             const newStr = `example: '${sentence}'`;
                             content = content.replace(oldStr, newStr);
                             
                             // try to replace the VN part
                             const lineMatch = content.match(new RegExp(`{[^}]*word:\\s*'${originalWord}'[^}]*}`));
                             if (lineMatch) {
                                 let line = lineMatch[0];
                                 line = line.replace(/exampleVN:\s*['"][^'"]+['"]/, `exampleVN: '${translated}'`);
                                 content = content.replace(lineMatch[0], line);
                             }
                        }
                    }
                }
                
                fs.writeFileSync(path, content);
            }
        }
    }
    console.log('Finished fixing sentences.');
};

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^$\\{}()|[\\]\\\\]/g, '\\\\$&'); // $& means the whole matched string
}

main();
