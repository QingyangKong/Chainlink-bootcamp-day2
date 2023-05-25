// This example shows how to make a decentralized price feed using multiple APIs
// const tempRequest = Functions.makeHttpRequest({
//   url: `https://restapi.amap.com/v3/weather/weatherInfo?city=110000&key=<YOUR_API_KEY>`,
// })

const crypto = require("crypto")
const querystring = require("querystring")

const getOauthToken = async (iss, key) => {
  // Replace \n character with actual newline character
  const privateKey = key.replace(/\\n/g, "\n")
  // const privateKey = key

  console.log("privatekey: " + privateKey)

  const jwtBase64Headers = Buffer.from('{"alg":"RS256","typ":"JWT"}').toString("base64")

  const currentTimeInSeconds = Math.round(Date.now() / 1000)

  const jwtClaimSetObj = {
    iss: iss,
    scope: "https://www.googleapis.com/auth/cloud-platform.read-only",
    aud: "https://oauth2.googleapis.com/token",
    exp: currentTimeInSeconds + 3500,
    iat: currentTimeInSeconds,
  }

  const jwtBase64ClaimSet = Buffer.from(JSON.stringify(jwtClaimSetObj)).toString("base64")

  const stringToSign = `${jwtBase64Headers}.${jwtBase64ClaimSet}`
  const jwtBase64Signature = crypto.sign("RSA-SHA256", stringToSign, privateKey).toString("base64")
  const jwtRequest = {
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    assertion: `${jwtBase64Headers}.${jwtBase64ClaimSet}.${jwtBase64Signature}`,
  }

  const jwtRequestString = querystring.stringify(jwtRequest)

  console.log("jwt: " + jwtRequestString)

  const tokenResponse = await Functions.makeHttpRequest({
    url: "https://oauth2.googleapis.com/token",
    method: "post",
    data: jwtRequestString,
  })

  console.log("tokenResponse: " + tokenResponse)

  return tokenResponse.data.access_token
}

const iss = secrets.serviceAccount
console.log("iss " + iss)
const isskey = secrets.serviceAccoutKey
console.log("isskey " + isskey)
const projectId = secrets.googleProjectId
const queryStatement =
  'SELECT * FROM `bigquery-public-data.noaa_gsod.gsod20*` WHERE CAST(YEAR AS INT64) = 2023 AND CAST(MO AS INT64) = 5   AND CAST(DA AS INT64) = 1  and stn="486980";'

const requestConfig = {
  method: "post",
  url: `https://bigquery.googleapis.com/bigquery/v2/projects/${projectId}/queries`,
  headers: {
    Authorization: `Bearer ${await getOauthToken(iss, isskey)}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  data: {
    query: queryStatement,
    useLegacySql: false,
  },
}

const request1 = Functions.makeHttpRequest(requestConfig)

const responses = await Promise.all([request1])

const temp = responses[0].data.rows[0].f[6].v

return Functions.encodeUint256(Math.round(temp))
