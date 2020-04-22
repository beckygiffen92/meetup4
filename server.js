var express = require('express');
var app = express();
//Require the handlebars express package
var handlebars = require('express-handlebars');

var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var Contact = require('./models/Contact');
//use app.set to tell express to use handlebars as our view engine
app.set('view engine', 'hbs');
//Pass some additional information to handlebars to that is can find our layouts folder, and allow
//us to use the .hbs extension for our files.
app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs'
}))
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    Contact.find({}).lean()
        .exec((err, contacts) => {
            if (contacts.length) {
                res.render('index', { layout: 'main', contacts: contacts, contactsExist: true });
            } else {
                res.render('index', { layout: 'main', contacts: contacts, contactsExist: false });
            }
        })
});

app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    var user = new User({
        email,
        username,
        password
    });
    user.save();
    res.redirect('/');
})


app.post('/addContact', (req, res) => {
    const { name, email, number } = req.body;
    var contact = new Contact({
        name,
        email,
        number
    });
    contact.save();
    res.redirect('/');
})

app.get('/', (req, res) => {
    //use res.render to display our about template, using the main layout
    res.render('login', { layout: 'main' });
});

mongoose.connect('mongodb+srv://admin:5b96MaX@cluster0-mhtdk.mongodb.net/test', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => {
        console.log('connected to DB')
    })
    .catch((err) => {
        console.log('Not Connected to DB : ' + err);
    });

//Listening for requests on port 3000
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});