import { configureStore } from '@reduxjs/toolkit';
import quizStore from './features/quiz/store/quizSlice';

const store = configureStore({
    reducer: {
        quiz: quizStore
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;