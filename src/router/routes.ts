import { lazy } from 'react';
const QuizPage = lazy(() => import('../features/quiz/components/Page'));

export const routes = [
    {
        path: '/',
        element: QuizPage,
        title: 'quizPage'
    }
];