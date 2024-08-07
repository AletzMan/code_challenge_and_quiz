import { NextResponse } from "next/server"
import { ZodIssue } from "zod"

export const NotAuthorizedError = () => {
	return NextResponse.json(
		{
			code: 401,
			message: "Not authorized ",
			description: "Authentication is required to access the resource.",
		},
		{ status: 401 }
	)
}

export const ServerError = () => {
	return NextResponse.json(
		{
			code: 500,
			message: "Internal server error",
			description:
				"The server encountered an unexpected condition that prevented it from fulfilling the request.",
		},
		{ status: 500 }
	)
}

export const NotFoundError = () => {
	return NextResponse.json(
		{
			code: 404,
			message: "Not found",
			description: "The requested resource could not be found.",
		},
		{ status: 404 }
	)
}

export const BadRequestError = () => {
	return NextResponse.json(
		{
			code: 400,
			message: "Bad request",
			description:
				"The server cannot or will not process the request due to an apparent client error.",
		},
		{ status: 400 }
	)
}

export const ForbiddenError = () => {
	return NextResponse.json(
		{
			code: 403,
			message: "Forbidden",
			description: "Sorry, you do not have permission to access this resource.",
		},
		{ status: 403 }
	)
}

export const ConflictError = () => {
	return NextResponse.json(
		{
			code: 409,
			message: "Conflict",
			description:
				"The request could not be processed because of conflict in the current state of the resource, such as an edit conflict between multiple simultaneous updates.",
		},
		{ status: 409 }
	)
}

export const UnprocessableEntityError = (issues: unknown) => {
	return NextResponse.json(
		{
			code: 422,
			message: "Unprocessable entity",
			description:
				"The request was well-formed but was unable to be followed due to semantic errors.",
			issues,
		},
		{ status: 422 }
	)
}

export const ManyRequestError = () => {
	return NextResponse.json(
		{
			code: 429,
			message: "Too Many Requests",
			description:
				"You exceeded your current quota, please check your plan and billing details"
		},
		{ status: 429 }
	)
}

export const DefaultError = (message: unknown) => {
	return NextResponse.json(
		{
			code: 500,
			message: message,
			description:
				"The server encountered an unexpected condition that prevented it from fulfilling the request.",
		},
		{ status: 500 }
	)
}

