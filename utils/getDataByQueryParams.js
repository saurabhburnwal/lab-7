export const getDataByQueryParams = (data, queryObj) => {

  const { cuisine, ambiance, dietary_options, is_open } = queryObj

  if (cuisine) {
    data = data.filter(restaurant =>
      restaurant.cuisine.toLowerCase() === cuisine.toLowerCase()
    )
  }

  if (ambiance) {
    data = data.filter(restaurant =>
      restaurant.ambiance.toLowerCase() === ambiance.toLowerCase()
    )
  }

  if (dietary_options) {
    data = data.filter(restaurant =>
      restaurant.dietary_options && 
      restaurant.dietary_options.some(option => 
        option.toLowerCase() === dietary_options.toLowerCase()
      )
    )
  }

  if (is_open) {
    data = data.filter(restaurant =>
      restaurant.is_open === JSON.parse(is_open)
    )
  }

  return data
}
