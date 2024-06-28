const request= require('postman-request');
const geocode=(address, callback) =>{
    const url="http://api.openweathermap.org/geo/1.0/direct?q=" +encodeURIComponent(address)+ "&limit=1&appid=9dfea937d0356cf4e675ed5faf46052c"
   
    request({url,json:true},(error,{body})=>{
     if(error){
       callback("Unable yo connect to location services! ",undefined);
     }
     else if(body.length===0){
     callback('Unable to find location. Try another search. ',undefined);
     }
     else{
       callback(undefined,{
           latitude:body[0].lat,
           longitude:body[0].lon,
           location:body[0].local_names.en
       })
     }
    })
   }

   module.exports=geocode;
   