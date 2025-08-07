import http from 'node:http'
import { getDataFromDB } from './database/db.js'
import { sendJSONResponse } from './utils/sendJSONResponse.js'
import { getDataByPathParams } from './utils/getDataByPathParams.js'
import { getDataByQueryParams } from './utils/getDataByQueryParams.js'

const PORT = 8000
const server = http.createServer(async (req, res) => {
  const restaurants = await getDataFromDB()

  const urlObj = new URL(req.url, `http://${req.headers.host}`)
  const queryObj = Object.fromEntries(urlObj.searchParams)

  if (urlObj.pathname === '/api' && req.method === 'GET') {
    let filteredData = getDataByQueryParams(restaurants, queryObj)
    console.log(queryObj)
    sendJSONResponse(res, 200, filteredData)
  }
  else if (urlObj.pathname.startsWith('/api/cuisine') && req.method === 'GET') {
    const cuisine = decodeURIComponent(urlObj.pathname.split('/').pop())
    const filteredData = getDataByPathParams(restaurants, 'cuisine', cuisine)
    sendJSONResponse(res, 200, filteredData)
  }
  else if (urlObj.pathname.startsWith('/api/ambiance') && req.method === 'GET') {
    const ambiance = decodeURIComponent(urlObj.pathname.split('/').pop())
    const filteredData = getDataByPathParams(restaurants, 'ambiance', ambiance)
    sendJSONResponse(res, 200, filteredData)
  }
  else {
    sendJSONResponse(res, 404, ({ error: 'not found', message: 'Requested route is not exist' }))
  }
  
})

server.listen(PORT, () => console.log(`Server is running on : ${PORT}`))
