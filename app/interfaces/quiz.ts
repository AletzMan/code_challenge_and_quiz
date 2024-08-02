interface IQuiz {
    question: string,
    codeSnippet: string | null,
    options: string[] | null,
    answer: string,
    type: 'multiple choice' | 'true false' | 'blank space',
    explanation: string
}