import { createSlice } from '@reduxjs/toolkit';
import { Quiz } from '../types/quiz';
import { quizThunks } from './quizThunks';

interface SliceState {
    quizzes: Quiz[],
    isQuizzedFetched: boolean
}

const initialState: SliceState = {
    quizzes: [],
    isQuizzedFetched: false

}
const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(quizThunks.fetchQuizzes.fulfilled, (state, action) => {
            state.quizzes.push(...action.payload)
            state.isQuizzedFetched = true

        })
    }
});

export default quizSlice.reducer;