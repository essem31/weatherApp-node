const request=require('request')

const forecast= (latitude, longitude, callback) => {

    const URL= 'https://api.darksky.net/forecast/41c0ca684aed5ae04929e55dbd6712b3/' + encodeURIComponent(latitude) +','+ encodeURIComponent(longitude)+'?units=si'
    request({url:URL, json:true}, (error, {body})=>
    {
        if(error)
        {
            callback('Unable to Connect to Forecast Services!',undefined)
        }
        else if(body.error)
        {
            callback('Unable to find location!!', undefined)
        }
        else
        {
            callback(undefined, body.daily.data[0].summary+" It is currently "+body.currently.temperature+" degrees out. There is a "+(body.currently.precipProbability)*100+"% chance of rain")
        }
    })
}

module.exports=forecast