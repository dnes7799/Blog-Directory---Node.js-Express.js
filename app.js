const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { result } = require('lodash');
const methodOverride = require('method-override');
const blogRoutes = require('./routes/blogRoutes');


//express app
const app = express();

//connect to MongoDB
const dbURI = 'mongodb+srv://Dnes:newlife7@cluster0.ld69d.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

//register view engines
app.set('view engine', 'ejs');

//middleware & static files 
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));


//routes

app.get("/", (req, res) => {
    res.render('index', { title: 'Home' });
});

app.get("/about", (req, res) => {
    res.render('about', { title: 'About' });
})

//blog routes
app.use(blogRoutes);


app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})
