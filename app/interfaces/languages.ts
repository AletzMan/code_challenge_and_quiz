export interface IItemCategory {
    option: string,
    value: string,
    functionSyntax: string,
    color: string
    logo: JSX.Element | null
    language: string,
    version: string
}

export interface IOutputRunCode {
    language: string,
    version: string,
    run: IOutputRun
}

export interface IResponseOutputRunCode {
    error: boolean,
    response: IOutputRunCode | null
}

export interface IOutputRun {
    stdout: string,
    stderr: string,
    code: number,
    signal: unknown,
    output: string
}