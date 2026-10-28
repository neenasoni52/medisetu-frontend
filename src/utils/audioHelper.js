// Web Speech API Voice Synthesis helper for elderly/non-literate kiosk users
export const speakText = (text, langCode = 'hi') => {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    return;
  }

  window.speechSynthesis.cancel(); // Stop any previous speech

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Map our language code to standard BCP-47 tags
  const voiceLangMap = {
    hi: 'hi-IN',
    mr: 'mr-IN',
    en: 'en-IN',
  };

  utterance.lang = voiceLangMap[langCode] || 'hi-IN';
  utterance.rate = 0.9; // Slightly slower and clearer for elderly patients
  utterance.pitch = 1.0;

  window.speechSynthesis.speak(utterance);
};

export const stopSpeech = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};
