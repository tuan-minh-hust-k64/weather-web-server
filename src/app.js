const express = require('express');
const path = require('path');
const hbs = require('hbs');
const { RSA_NO_PADDING } = require('constants');
const geocode = require('./util/geocode');
const forecast = require('./util/forecast');
const app = express();
const post = process.env.PORT || 3000;
//setup path to view, partial
const viewsDirectoryPath = path.join(__dirname,'../template/views');
const partialPath = path.join(__dirname,'../template/partials');



hbs.registerPartials(partialPath);
app.use(express.static(path.join(__dirname,'../public')));
app.set('view engine', 'hbs');
app.set('views', viewsDirectoryPath);
app.get('/weather', function (req, res) {
    if(!req.query.address){
        return res.send({error: 'You not add address yet!'});
    }
    geocode(req.query.address, (err, data) => {
        if(err) {
            return res.send(err);
        }
        forecast(data, (err, data) => {
            if(err) {
                return res.send(err);
            }
            res.send(data);
        })
    });
})
app.get('/about', function (req, res) {
    res.render('about');
})

app.get('/help', function (req, res) {
    res.render('help');
})

app.get('/',function (req, res){
    res.render('index');
})

app.get('*', function (req, res) {
    res.send('404 NOT FOUND');
})

app.listen(post, function(){
    console.log('server is running!');
});