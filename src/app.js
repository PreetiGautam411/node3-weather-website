const path= require('path');
const express= require('express');
const hbs = require('hbs');
const geocode= require('./utils/geocode');
const forecast= require('./utils/forecast');

// console.log(__dirname);
//console.log(__filename);
// console.log(path.join(__dirname,'../public'));

const app= express();
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");



//Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//route handler
app.get('',(req,res)=>{
res.render('index',{
    title: 'Weather',
    name: "Preeti Gautam"
});
})

app.get('/about',(req,res)=>{
  res.render('about',{
    title:'About Us',
    name:"Preeti Gautam"
  })
})

app.get('/help',(req,res)=>{
   res.render('help',{
    helpText:'This is some helpful text.',
    title:'Help',
    name:'Preeti Gautam'
   })
})

app.get('/weather',(req,res)=>{
  if(!req.query.address){
    return res.send({
          error:'You must provide an address.'
     })
  }
   
  geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
      if(error){
        return res.send({error});
      }

      forecast(latitude,longitude,(error,forecastData)=>{
          if(error){
            return res.send({error});
          }
          res.send({
            forecast:forecastData,
            location,
            address:req.query.address
          })

      })
  })

  // console.log(req.query.address);
  // res.send({
  //   forecast:'hot today',
  //   location:'UP',
  //   address:req.query.address
  // });
})

app.get('/products',(req,res)=>{

     if(!req.query.search){
       return res.send({
          error:'You must provide a search term'
        })
     }

    console.log(req.query.search)
   res.send({
    products:[]
   })
})

app.get('/help/*',(req,res)=>{
   res.render('404',{
    title:'404',
    name:'Preeti Gautam',
    errorMessage:'Help article not found.'
   });
})

app.get('*',(req,res)=>{
  res.render('404',{
    title:'404',
    name:'Preeti Gautam',
    errorMessage:'Page not found.'
  })
})
//app.com
//app.com/help
//app.com/about
//app.com/weather


app.listen(port,()=>{
    console.log('Server is up on port. '+port);
});
