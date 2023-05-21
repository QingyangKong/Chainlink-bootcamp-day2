// This example shows how to make a decentralized price feed using multiple APIs
// const tempRequest = Functions.makeHttpRequest({
//   url: `https://restapi.amap.com/v3/weather/weatherInfo?city=110000&key=<YOUR_API_KEY>`,
// })

const tempRequest = Functions.makeHttpRequest({
  url: `https://dataservice.accuweather.com/currentconditions/v1/300597?apikey=<YOUR_API_KEY>`,
})

const [tempResponse] = await Promise.all([tempRequest])

const temps = []

if (!tempResponse.error) {
  // temps.push(tempResponse.data.lives[0].temperature)
  temps.push(tempResponse.data[0].Temperature.Metric.Value)
} else {
  console.log("temp response error")
}

const mediantmp = temps[0]
console.log(`Median temp: ${mediantmp}`)

return Functions.encodeUint256(Math.round(mediantmp))
