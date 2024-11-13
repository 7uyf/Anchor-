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