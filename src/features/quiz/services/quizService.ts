//emulating fetching the quiz for a remote server

import { Quiz } from "../types/quiz";


const fetchQuizzes = async (): Promise<{ data: Quiz[] }> => ({
    data: [{
        id: 0, title: 'math', questions: [
            {
                id: 0,
                question: '1+1=?',
                options: [
                    {
                        id: 0,
                        text: '0'
                    },
                    {
                        id: 1,
                        text: '-3'
                    },
                    {
                        id: 2,
                        text: 'e'
                    },
                    {
                        id: 3,
                        text: '2'
                    }
                ],
                answerId: 3
            },
            {
                id: 1,
                question: '5*2=?',
                options: [
                    {
                        id: 0,
                        text: '7'
                    },
                    {
                        id: 1,
                        text: '10'
                    },
                    {
                        id: 2,
                        text: '12'
                    },
                    {
                        id: 3,
                        text: '8'
                    }
                ],
                answerId: 1
            },
            {
                id: 2,
                question: '15/3=?',
                options: [
                    {
                        id: 0,
                        text: '5'
                    },
                    {
                        id: 1,
                        text: '6'
                    },
                    {
                        id: 2,
                        text: '3'
                    },
                    {
                        id: 3,
                        text: '4'
                    }
                ],
                answerId: 0
            },
            {
                id: 3,
                question: '4^2=?',
                options: [
                    {
                        id: 0,
                        text: '8'
                    },
                    {
                        id: 1,
                        text: '12'
                    },
                    {
                        id: 2,
                        text: '16'
                    },
                    {
                        id: 3,
                        text: '6'
                    }
                ],
                answerId: 2
            },
            {
                id: 4,
                question: '20-7=?',
                options: [
                    {
                        id: 0,
                        text: '14'
                    },
                    {
                        id: 1,
                        text: '13'
                    },
                    {
                        id: 2,
                        text: '12'
                    },
                    {
                        id: 3,
                        text: '15'
                    }
                ],
                answerId: 1
            }
        ]
    }]
})

export const quizAPI = {
    fetchQuizzes
}