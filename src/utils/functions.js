export const currencyFormat = (text = 0) => {
    return 'Rp. ' + text.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

export const currencyFormat2 = (text) => {
    // Number(myString).toFixed(2)
    return 'Rp. ' + Number(text).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}