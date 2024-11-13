import { QuizAnswers, Quiz } from "../../types/quiz"


interface ScorePageProps {
    quiz: Quiz,
    answers: QuizAnswers
}
const ScorePageComponent = ({ quiz, answers }: ScorePageProps) => {
    return (
        <div>
            hello
        </div>
    )
}

export default ScorePageComponent