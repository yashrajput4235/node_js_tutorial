const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/person');

// Initialize passport
passport.use(new LocalStrategy(
  // The fields are usernameField and passwordField, you can customize them if needed.
  async (username, password, done) => {
    try {
      //console.log('Received credentials:', username, password);

      // Await the result of the database query
      const user = await Person.findOne({ username: username });

      // Check if user exists
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      const isPasswordMatch=user.comparePassword(password);

      // Compare the plain text password (NOT SECURE, but as per your requirement)
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect password.' });
      }
    } catch (err) {
      return done(err);
    }
  }
));

module.exports=passport;