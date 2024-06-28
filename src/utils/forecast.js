const request= require('postman-request');


const forecast= (latitude ,longitude , callback)=>{
    const url='https://api.openweathermap.org/data/2.5/weather?lat='+encodeURIComponent(latitude) +'&lon='+encodeURIComponent(longitude)+'&appid=9dfea937d0356cf4e675ed5faf46052c&units=metric';
   
   
    request({url, json:true},(error,{body})=>{
           if(error){
                callback("Unable to connect to weather service!",undefined);
              }
           else if(body.error){
               callback("Unable to find location",undefined);
              }
           else{
               callback(undefined,
                body.weather[0].description+', It is currently '+
                body.main.temp+' degrees out. It feels like '+body.main.feels_like+" degrees out."
                   
               )
           }   
                 
    })
   }

   module.exports = forecast;
   