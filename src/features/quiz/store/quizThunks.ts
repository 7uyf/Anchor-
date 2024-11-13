import { createAsyncThunk } from '@reduxjs/toolkit';
import { quizAPI } from '../services/quizService';

const fetchQuizzes = createAsyncThunk(
    'quiz/fetchQuizzes',
    async () => {
        const response = await quizAPI.fetchQuizzes()
        return response.data
    },
)

export const quizThunks = {
    fetchQuizzes
}