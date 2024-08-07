export interface IResponseQuiz {
    quiz: IQuiz | null
}

export interface IQuiz {
    question: string,
    codeSnippet: string | null,
    options: string[] | null,
    rightAnswer: string[],
    type: 'multiple choice' | 'true false' | 'blank space',
    explanation: IExplanation
}

export interface IExplanation {
    resume: string
    codeSnippet: string | null
}

export interface IQuizResult {
    questions: IQuestion[]
    correctAnswers: number
}

export interface IQuestion {
    question: string
    answer: string
    isRight: boolean
    explanation: IExplanation
}