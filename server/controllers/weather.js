const axios = require('axios');

module.exports = {
    getWeather: (req, res) => {
        let info = req.info
       axios.get(`https://api.weatherbit.io/v2.0/current?city=${info.city}&key=${process.env.weatherKey}`)
       .then((result) => {
           res.status(200).json({
               temp : result.data.data[0].temp,
               loc : info.city,
               desc :result.data.data[0].weather.description
           })
       }).catch((err) => {
           console.log(err);
       });
       
    }
};