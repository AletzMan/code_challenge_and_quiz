export interface IResponseQuiz {
    quiz: IQuiz | null
}

export interface IQuiz {
    question: string,
    codeSnippet: string | null,
    options: string[] | null,
    rightAnswer: string[],
    type: 'multiple choice' | 'true false' | 'blank space',
    explanation: string
    codeSnippetExplanation: string | null
}

export interface IQuizResult {
    questions: IQuestion[]
    correctAnswers: number
}

export interface IQuestion {
    question: string
    answer: string
    isRight: boolean
    explanation: string
    codeSnippetExplanation: string | null
    rightAnswer: string[]
}

export interface IQuestionCategory {
    option: string
    value: string
}