import { NextResponse } from "next/server"


export const SuccessUpdate = (data: unknown) => {
	return NextResponse.json(
		{
			error: false,
			message: "Updated successfully",
			data: data,
		},
		{ status: 200 }
	)
}

export const SuccessDelete = () => {
	return NextResponse.json(
		{
			error: false,
			message: "Deleted successfully",
		},
		{ status: 200 }
	)
}

export const SuccessCreate = (data: unknown) => {
	return NextResponse.json(
		{
			error: false,
			message: "Created successfully",
			data: data,
		},
		{ status: 201 }
	)
}

export const SuccessResponse = (data: unknown) => {
	return NextResponse.json(
		{
			error: false,
			response: data,
		},
		{ status: 200 }
	)
}
