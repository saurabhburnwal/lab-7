export const getDataByPathParams = (data, searchType, searchName) => {
    return data.filter((restaurant) => {
        return restaurant[searchType].toLowerCase() === searchName.toLowerCase()
    })
}
