import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import { quizThunks } from '../../store/quizThunks'
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/reduxHooks'
import { Quiz, QuizAnswers } from '../../types/quiz'
import { RootState } from '../../../../store'
import QuizComponent from '../Quiz'

interface QuizPageProps {

}

// we will only select  the first quiz we get, selecting quiz is not in the scope of the assignment
const QuizPageComponent = (props: QuizPageProps) => {
    const [answers, setAnswers] = useState<{ [quizId: number]: QuizAnswers }>()
    const quizzes: Quiz[] = useAppSelector((state: RootState) => state.quiz.quizzes)
    const isQuizzedFetched: boolean = useAppSelector((state: RootState) => state.quiz.isQuizzedFetched)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isQuizzedFetched) {
            dispatch(quizThunks.fetchQuizzes())
        }
    }, [])

    const handleSubmit = (quizAnswers: QuizAnswers) => {
        setAnswers((prev) => ({ ...prev, [quizAnswers.quizId]: quizAnswers }))
    }

    return (
        <Container maxWidth="md">
            {!isQuizzedFetched ? <h1>Loading</h1> : quizzes.length === 0 ? <h1>no quizzes found</h1> : <QuizComponent quiz={quizzes[0]} submit={handleSubmit} />}
        </Container>
    )
}

export default QuizPageComponent