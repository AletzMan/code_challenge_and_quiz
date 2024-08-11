interface ICurrentDate {
    date: string
    hour: string
}

export const GetCurrentDay = (): ICurrentDate => {
    const now = new Date()
    const day = now.getDate()
    const month = now.getMonth()
    const hour = now.getHours()
    const minute = now.getMinutes()


    const newDate: ICurrentDate = {
        date: `${day} ${month}`,
        hour: `${hour}:${minute}`
    }


    return newDate
}