class View {
  constructor() {
    this.outputElement = document.querySelector(".translating-output");
    this.inputElement = document.querySelector(".translating-input");

    this.outputCounterElement = document.querySelector('[data-counter="output"]');
    this.inputCounterElement = document.querySelector('[data-counter="input"]');

    this.playVoiceInputButton = document.querySelector(".voice-input-btn");
    this.playVoiceOutputButton = document.querySelector(".voice-output-btn");

    this.currentPlayingVoice = "";
  }

  speak(which) {
    if (!("speechSynthesis" in window)) return;

    if (this.currentPlayingVoice !== null) {
      speechSynthesis.cancel();
      this.currentPlayingVoice = null;
    }

    const run = (text) => {
      const textToSpeak = text;

      if (textToSpeak.length <= 0) return;

      const speech = new SpeechSynthesisUtterance(textToSpeak);
      speech.lang = "id-ID";
      speechSynthesis.speak(speech);

      this.currentPlayingVoice = speech;
    };

    if (which === "input") {
      const textToSpeak = this.inputElement.value;
      run(textToSpeak);
      return;
    }
    const textToSpeak = this.outputElement.textContent;
    run(textToSpeak);
  }

  setOutput(words) {
    this.outputElement.textContent = words;
  }

  getWordCounter() {
    const enteredValue = this.inputElement.value.trim().split(" ");

    let cleared = enteredValue.filter((item) => {
      return item.trim() !== "";
    });

    return cleared.length;
  }

  setWordCounter(input) {
    this.outputCounterElement.textContent = input;
    this.inputCounterElement.textContent = input;
  }
}

export default View;
