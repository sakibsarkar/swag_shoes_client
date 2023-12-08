// add item to localStorafe
export const addItemToLS = (itemName, item) => {
    return localStorage.setItem(itemName, JSON.stringify(item))
}



// get item from localStorage
export const getItemFromLS = (itemName) => {
    const item = JSON.parse(localStorage.getItem(itemName))
    return item
}


// remove item from local storage
export const deleteItemFromLS = (itemName) => {
    return localStorage.removeItem(itemName)
} 