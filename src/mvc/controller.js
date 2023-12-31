class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init() {
    this.view.inputElement.addEventListener("input", (e) => {
      this.wordInputHandler(e);
    });

    this.view.playVoiceInputButton.addEventListener("click", (e) => {
      this.view.speak("input");
    });

    this.view.playVoiceOutputButton.addEventListener("click", (e) => {
      this.view.speak("output");
    });
  }

  wordInputHandler(e) {
    const event = e.currentTarget;
    if (!event.value.trim()) {
      this.view.setWordCounter(0);
      this.view.setOutput("");
      return;
    }

    const translated = this.model.translate(event.value);
    const wordCounter = this.view.getWordCounter();

    this.view.setWordCounter(wordCounter);

    this.view.setOutput(translated);
  }
}

export default Controller;
