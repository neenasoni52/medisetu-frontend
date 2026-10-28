import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchInterviewReview } from '../../redux/slices/interviewSlice';
import { useAccessibility } from '../../context/AccessibilityContext';
import LoadingSpinner from '../common/LoadingSpinner';

export const InterviewReview = ({ sessionId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, speak } = useAccessibility();
  const { reviewList, loading } = useSelector((state) => state.interview);

  useEffect(() => {
    if (sessionId) {
      dispatch(fetchInterviewReview(sessionId));
    }
  }, [sessionId, dispatch]);

  useEffect(() => {
    speak(t.reviewSubtitle);
  }, [t.reviewSubtitle]);

  if (loading && reviewList.length === 0) {
    return (
      <div style={{ padding: '60px', textAlign: 'center' }}>
        <LoadingSpinner text="लोड हो रहा है... / Loading summary..." />
      </div>
    );
  }

  return (
    <div className="ms-review-container">
      <div className="ms-review-header">
        <div className="ms-review-icon-box">
          <span className="material-symbols-outlined" style={{ fontSize: '36px', color: 'var(--ms-herbal-700)' }}>
            verified_user
          </span>
        </div>
        <div>
          <h2>{t.reviewTitle}</h2>
          <p style={{ color: 'var(--ms-text-muted)', margin: '4px 0 0 0' }}>{t.reviewSubtitle}</p>
        </div>
      </div>

      <div className="ms-review-cards-list">
        {reviewList.map((item, idx) => (
          <div key={item.questionId || idx} className="ms-review-card">
            <div className="ms-review-card-top">
              <span className="ms-review-q-num">#{idx + 1}</span>
              <span className="ms-review-module-tag">{item.moduleName}</span>
              <span className={`ms-review-source-tag ${item.inputSource === 'VOICE' ? 'voice' : 'tap'}`}>
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>
                  {item.inputSource === 'VOICE' ? 'mic' : 'touch_app'}
                </span>
                {item.inputSource === 'VOICE' ? t.sourceVoice : t.sourceTap}
              </span>
            </div>

            <h3 className="ms-review-prompt">{item.prompt}</h3>

            <div className="ms-review-answer-box">
              <span className="material-symbols-outlined" style={{ color: 'var(--ms-herbal-600)', fontSize: '20px' }}>
                check_circle
              </span>
              <span className="ms-review-selected-label">
                {item.selectedOptionLabel || item.answerText || item.selectedOptionId}
              </span>
            </div>

            {item.rawUtterance && (
              <div className="ms-review-utterance">
                <em>"{item.rawUtterance}"</em>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="ms-review-actions">
        <button
          type="button"
          className="ms-btn-submit-review"
          onClick={() => navigate('/kiosk/session')}
        >
          <span className="material-symbols-outlined">arrow_forward</span>
          {t.submitInterviewBtn}
        </button>
      </div>
    </div>
  );
};

export default InterviewReview;
