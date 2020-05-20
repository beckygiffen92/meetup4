module.exports = {
    friendIsAdded: (req, res, next) => {
        try {
            if (req.isAuthenticated()) {
                return next();
            } else {
                res.redirect('/addFriend');
            }
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error')
        }
    }
}