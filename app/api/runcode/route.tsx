import { NextRequest, NextResponse } from "next/server"
import { BadRequestError, ServerError } from "../_services/errors"
import { SuccessResponse } from "../_services/successfulResponses"

export async function POST(req: NextRequest, res: NextResponse) {
    const URL_API_PISTON = "https://emkc.org/api/v2/piston/execute"

    try {
        const searchParams = req.nextUrl.searchParams

        if (req.nextUrl && searchParams) {
            const language = searchParams.get('language')
            const sourceCode = searchParams.get('sourceCode')
            const version = searchParams.get('version')

            const response = await fetch(`${URL_API_PISTON}`, {
                method: "POST",
                body: JSON.stringify({
                    language: language,
                    version: version,
                    files: [
                        {
                            content: sourceCode,
                        },
                    ],
                })
            })

            if (response.status === 400) {
                return BadRequestError()
            }

            const data = await response.json()

            console.log(data)
            return SuccessResponse(data)
        }
    } catch (error) {
        console.log(error)
        return ServerError()
    }

}