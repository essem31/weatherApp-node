// this file is the starting point of our node application. 
const express= require('express');
const path= require('path')
const hbs= require('hbs')
const geocode= require('./utils/geocode')
const forecast= require('./utils/forecast')


//path module is a basic node module already buit in so there is no need to download. path.join function is used to find out the path and attach it to a string (in this case the /public folder)

const app=express()  //the express module is basically a function

//Define Path for express config//
const publicDirectory= path.join(__dirname,'../public')
const viewsPath= path.join(__dirname,'../templates/views')
const partialsPath= path.join(__dirname,'../templates/partials')

//setup handlebar engine//
app.set('view engine','hbs') 
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)  //takes a path to the directory where the partials are present

// .set() allows us to set a value for a given express setting.
//hbs uses 'handlebars npm module' behind the scenes and is used for easy integration between express and handlebars module.
//express expects all of the views  (i.e. hbs) to be in a specific folder (views)

//Setup static directory to serve
app.use(express.static(publicDirectory)) 

// static() function takes the path of folder we want to serve up 

// what the server should do when someone requests a specific URL is done by using app.get() funtion.

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name: 'Shashank'
    }) // first argument- the view name ||| second argument- an object to pass values to that view
})   // render allows to render a view created in HBS. It is in 'views' folder.

app.get('/about',(req,res)=>
{
    res.render('about',{
        name: 'Shashank',
        title:'About This jet'
    })
})

app.get('/help',(req,res)=>
{
    res.render('help',{
        title:'HELP',
        helpmessage:'This is a help message',
        name:'shashank'
    })
})


// app.get('/help', (req,res)=>     
// {


//     // res.send([{
//     //     name: "shashank",
//     //     age: 27
//     // },{
//     //     name: "shivangi",
//     //     age: 30 
//     // }]) //sending back JSON
// })

// app.get('/about', (req,res)=>
// {
//     res.send('<p><i>This paragragh will contain a lot of information</p>')
// })

app.get('/weather', (req,res)=>
{
    if(!req.query.address)  // we use a query string. In browser URL we add request & response (address=raipur). then req.query.address checks if that value has been provided in the URL or not. If not then an error message is sent in the form of JSON
    {
        return res.send({
            error: "You must add an address"
        })
    }

    geocode(req.query.address, (error, {latitude,longitude, location} ={})=>
{
    if(error)
    {
        return res.send({ error })
    }

    forecast(latitude,longitude, (error, forecastData) => {
        if(error)
        {
            req.send({ error })
        }
         res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        }
    )
})


})



app.get('/products', (req,res)=>
{
    if(!req.query.search)  
    {
            return res.send({
            error: 'You must provide a search term'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res)=> 
{
    res.render('404',{
        title: '404',
        name: "Shashank",
        message: "Help page not found"
    })
})

app.get('*', (req,res)=> // '*' is a special character provided by express which means all the urls except the one provided above will be given a message that "This server does not support the specific URL provided".
{                        //  Why does this page route be put to last? It is because express searches for the URLs from the top of the page and if this page call(route handler) is put to the top it will display error message for a proper URL for which we have made a proper page call.
    res.render('404',{
        title: '404',
        name: "Shashank",
        message: "Page not found"
    })
})


app.listen(3000, ()=> {   // .listen takes in 2 arguments---> port number (where the server will run) and a function which will be executed if the server is started succesfully.
    console.log('Server is up on port 3000!!!')
})

