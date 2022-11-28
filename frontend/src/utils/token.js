export const validateToken = (token) => {
    if(token === null){
        return null
    }
    
    const exp = token.split('.')[1]

    if (exp * 1000 < Date.now()) {
        return false
    }

    return true
}

export const setStorage = (key, value) => sessionStorage.setItem(`${key}`, JSON.stringify(value))

export const getToken = (key) => {
    try {
        return JSON.parse(sessionStorage.getItem(`${key}`));
    } catch (error) {
        return ""
    }
}
