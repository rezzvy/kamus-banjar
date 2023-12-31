class Model {
  constructor() {
    this.DATASET = {
      id_to_bj: [
        { key: "aku,saya", acceptable: "ulun", alternative: "unda" },
        { key: "kamu,anda", acceptable: "pian", alternative: "ikam, nyawa" },
        { key: "dia", acceptable: "inya", alternative: "sidin" },
        { key: "mereka", acceptable: "buhan inya", alternative: "" },
        { key: "kalian", acceptable: "buhan ikam", alternative: "" },
        { key: "benar,betul", acceptable: "bujur", alternative: "" },
        { key: "tidak,tak,engga,gk", acceptable: "kada", alternative: "" },
        { key: "cepat", acceptable: "lakas", alternative: "" },
        { key: "lambat", acceptable: "lawas", alternative: "" },
        { key: "sama", acceptable: "lawan", alternative: "" },
        { key: "kalau,misal", acceptable: "amun", alternative: "bila" },
        { key: "nama", acceptable: "ngaran", alternative: "" },
        { key: "sombong", acceptable: "pembualan", alternative: "" },
        { key: "cari-perhatian", acceptable: "pujungan", alternative: "" },
        { key: "mau,ingin", acceptable: "handak", alternative: "" },
        { key: "berteman", acceptable: "bekawal", alternative: "" },
        { key: "bohong", acceptable: "bote", alternative: "waluh" },
        { key: "malas", acceptable: "koler", alternative: "" },
        { key: "tolol", acceptable: "tambuk", alternative: "" },
        { key: "bodoh,goblok", acceptable: "bungul", alternative: "" },
      ],
    };
  }

  translate(words) {
    const splittedWords = words.split(/ |\n/);

    const getTranslation = splittedWords.map((word) => this.getDatasetByWord(word));

    const translated = getTranslation.map((item) => (typeof item === "object" ? item.word : item));

    return translated.join(" ");
  }

  getDatasetByWord(word) {
    const cleared = this.__removeSymbols(word);
    const dataset = this.DATASET.id_to_bj.find((data) => data.key.split(",").includes(cleared.word.toLowerCase()));

    if (dataset) {
      return { word: dataset.acceptable + cleared.symbol, alternative: dataset.alternative };
    }

    return word;
  }

  __removeSymbols(word) {
    const symbols = ["!", ",", ".", ";", ":", "?", "@"];

    let filteredWord = word;
    let clearedSymbol = "";
    for (const symbol of symbols) {
      while (filteredWord.includes(symbol)) {
        filteredWord = filteredWord.replace(symbol, "");
        clearedSymbol += symbol;
      }
    }

    return {
      word: filteredWord !== "" ? filteredWord : word,
      symbol: clearedSymbol,
    };
  }
}

export default Model;
