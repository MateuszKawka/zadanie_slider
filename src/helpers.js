export const saveLikesToLocalStorage = (images) => {
    localStorage.setItem("images-likes", JSON.stringify(images));
}

export const getLikesFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("images-likes")) || [];
}