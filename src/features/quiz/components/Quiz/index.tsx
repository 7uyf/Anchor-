import { useEffect, useMemo, useState } from 'react'
import { MultipleChoiceOption, Quiz, QuizAnswers } from '../../types/quiz'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import RadioGroup from '@mui/material/RadioGroup'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import Button from '@mui/material/Button'

interface QuizProps {
    quiz: Quiz,
    submit: (answers: QuizAnswers) => void
}

const QuizComponent = ({ quiz, submit }: QuizProps) => {
    const [answers, setAnswers] = useState<{ [questionId: number]: number }>({})
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
    const [answerId, setAnswerID] = useState<number | null>(null)

    const currentQuestion = useMemo(() => quiz.questions[currentQuestionIndex], [currentQuestionIndex, quiz.questions])

    useEffect(() => {
        if (answers[currentQuestion.id] === undefined) {
            setAnswerID(null)
        } else {
            setAnswerID(answers[currentQuestion.id])
        }
    }, [currentQuestionIndex, answers, currentQuestion.id])

    const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
        const answer: number = Number.parseInt(value)
        setAnswerID(answer)
        setAnswers((prev) => ({ ...prev, [currentQuestion.id]: answer }))
    }

    const handleNext = () => {
        setCurrentQuestionIndex((prev) => prev + 1)
    }
    const handlePrevious = () => {
        setCurrentQuestionIndex((prev) => prev - 1)
    }

    const handleSubmit = () => {
        submit({
            quizId: quiz.id, answers: Object.keys(answers).map((questionId: string) => ({
                questionId: Number.parseInt(questionId),
                answerId: answers[Number.parseInt(questionId)]
            }))
        })
    }

    const isForwardDisabled = answerId === null
    return (
        <Stack spacing={2} direction={'column'}>
            <Typography variant='h1'> the Quiz: {quiz.title}</Typography>
            <FormControl >
                <FormLabel id="demo-radio-buttons-group-label">{currentQuestion.question}</FormLabel>
                <RadioGroup value={answerId}
                    onChange={handleAnswerChange}>
                    {currentQuestion.options.map((option: MultipleChoiceOption) => (
                        <FormControlLabel value={option.id} control={<Radio />} label={option.text} key={option.id} />
                    ))}
                </RadioGroup>
            </FormControl>
            <Stack direction='row' spacing={2}>
                {currentQuestionIndex !== 0 && <Button onClick={handlePrevious}>Previous</Button>}
                {currentQuestionIndex !== quiz.questions.length - 1 ? <Button onClick={handleNext} disabled={isForwardDisabled}>Next</Button> :
                    <Button onClick={handleSubmit} disabled={isForwardDisabled} >submit</Button>}
            </Stack>
        </Stack>
    )
}

export default QuizComponent