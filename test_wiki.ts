const getWikiExample = async (phrase: string) => {
    try {
        const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch="${encodeURIComponent(phrase)}"&utf8=&format=json`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.query?.search?.length > 0) {
            // Pick the first result's snippet
            let snippet = data.query.search[0].snippet;
            // Clean up HTML tags (like <span class="searchmatch">)
            snippet = snippet.replace(/<\/?[^>]+(>|$)/g, "");
            // Extract a sentence containing the phrase
            const sentences = snippet.split(/(?<=[.!?])\s+/);
            const containingSentence = sentences.find((s: string) => s.toLowerCase().includes(phrase.toLowerCase()));
            if (containingSentence) return containingSentence;
            return snippet;
        }
    } catch (e) { console.error(e) }
    return null;
}

getWikiExample('consume alcohol').then(console.log);
getWikiExample('sweet corn').then(console.log);
getWikiExample('corporate culture').then(console.log);
