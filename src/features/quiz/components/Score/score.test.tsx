import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ScorePageComponent from './index'
import { Quiz, QuizAnswers } from '../../types/quiz'

describe('ScorePageComponent', () => {
    // Test data setup
    const createQuiz = (questions: Array<{ id: number, answerId: number }>): Quiz => ({
        id: 1,
        title: 'test',
        questions: questions.map(q => ({
            id: q.id,
            answerId: q.answerId,
            question: `Question ${q.id}`,
            options: [
                { id: 1, text: 'Option 1' },
                { id: 2, text: 'Option 2' },
                { id: 3, text: 'Option 3' }
            ]
        }))
    })

    const createAnswers = (answers: Array<{ questionId: number, answerId: number }>): QuizAnswers => ({
        quizId: 1,
        answers
    })

    test('displays perfect score when all answers are correct', () => {
        const quiz = createQuiz([
            { id: 1, answerId: 2 },
            { id: 2, answerId: 1 }
        ])

        const answers = createAnswers([
            { questionId: 1, answerId: 2 },
            { questionId: 2, answerId: 1 }
        ])

        render(<ScorePageComponent quiz={quiz} answers={answers} />)
        expect(screen.getByText('your score is 100')).toBeInTheDocument()
    })

    test('displays zero score when all answers are wrong', () => {
        const quiz = createQuiz([
            { id: 1, answerId: 2 },
            { id: 2, answerId: 1 }
        ])

        const answers = createAnswers([
            { questionId: 1, answerId: 1 },
            { questionId: 2, answerId: 2 }
        ])

        render(<ScorePageComponent quiz={quiz} answers={answers} />)
        expect(screen.getByText('your score is 0')).toBeInTheDocument()
    })

    test('displays 50% score when half answers are correct', () => {
        const quiz = createQuiz([
            { id: 1, answerId: 2 },
            { id: 2, answerId: 1 }
        ])

        const answers = createAnswers([
            { questionId: 1, answerId: 2 }, // correct
            { questionId: 2, answerId: 2 }  // wrong
        ])

        render(<ScorePageComponent quiz={quiz} answers={answers} />)
        expect(screen.getByText('your score is 50')).toBeInTheDocument()
    })

    test('calculates correct score for quiz with different number of questions', () => {
        const quiz = createQuiz([
            { id: 1, answerId: 1 },
            { id: 2, answerId: 2 },
            { id: 3, answerId: 3 },
            { id: 4, answerId: 1 }
        ])

        const answers = createAnswers([
            { questionId: 1, answerId: 1 }, // correct
            { questionId: 2, answerId: 2 }, // correct
            { questionId: 3, answerId: 1 }, // wrong
            { questionId: 4, answerId: 2 }  // wrong
        ])

        render(<ScorePageComponent quiz={quiz} answers={answers} />)
        expect(screen.getByText('your score is 50')).toBeInTheDocument()
    })

    test('handles empty answers array', () => {
        const quiz = createQuiz([
            { id: 1, answerId: 1 },
            { id: 2, answerId: 2 }
        ])

        const answers = createAnswers([])

        render(<ScorePageComponent quiz={quiz} answers={answers} />)
        expect(screen.getByText('your score is 0')).toBeInTheDocument()
    })

    test('handles single question quiz', () => {
        const quiz = createQuiz([
            { id: 1, answerId: 1 }
        ])

        const answers = createAnswers([
            { questionId: 1, answerId: 1 }
        ])

        render(<ScorePageComponent quiz={quiz} answers={answers} />)
        expect(screen.getByText('your score is 100')).toBeInTheDocument()
    })

    test('handles answers in different order than questions', () => {
        const quiz = createQuiz([
            { id: 1, answerId: 1 },
            { id: 2, answerId: 2 }
        ])

        const answers = createAnswers([
            { questionId: 2, answerId: 2 },
            { questionId: 1, answerId: 1 }
        ])

        render(<ScorePageComponent quiz={quiz} answers={answers} />)
        expect(screen.getByText('your score is 100')).toBeInTheDocument()
    })
})