import * as fs from 'fs';

const files = ['chunk2.ts', 'chunk3.ts', 'chunk4.ts', 'chunk5.ts', 'chunk6.ts', 'chunk7.ts', 'chunk8.ts', 'chunk9.ts', 'chunk10.ts'];

for (const file of files) {
    const path = `./src/${file}`;
    if (!fs.existsSync(path)) continue;
    
    let content = fs.readFileSync(path, 'utf8');
    
    // Noun-like strings (capitalized and short)
    content = content.replace(/example: '([A-Z][a-z0-9 ]+\.)'/g, (match, ex) => {
        const lowerEx = ex.charAt(0).toLowerCase() + ex.slice(1);
        
        // Let's do some basic heuristics
        if (ex.startsWith('A ') || ex.startsWith('An ') || ex.startsWith('The ')) {
            return `example: 'They discussed ${lowerEx}'`;
        }
        
        const firstWord = ex.split(' ')[0].toLowerCase();
        const verbs = ['access', 'accommodate', 'accumulate', 'administer', 'admit', 'advertise', 'advise', 'affect', 'afford', 'agree', 'aim', 'allow', 'analyze', 'announce', 'apologize', 'appeal', 'apply', 'appoint', 'appraise', 'appreciate', 'approach', 'approve', 'argue', 'arrange', 'arrive', 'ask', 'assess', 'assign', 'assist', 'assume', 'assure', 'attach', 'attempt', 'attend', 'attract', 'avoid', 'award', 'balance', 'bargain', 'base', 'be', 'bear', 'beat', 'become', 'begin', 'believe', 'belong', 'benefit', 'bid', 'bind', 'blame', 'book', 'borrow', 'bother', 'break', 'bring', 'build', 'calculate', 'call', 'cancel', 'capture', 'care', 'carry', 'catch', 'cause', 'celebrate', 'certify', 'challenge', 'change', 'charge', 'check', 'choose', 'claim', 'clarify', 'clean', 'clear', 'climb', 'close', 'collaborate', 'collapse'];
        
        if (verbs.includes(firstWord)) {
            // It's likely an imperative verb phrase
            return `example: 'We need to ${lowerEx}'`;
        }
        
        // Otherwise, assume it's a noun phrase
        return `example: 'He gave a presentation about the ${lowerEx}'`;
    });
    
    fs.writeFileSync(path, content);
}

console.log('Done fixing examples!');
