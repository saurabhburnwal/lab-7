
export async function getDataFromDB() {
  return fetch('https://saurabhburnwal.github.io/restaurant-api/restaurants.json')
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching data from DB:', error)
      throw error
    })
}
