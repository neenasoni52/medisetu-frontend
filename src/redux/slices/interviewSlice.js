import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import interviewService from '../../services/interviewService';

// Async Thunk: Fetch Next Question
export const fetchNextQuestion = createAsyncThunk(
  'interview/fetchNextQuestion',
  async (sessionId, { rejectWithValue }) => {
    try {
      const response = await interviewService.getNextQuestion(sessionId);
      return response; // JsonNode or null if interview is finished
    } catch (err) {
      return rejectWithValue({
        message: err.message || 'Failed to fetch next question',
        status: err.status,
      });
    }
  }
);

// Async Thunk: Submit Answer
export const submitInterviewAnswer = createAsyncThunk(
  'interview/submitAnswer',
  async ({ sessionId, answerData }, { rejectWithValue }) => {
    try {
      const response = await interviewService.submitAnswer(sessionId, answerData);
      // AnswerSubmissionResponse: { nextQuestion, redFlag: { raised, severity, message, ruleId }, completed }
      return response;
    } catch (err) {
      return rejectWithValue({
        message: err.message || 'Failed to submit answer',
        status: err.status,
      });
    }
  }
);

// Async Thunk: Fetch Review
export const fetchInterviewReview = createAsyncThunk(
  'interview/fetchReview',
  async (sessionId, { rejectWithValue }) => {
    try {
      const response = await interviewService.getInterviewReview(sessionId);
      return response; // Array of InterviewReviewDTO
    } catch (err) {
      return rejectWithValue({
        message: err.message || 'Failed to fetch review',
        status: err.status,
      });
    }
  }
);

// Async Thunk: Acknowledge Red Flag
export const acknowledgeRedFlag = createAsyncThunk(
  'interview/acknowledgeRedFlag',
  async (sessionId, { rejectWithValue }) => {
    try {
      await interviewService.acknowledgeRedFlag(sessionId);
      return true;
    } catch (err) {
      return rejectWithValue({
        message: err.message || 'Failed to acknowledge red flag',
      });
    }
  }
);

const interviewSlice = createSlice({
  name: 'interview',
  initialState: {
    currentQuestion: null,
    completed: false,
    loading: false,
    submitting: false,
    error: null,
    redFlagAlert: null,
    redFlagDismissed: false,
    reviewList: [],
    questionCount: 0,
  },
  reducers: {
    dismissRedFlag: (state) => {
      state.redFlagDismissed = true;
    },
    resetInterview: (state) => {
      state.currentQuestion = null;
      state.completed = false;
      state.loading = false;
      state.submitting = false;
      state.error = null;
      state.redFlagAlert = null;
      state.redFlagDismissed = false;
      state.reviewList = [];
      state.questionCount = 0;
    },
  },
  extraReducers: (builder) => {
    // fetchNextQuestion
    builder
      .addCase(fetchNextQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNextQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.currentQuestion = action.payload;
        if (!action.payload) {
          state.completed = true;
        } else {
          state.questionCount += 1;
        }
      })
      .addCase(fetchNextQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Error loading question';
      });

    // submitInterviewAnswer
    builder
      .addCase(submitInterviewAnswer.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(submitInterviewAnswer.fulfilled, (state, action) => {
        state.submitting = false;
        const { nextQuestion, redFlag, completed } = action.payload;
        state.currentQuestion = nextQuestion;
        state.completed = completed || !nextQuestion;

        if (redFlag && redFlag.raised) {
          state.redFlagAlert = redFlag;
          state.redFlagDismissed = false;
        }
        if (nextQuestion) {
          state.questionCount += 1;
        }
      })
      .addCase(submitInterviewAnswer.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload?.message || 'Error submitting answer';
      });

    // fetchInterviewReview
    builder
      .addCase(fetchInterviewReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInterviewReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviewList = action.payload || [];
      })
      .addCase(fetchInterviewReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Error loading review';
      });

    // acknowledgeRedFlag
    builder
      .addCase(acknowledgeRedFlag.fulfilled, (state) => {
        state.redFlagDismissed = true;
      });
  },
});

export const { dismissRedFlag, resetInterview } = interviewSlice.actions;
export default interviewSlice.reducer;
