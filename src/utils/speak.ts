const speak = (text: string) => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speech.lang = 'en-US';
    speech.rate = 1.2;
    speech.onend = (event) => { console.log(`Finished in ${event.elapsedTime} seconds.`); };
    speechSynthesis.speak(speech);
};

export default speak;
