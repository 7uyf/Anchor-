import { useMemo } from "react"
import { QuizAnswers, Quiz } from "../../types/quiz"


interface ScorePageProps {
    quiz: Quiz,
    answers: QuizAnswers
}
const ScorePageComponent = ({ quiz, answers }: ScorePageProps) => {
    const score = useMemo(() => {
        let score = 0
        const pointsPerQuestion = 100 / quiz.questions.length
        const questionsMap: { [questionId: number]: number } = quiz.questions.reduce((agg, question,) => ({ ...agg, [question.id]: question.answerId }), {})
        answers.answers.forEach((answer) => {
            if (questionsMap[answer.questionId] === answer.answerId) {
                score += pointsPerQuestion
            }
        }
        )
        return score
    }, [quiz, answers])

    return (
        <div>
            your score is {score}
        </div>
    )
}

export default ScorePageComponent