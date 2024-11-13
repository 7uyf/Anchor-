import { useEffect } from 'react'
import { Quiz } from '../../types/quiz'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'

interface QuizProps {
    quiz: Quiz
}

const QuizComponent = ({ quiz }: QuizProps) => {

    return (
        <Stack spacing={2} direction={'column'}>
            <Typography variant='h1'> the Quiz: {quiz.title}</Typography>
        </Stack>
    )
}

export default QuizComponent