export interface IResponseQuiz {
    quiz: IQuiz | null
}

export interface IQuiz {
    question: string,
    codeSnippet: string | null,
    options: string[] | null,
    correctAnswer: string[],
    type: 'multiple choice' | 'true false' | 'blank space',
    explanation: IExplanation
}

export interface IExplanation {
    resume: string
    codeSnippet: string | null
}