const url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=We+need+to+access+the+database";
fetch(url).then(r => r.json()).then(d => console.log(d[0][0][0])).catch(console.error);
