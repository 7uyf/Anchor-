import { render, screen, fireEvent } from '@testing-library/react'
import QuizComponent from '.'
import '@testing-library/jest-dom'
import { Quiz } from '../../types/quiz'

describe('QuizComponent', () => {
    const mockQuiz: Quiz = {
        id: 1,
        title: 'test',
        questions: [
            {
                id: 1,
                question: 'What is 1+1?',
                answerId: 1,
                options: [
                    { id: 1, text: '1' },
                    { id: 2, text: '2' },
                    { id: 3, text: '3' }
                ]
            },
            {
                id: 2,
                question: 'What is 2+2?',
                answerId: 1,
                options: [
                    { id: 4, text: '3' },
                    { id: 5, text: '4' },
                    { id: 6, text: '5' }
                ]
            }
        ]
    }

    const mockSubmit = jest.fn()

    beforeEach(() => {
        mockSubmit.mockClear()
    })

    test('renders first question initially', () => {
        render(<QuizComponent quiz={mockQuiz} submit={mockSubmit} />)

        expect(screen.getByText('What is 1+1?')).toBeInTheDocument()
        expect(screen.getByText('1')).toBeInTheDocument()
        expect(screen.getByText('2')).toBeInTheDocument()
        expect(screen.getByText('3')).toBeInTheDocument()
    })

    test('Next button is disabled when no answer is selected', () => {
        render(<QuizComponent quiz={mockQuiz} submit={mockSubmit} />)

        const nextButton = screen.getByText('Next')
        expect(nextButton).toBeDisabled()
    })

    test('Next button is enabled after selecting an answer', () => {
        render(<QuizComponent quiz={mockQuiz} submit={mockSubmit} />)

        const radioButton = screen.getByLabelText('2')
        fireEvent.click(radioButton)

        const nextButton = screen.getByText('Next')
        expect(nextButton).not.toBeDisabled()
    })

    test('navigates to next question when Next is clicked', () => {
        render(<QuizComponent quiz={mockQuiz} submit={mockSubmit} />)

        const radioButton = screen.getByLabelText('2')
        fireEvent.click(radioButton)

        const nextButton = screen.getByText('Next')
        fireEvent.click(nextButton)

        expect(screen.getByText('What is 2+2?')).toBeInTheDocument()
    })

    test('Previous button appears after first question', () => {
        render(<QuizComponent quiz={mockQuiz} submit={mockSubmit} />)

        expect(screen.queryByText('Previous')).not.toBeInTheDocument()

        const radioButton = screen.getByLabelText('2')
        fireEvent.click(radioButton)

        const nextButton = screen.getByText('Next')
        fireEvent.click(nextButton)

        expect(screen.getByText('Previous')).toBeInTheDocument()
    })

    test('shows submit button on last question', () => {
        render(<QuizComponent quiz={mockQuiz} submit={mockSubmit} />)

        // Navigate to last question
        const firstAnswer = screen.getByLabelText('2')
        fireEvent.click(firstAnswer)
        fireEvent.click(screen.getByText('Next'))

        expect(screen.getByText('submit')).toBeInTheDocument()
        expect(screen.queryByText('Next')).not.toBeInTheDocument()
    })

    test('submits answers correctly', () => {
        render(<QuizComponent quiz={mockQuiz} submit={mockSubmit} />)

        // Answer first question
        const firstAnswer = screen.getByLabelText('2')
        fireEvent.click(firstAnswer)
        fireEvent.click(screen.getByText('Next'))

        // Answer second question
        const secondAnswer = screen.getByLabelText('4')
        fireEvent.click(secondAnswer)

        // Submit quiz
        fireEvent.click(screen.getByText('submit'))

        expect(mockSubmit).toHaveBeenCalledWith({
            quizId: 1,
            answers: [
                { questionId: 1, answerId: 2 },
                { questionId: 2, answerId: 5 }
            ]
        })
    })

    test('preserves answers when navigating between questions', () => {
        render(<QuizComponent quiz={mockQuiz} submit={mockSubmit} />)

        // Answer first question
        const firstAnswer = screen.getByLabelText('2')
        fireEvent.click(firstAnswer)
        fireEvent.click(screen.getByText('Next'))

        // Answer second question
        const secondAnswer = screen.getByLabelText('4')
        fireEvent.click(secondAnswer)

        // Go back to first question
        fireEvent.click(screen.getByText('Previous'))

        // Check if first answer is still selected
        expect(screen.getByLabelText('2')).toBeChecked()

        // Go forward again
        fireEvent.click(screen.getByText('Next'))

        // Check if second answer is still selected
        expect(screen.getByLabelText('4')).toBeChecked()
    })
})