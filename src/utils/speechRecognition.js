// Browser Web Speech API Recognition helper for MediSetu Kiosk
export const createSpeechRecognizer = ({
  lang = 'hi',
  onResult,
  onError,
  onEnd,
  onStart,
}) => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    return {
      supported: false,
      start: () => {
        if (onError) onError('SPEECH_NOT_SUPPORTED');
      },
      stop: () => {},
    };
  }

  const langMap = {
    hi: 'hi-IN',
    mr: 'mr-IN',
    en: 'en-IN',
  };

  const recognition = new SpeechRecognition();
  recognition.lang = langMap[lang] || 'hi-IN';
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    if (onStart) onStart();
  };

  recognition.onresult = (event) => {
    if (event.results && event.results.length > 0) {
      const transcript = event.results[0][0].transcript;
      if (onResult) onResult(transcript);
    }
  };

  recognition.onerror = (event) => {
    console.warn('Speech recognition error:', event.error);
    if (onError) onError(event.error);
  };

  recognition.onend = () => {
    if (onEnd) onEnd();
  };

  return {
    supported: true,
    start: () => {
      try {
        recognition.start();
      } catch (err) {
        console.warn('Recognition already started or error:', err);
      }
    },
    stop: () => {
      try {
        recognition.stop();
      } catch (err) {
        console.warn('Error stopping recognition:', err);
      }
    },
  };
};

export default createSpeechRecognizer;
