var express = require('express');
var app = express();

var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//Require the handlebars express package
var handlebars = require('express-handlebars');
var bcrypt = require('bcryptjs');
const passport = require('passport');
const session = require('express-session');



const port = process.env.PORT || 3000;
//const mongoURL = process.env.mongoURL || 'mongodb://localhost:27017/handlebars'

const { isAuth } = require('./middleware/isAuth');
const { Search } = require('./middleware/Search');

//const { friendIsAdded } = require('./middleware/friendIsAdded');
//const { groupIsAdded } = require('./middleware/groupIsAdded');
require('./middleware/passport')(passport);

const Contact = require('./models/Contact');
const User = require('./models/User');
//const Calendar = require('./models/Calendar');
//const UserInputRota = require('./models/User');

app.use(express.static('public'));

app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge:6000 }
    })
);

app.use(passport.initialize());
app.use(passport.session());
//We Use body Parser to structure the request into a format that is simple to use
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
//use app.set to tell express to use handlebars as our view engine
app.set('view engine', 'hbs');
//Pass some additional information to handlebars to that is can find our layouts folder, and allow
//us to use the .hbs extension for our files.
app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs'
}))

app.get('/', (req, res) => {
    try {
        res.render('signIn', { layout: 'main' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }

})

//Dashboard view
app.get('/dashboard', isAuth, (req, res) => {
    try {
        console.log(req.user.id);
        Contact.find({  }).lean()
            .exec((err, contacts) => {
                if (contacts.length) {
                    res.render('dashboard', { layout: 'main', contacts: contacts, contactsExist: true, username: req.user.username });
                } else {
                    res.render('dashboard', { layout: 'main', contacts: contacts, contactsExist: false });
                }
            });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }

});

app.get('/signout', (req, res) => {
    //Logs the logged in user out and redirects to the sign in page
    req.logout();
    res.redirect('/');
})

app.get('/signup', (req, res) => {
    try {
        res.render('signUp', { layout: 'main' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }

})

app.get('/home', (req, res) => {
    try {
        res.render('home', { layout: 'main', personalisedName: req.user.personalisedName });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})

app.get('/myrota', (req, res) => {
    try {
        res.render('myrota', { layout: 'main' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})

app.get('/myfriends', (req, res) => {
    try {
        res.render('myfriends', { layout: 'main' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})
app.get('/mygroups', (req, res) => {
    try {
        res.render('mygroups', { layout: 'main' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})
app.get('/mymeets', (req, res) => {
    try {
        res.render('mymeets', { layout: 'main' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})
app.get('/calendar', (req, res) => {
    try {
        res.render('calendar', { layout: 'main' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})

app.get('/addNewGroup', (req, res) => {
    try {
        Contact.find({  }).lean()
        .exec((err, contacts) => {
            if (contacts.length) {
                res.render('newgroup', { layout: 'main', contacts: contacts, contactsExist: true });
            } else {
                res.render('newgroup', { layout: 'main', contacts: contacts, contactsExist: false });
            }})

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }

})

app.post('/addNewGroup', async (req, res)=>{
    try {
        const { groupName, members } = req.body;
        const newGroup = {
            groupName, members
        }
        const user = await User.findOne({user: req.user.id})
        user.contactGroups.unshift(newGroup)
        await user.save()
        res.redirect('/mygroups')
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }

})

//POST Signup
app.post('/signup', async (req, res) => {
    const { username, personalisedName, password } = req.body;
    try {
        let user = await User.findOne({ username });
        //If user exists stop the process and render login view with userExist true
        if (user) {
            return res.status(400).render('login', { layout: 'main', userExist: true });
        }
        //If user does not exist, then continue
        user = new User({
            personalisedName,
            username,
            password
        });
        //Salt Generation
        const salt = await bcrypt.genSalt(10);
        //Password Encryption using password and salt
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        res.status(200).render('signIn', { layout: 'main', userDoesNotExist: true });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})

app.post('/signin', (req, res, next) => {
    try {
        passport.authenticate('local', {
            successRedirect: '/home',
            failureRedirect: '/?incorrectLogin'
        })(req, res, next)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }

})


app.post('/addFriend', (req, res) => {
    //Uses destructuring to extract name, email and number from the req
    const { email } = req.body;
    try {
        let contact = new Contact({
            email
        });

        contact.save()
        res.redirect('/home?contactSaved');
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }

})

app.get('/addFriend', (req, res) => {
    try {
        Contact.find({  }).lean()
        .exec((err, contacts) => {
            if (contacts.length) {
                res.render('myfriends', { layout: 'main', contacts: contacts, contactsExist: true });
            } else {
                res.render('myfriends', { layout: 'main', contacts: contacts, contactsExist: false });
            }})

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }

})
app.post('/addContact', (req, res) => {
    //Uses destructuring to extract name, email and number from the req
    const { email } = req.body;

    let contact = new Contact({
        
        email
    });

    contact.save()
    res.redirect('/home?contactSaved');
})

app.post('/addUserToGroup', (req, res) => {
    //Uses destructuring to extract name, email and number from the req
    const { email, groupName } = req.body;

    let contact = new Contact({
        
        groupName,
        email
    });

    contact.save()
    res.redirect('/mygroups?groupSaved');
})



// app.post('/addContact', async (req, res) => {
//     const { username } = req.body;
//     try {
//         let user = await User.findOne({ username });
//         //If user exists stop the process and render login view with userExist true
//         if (user) {
//             return res.status(400).render('login', { layout: 'main', userExist: true });
//         }
//         //If user does not exist, then continue
//         user = new User({
//             username,
           
//         });
//         //Salt Generation

//         await user.save();
//         res.status(200).render('myfriends', { layout: 'main', userDoesNotExist: true });
//     } catch (err) {
//         console.log(err.message);
//         res.status(500).send('Server Error')
//     }
// })

app.post('/addNewGroup', (req, res) => {
    //Uses destructuring to extract name, email and number from the req
    const { groupName } = req.body;
    try {
        let group = new Group({
            groupName
        });

        contact.save()
        res.redirect('/mygroups?groupSaved');
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }

})

//mongoose.conntect(mongodb://localhost:27017/handlebars')
mongoose.connect('mongodb+srv://admin:beckypassword@cluster0-mhtdk.mongodb.net/handlebars?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => {
        console.log('connected to DB')//Upon Successful connection, we are using a Javasctipt .then block here to give us a message in in our console 
    })
    .catch((err) => {
        console.log('Not Connected to DB : ' + err);//Upon unuccessful connection, we are using a Javasctipt .catch block here to give us a message in in our console with err displayed so that we can see what the issue is.
    });

//Listening for requests on port 3000
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
