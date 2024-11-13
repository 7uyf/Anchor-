import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Interface } from 'readline';

export interface Quiz {
    id: number,
    title: string,
    questions: MultipleChoiceQuestion[]
}
interface MultipleChoiceQuestion {
    id: number,
    question: string,
    options: MultipleChoiceOption[],
    answerID: number
}

interface MultipleChoiceOption {
    id: number,
    text: string
}

interface SliceState {
    quizzes: Quiz[]
}

const initialState: SliceState = {
    quizzes: []
}
const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        addQuizzes: (state: SliceState, action: PayloadAction<Quiz[]>) => {
            state.quizzes = state.quizzes.concat(action.payload)
        }
    }
});

export default quizSlice.reducer;