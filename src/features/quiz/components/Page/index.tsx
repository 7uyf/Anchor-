import { useEffect, useMemo, useState } from 'react'
import Container from '@mui/material/Container'
import { quizThunks } from '../../store/quizThunks'
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/reduxHooks'
import { Quiz, QuizAnswers } from '../../types/quiz'
import { RootState } from '../../../../store'
import QuizComponent from '../Quiz'
import ScorePageComponent from '../Score'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

interface QuizPageProps {

}

// we will only select  the first quiz we get, selecting quiz is not in the scope of the assignment
const QuizPageComponent = (props: QuizPageProps) => {
    const [answers, setAnswers] = useState<{ [quizId: number]: QuizAnswers }>({})
    const quizzes: Quiz[] = useAppSelector((state: RootState) => state.quiz.quizzes)
    const isQuizzedFetched: boolean = useAppSelector((state: RootState) => state.quiz.isQuizzedFetched)
    const dispatch = useAppDispatch()
    const currentQuizIndex = 0

    const currentQuiz = useMemo(() => quizzes[currentQuizIndex], [quizzes])

    useEffect(() => {
        if (!isQuizzedFetched) {
            dispatch(quizThunks.fetchQuizzes())
        }
    }, [])

    const handleSubmit = (quizAnswers: QuizAnswers) => {
        setAnswers((prev) => ({ ...prev, [quizAnswers.quizId]: quizAnswers }))
    }

    const pickMainComponent = (): JSX.Element => {
        return (
            <Stack spacing={2} direction={'column'}>
                <Typography variant='h1'> the Quiz: {currentQuiz.title}</Typography>
                {answers[currentQuizIndex] === undefined ? <QuizComponent quiz={currentQuiz} submit={handleSubmit} /> :
                    <ScorePageComponent answers={answers[currentQuiz.id]} quiz={currentQuiz} />}
            </Stack >
        )
    }

    return (
        <Container maxWidth="md">
            {!isQuizzedFetched ? <h1>Loading</h1> : quizzes.length === 0 ? <h1>no quizzes found</h1> : pickMainComponent()}
        </Container>
    )
}

export default QuizPageComponent