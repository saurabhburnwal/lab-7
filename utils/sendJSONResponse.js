export const sendJSONResponse = (res, statusCode, payload) => {
    res.setHeader("Content-type", "application/json")
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET')
    res.statusCode = statusCode
    res.end(JSON.stringify(payload))
}
