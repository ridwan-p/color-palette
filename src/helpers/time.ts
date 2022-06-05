export const minuteAndSecond = (second: number): string => {
    const minute = Math.floor(second / 60)
    const m = `0${minute}`.slice(-2)
    const s = `0${second % 60}`.slice(-2)
    return `${m}:${s}`
}