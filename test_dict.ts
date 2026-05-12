const getExample = async (word: string) => {
    try {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await res.json();
        for (const meaning of data[0]?.meanings || []) {
            for (const def of meaning.definitions || []) {
                if (def.example) return def.example;
            }
        }
    } catch {}
    return null;
}
getExample("consume").then(console.log);
getExample("alcohol").then(console.log);
