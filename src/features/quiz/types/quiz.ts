export interface Quiz {
    id: number,
    title: string,
    questions: MultipleChoiceQuestion[]
}
interface MultipleChoiceQuestion {
    id: number,
    question: string,
    options: MultipleChoiceOption[],
    answerId: number
}

export interface MultipleChoiceOption {
    id: number,
    text: string
}

export interface QuizAnswers {
    quizId: number,
    answers: {
        questionId: number,
        answerId: number
    }[]
}