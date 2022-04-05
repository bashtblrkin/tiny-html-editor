export const validateDataHistory = (prev: { title: string, func: () => void }[], type: string, pasteNewContent: () => void) => {
    let isHas = false
    prev.forEach((item => {
        if (item.title === type) {
            isHas = true
            return
        }
    }))
    if (isHas) {
        return [...prev]
    } else {
        return [{
            title: type,
            func: pasteNewContent
        }, ...prev]
    }
}