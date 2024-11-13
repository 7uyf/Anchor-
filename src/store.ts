import { configureStore } from '@reduxjs/toolkit';
import quizStore from './features/quiz/store/quizSlice';

const store = configureStore({
    reducer: {
        quiz: quizStore
    },
});

export default store;