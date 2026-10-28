import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchNextQuestion,
  submitInterviewAnswer,
} from '../../redux/slices/interviewSlice';
import withSessionGuard from '../../hoc/withSessionGuard';
import { useAccessibility } from '../../context/AccessibilityContext';
import { createSpeechRecognizer } from '../../utils/speechRecognition';
import RedFlagModal from '../../components/kiosk/RedFlagModal';
import InterviewReview from '../../components/kiosk/InterviewReview';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import '../../styles/pages/interviewScreen.css';

const InterviewScreenComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { language, t, speak } = useAccessibility();

  const { currentSession } = useSelector((state) => state.session);
  const {
    currentQuestion,
    completed,
    loading,
    submitting,
    redFlagAlert,
    redFlagDismissed,
    questionCount,
  } = useSelector((state) => state.interview);

  const sessionId = currentSession?.sessionId;
  const activeLang = currentSession?.language || language || 'hi';

  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [voiceConfirmed, setVoiceConfirmed] = useState(false);
  const [speechError, setSpeechError] = useState(null);

  const recognizerRef = useRef(null);

  // Fetch first question on mount
  useEffect(() => {
    if (sessionId) {
      dispatch(fetchNextQuestion(sessionId));
    }
  }, [sessionId, dispatch]);

  // Extract localized prompt and options
  const localizedPrompt = useMemo(() => {
    if (!currentQuestion || !currentQuestion.prompt) return '';
    const p = currentQuestion.prompt;
    return p[activeLang] || p.hi || p.en || '';
  }, [currentQuestion, activeLang]);

  const localizedOptions = useMemo(() => {
    if (!currentQuestion || !currentQuestion.options) return [];
    return currentQuestion.options.map((opt) => ({
      id: opt.id,
      label: opt.label ? (opt.label[activeLang] || opt.label.hi || opt.label.en || opt.id) : opt.id,
      riskWeight: opt.riskWeight || 0,
    }));
  }, [currentQuestion, activeLang]);

  // Speak question aloud whenever new question loads
  useEffect(() => {
    if (localizedPrompt) {
      speak(localizedPrompt);
      setSelectedOptionId(null);
      setVoiceTranscript('');
      setVoiceConfirmed(false);
      setSpeechError(null);
    }
  }, [localizedPrompt, speak]);

  // Setup speech recognition
  useEffect(() => {
    recognizerRef.current = createSpeechRecognizer({
      lang: activeLang,
      onStart: () => {
        setIsListening(true);
        setSpeechError(null);
      },
      onResult: (transcript) => {
        setIsListening(false);
        setVoiceTranscript(transcript);
        speak(`${t.youSaid}: "${transcript}". ${t.isThisCorrect}`);
      },
      onError: (err) => {
        setIsListening(false);
        setSpeechError(t.micFallback);
      },
      onEnd: () => {
        setIsListening(false);
      },
    });

    return () => {
      if (recognizerRef.current) {
        recognizerRef.current.stop();
      }
    };
  }, [activeLang, t, speak]);

  const handleStartListening = () => {
    if (recognizerRef.current) {
      setVoiceTranscript('');
      setVoiceConfirmed(false);
      recognizerRef.current.start();
    }
  };

  const handleConfirmVoice = () => {
    setVoiceConfirmed(true);
    handleAnswerSubmit({
      inputSource: 'VOICE',
      rawUtterance: voiceTranscript,
      answerText: voiceTranscript,
      selectedOptionId: null, // Gemini backend maps utterance to slot
    });
  };

  const handleRetryVoice = () => {
    setVoiceTranscript('');
    setVoiceConfirmed(false);
    handleStartListening();
  };

  const handleOptionSelect = (optId) => {
    setSelectedOptionId(optId);
  };

  const handleAnswerSubmit = ({
    inputSource = 'TAP',
    selectedOptionId: optId = selectedOptionId,
    rawUtterance = null,
    answerText = null,
  }) => {
    if (!sessionId || !currentQuestion) return;

    const payload = {
      questionId: currentQuestion.id,
      selectedOptionId: optId,
      answerText: answerText,
      rawUtterance: rawUtterance,
      inputSource: inputSource,
      questionPrompt: localizedPrompt,
      optionsJson: JSON.stringify(currentQuestion.options || []),
    };

    dispatch(submitInterviewAnswer({ sessionId, answerData: payload }));
  };

  // If critical red flag is raised and not dismissed, show emergency modal
  const showRedFlag =
    redFlagAlert &&
    redFlagAlert.severity === 'CRITICAL' &&
    !redFlagDismissed;

  if (showRedFlag) {
    return <RedFlagModal alert={redFlagAlert} sessionId={sessionId} />;
  }

  // If completed, show summary review
  if (completed || (!loading && !currentQuestion)) {
    return (
      <div className="ms-interview-page">
        <InterviewReview sessionId={sessionId} />
      </div>
    );
  }

  if (loading && !currentQuestion) {
    return (
      <div className="ms-interview-page" style={{ justifyContent: 'center' }}>
        <LoadingSpinner text="प्रश्न लोड हो रहा है... / Loading question..." />
      </div>
    );
  }

  return (
    <div className="ms-interview-page">
      {/* Top Header & Progress */}
      <div className="ms-interview-header">
        <div className="ms-interview-header-left">
          <button
            type="button"
            className="ms-btn-icon-back"
            onClick={() => navigate('/kiosk/session')}
            title="Back to dashboard"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div>
            <h1>{t.interviewTitle}</h1>
            <span className="ms-interview-step-badge">
              {t.questionProgress} #{questionCount + 1}
            </span>
          </div>
        </div>

        <button
          type="button"
          className="ms-btn-speaker"
          onClick={() => speak(localizedPrompt)}
          title="Hear question aloud"
        >
          <span className="material-symbols-outlined">volume_up</span>
          Audio / सुनें
        </button>
      </div>

      {/* Main Question Card */}
      <div className="ms-question-card">
        <h2 className="ms-question-prompt">{localizedPrompt}</h2>

        {/* Voice Readback Banner if user spoke */}
        {voiceTranscript && (
          <div className="ms-voice-readback-box">
            <span className="material-symbols-outlined" style={{ color: 'var(--ms-navy-700)' }}>
              record_voice_over
            </span>
            <div style={{ flex: 1 }}>
              <p className="ms-readback-text">
                {t.youSaid}: <strong>"{voiceTranscript}"</strong>
              </p>
              <p className="ms-readback-confirm">{t.isThisCorrect}</p>
            </div>
            <div className="ms-readback-actions">
              <button
                type="button"
                className="ms-btn-readback-yes"
                onClick={handleConfirmVoice}
                disabled={submitting}
              >
                <span className="material-symbols-outlined">check</span>
                {t.confirmYes}
              </button>
              <button
                type="button"
                className="ms-btn-readback-retry"
                onClick={handleRetryVoice}
                disabled={submitting}
              >
                <span className="material-symbols-outlined">replay</span>
                {t.retryVoice}
              </button>
            </div>
          </div>
        )}

        {speechError && (
          <div className="ms-speech-error-box">
            <span className="material-symbols-outlined">info</span>
            <span>{speechError}</span>
          </div>
        )}

        {/* Options Grid for Tap Selection */}
        <div className="ms-options-grid">
          {localizedOptions.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                className={`ms-option-card ${isSelected ? 'selected' : ''}`}
                onClick={() => handleOptionSelect(opt.id)}
              >
                <div className={`ms-radio-indicator ${isSelected ? 'checked' : ''}`}>
                  {isSelected && <span className="ms-radio-dot" />}
                </div>
                <span className="ms-option-text">{opt.label}</span>
                {opt.id === 'OPT_OTHER' && (
                  <span className="material-symbols-outlined ms-other-icon">mic</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Dual Mode: Big Mic Button */}
        <div className="ms-voice-trigger-zone">
          <p className="ms-voice-helper-label">
            अथवा माइक दबाकर बोलें / Or tap to speak:
          </p>
          <button
            type="button"
            className={`ms-btn-big-mic ${isListening ? 'listening' : ''}`}
            onClick={handleStartListening}
            disabled={isListening || submitting}
          >
            <span className="material-symbols-outlined ms-mic-icon">
              {isListening ? 'graphic_eq' : 'mic'}
            </span>
            <span>{isListening ? t.listening : t.speakToAnswer}</span>
          </button>
        </div>

        {/* Advance Action Button */}
        <div className="ms-question-footer">
          <button
            type="button"
            className="ms-btn-next-question"
            disabled={!selectedOptionId || submitting}
            onClick={() => handleAnswerSubmit({ inputSource: 'TAP', selectedOptionId })}
          >
            <span>{submitting ? 'दर्ज हो रहा है... / Submitting...' : t.nextQuestion}</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const InterviewScreen = withSessionGuard(InterviewScreenComponent);
export default InterviewScreen;
