const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('convertUpper',(text)=>{
    return text.toUpperCase();
});

app.use((req,res,next)=>{

var time = new Date().toString();
next();
var printlog = 'Access time - '+time+' | Request method - '+req.method+' | Request URL - '+req.url;
console.log(printlog);
fs.appendFileSync('server.log',printlog+'\n');

});

/*app.use((req,res,next)=>{
    res.render('maintance.hbs');
});*/

app.use(express.static(__dirname+'/public'));

app.get('/',(req,res)=>{
// res.send('<h2> Page is displaing with express </h2>');
//    res.send({
//        name:'lakith',
//        likes:[
//            'biking',
//            'swimming',
//            'computing'
//        ]
//    });

res.render('home.hbs',{
    welcome:'Welcome to my first node web suite',
    pageTitle:'Home page',
    year: new Date().getFullYear()
});

});

app.get('/about',(req,res)=>{

    //res.send('<h3> This is the about us page </h3>');
    res.render('about.hbs',{
        pageTitle:'About us page',
        year: new Date().getFullYear()
    });

});

app.get('/bad',(req,res)=>{

    res.send({
        error:'bad request send'
    });

});
app.get('/projects',(req,res)=>{

    //res.send('<h3> This is the about us page </h3>');
    res.render('projects.hbs',{
        pageTitle:'projects page',
        year: new Date().getFullYear()
    });

});


app.listen(port,()=>{
    console.log('Server is up on port '+port);
});