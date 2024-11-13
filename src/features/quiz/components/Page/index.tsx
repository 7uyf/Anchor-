import { useEffect } from 'react'
import Container from '@mui/material/Container'
import { quizThunks } from '../../store/quizThunks'
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/reduxHooks'
import { Quiz } from '../../types/quiz'
import { RootState } from '../../../../store'
import QuizComponent from '../Quiz'

interface QuizPageProps {

}

const QuizPageComponent = (props: QuizPageProps) => {
    const quizzes: Quiz[] = useAppSelector((state: RootState) => state.quiz.quizzes)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (quizzes.length === 0) {
            dispatch(quizThunks.fetchQuizzes())
        }
    }, [])


    return (
        <Container maxWidth="md">
            {quizzes.length === 0 ? <h1>Loading</h1> : < QuizComponent quiz={quizzes[0]} />}
        </Container>
    )
}

export default QuizPageComponent