require('dotenv').config()
const axios = require('axios')
const { generateShipmentRequest } = require('./generateShipmentRequest')
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let bearerAuth = ''

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': ''
  },
  timeout: 1000 * 30
}

const askUserInputs = () => {
  rl.question("How many shipment request should I create? ", function(requests) {
    rl.question("How long should I wait between request (ms)? ", function(wait) {
      fireOffRequest(requests, wait)
      rl.close()
    })
  })
}

const initSession = async () => {
  const initialAccessToken = await getInitialAccessToken()
  bearerAuth = await getSecondaryAccessToken(initialAccessToken)
  
  askUserInputs()
}

const getInitialAccessToken = async () => {
  return new Promise(async (resolve, reject) => {
    const body = {
      grant_type: 'client_credentials',
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET
    }
  
    try {
      const { data } = await axios.post(
        `http://${process.env.APP_IP_ADDRESS}/api/oauth/token`,
        body,
        axiosConfig
      )
      return resolve(data.access_token)
    } catch (err) {
      console.log('[Error: Initial Access Token Request] ', err)
      reject(err)
    }
  })
}

const getSecondaryAccessToken = async (initialToken) => {
  return new Promise(async (resolve, reject) => {
    axiosConfig.headers['Authorization'] = `Bearer ${initialToken}`

    const body = {
      grant_type: 'password',
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET
    }

    try {
      const { data } = await axios.post(
        `http://${process.env.APP_IP_ADDRESS}/api/oauth/token`,
        body,
        axiosConfig
      )

      return resolve(data.access_token)
    } catch (err) {
      console.log('[Error: Secondary Token Request] ', err)
      reject(err)
    }
  })
}

const fireOffRequest = async (requests, wait) => {
  if(requests === 0) {
    console.log('All requests made!')
    return
  }

  axiosConfig.headers['Authorization'] = `Bearer ${bearerAuth}`
  body = generateShipmentRequest()

  try {
    await axios.post(
      `http://${process.env.APP_IP_ADDRESS}/api/shipment_request`,
      body,
      axiosConfig
    )
   
    await new Promise(r => setTimeout(r, wait))
    fireOffRequest(requests - 1, wait)

  } catch (err) {
    console.log('[Error: Generating Request] ', err)
  }
}

initSession()