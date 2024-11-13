import { createSlice } from '@reduxjs/toolkit';
import { Quiz } from '../types/quiz';
import { quizThunks } from './quizThunks';




interface SliceState {
    quizzes: Quiz[]
}

const initialState: SliceState = {
    quizzes: []
}
const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(quizThunks.fetchQuizzes.fulfilled, (state, action) => {
            state.quizzes.push(...action.payload)
        })
    }
});

export default quizSlice.reducer;