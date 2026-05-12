import * as fs from 'fs';

const getExample = async (word: string) => {
    try {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
        const data = await res.json();
        for (const meaning of data[0]?.meanings || []) {
            for (const def of meaning.definitions || []) {
                if (def.example && def.example.length > 10) return def.example;
            }
        }
    } catch {}
    return null;
}

const main = async () => {
    console.log(await getExample('contractor'));
    console.log(await getExample('consume'));
    console.log(await getExample('convenient'));
    console.log(await getExample('contrast'));
};

main();
