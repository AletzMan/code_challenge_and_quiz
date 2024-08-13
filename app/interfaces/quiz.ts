export interface IResponseQuiz {
    quiz: IQuestion | null
}

export interface IQuestion {
    question: string,
    codeSnippet: string | null,
    options: string[] | null,
    matchingOptions: string[] | null,
    numberOfCorrectAnswers: number,
    rightAnswer: string[],
    rightAnswerMatching: string[] | null,
    type: 'multiple choice' | 'true false' | 'blank space' | 'multiple select' | 'matching',
    explanation: string
    codeSnippetExplanation: string | null
}

export interface IQuizResult {
    questions: IAnswer[]
    correctAnswers: number
}

export interface IAnswer {
    question: string
    codeSnippet: string | null,
    answer: string
    isRight: boolean
    explanation: string
    codeSnippetExplanation: string | null
    rightAnswer: string[]
    rightAnswerMatching?: string[][]
    answerMatching?: string[][]
}

export interface IQuestionCategory {
    option: string
    value: string
}