import passport from 'passport'
import Facebook from 'passport-facebook'

import User from '../server/users/model'

const FacebookStrategy = Facebook.Strategy
const clientID = '2076326062646927'
const clientSecret = '520596951216cf3c3a93a305fa99dbac'
const callbackURL = 'http://localhost:3000/login/facebook/return'


const passportConfig = (app) => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, 'firstName lastName photo', (err, user) => {
      done(err, user)
    })
  })

  passport.use(new FacebookStrategy({
    clientID,
    clientSecret,
    callbackURL,
    passReqToCallback: true,
    profileFields: ['id', 'profileUrl', 'displayName', 'name', 'picture.type(large)']
  }, (req, accessToken, refreshToken, profile, cb) => {
    User
      .findOne({ facebook: profile.id })
      .then(user => {
        if (user === null) {
          const newUser = new User({
            facebook: profile.id,
            firstName: profile._json.first_name,
            lastName: profile._json.last_name,
            photo: profile._json.picture.data.url
          })
          newUser.save(err => {
            if (err) { console.log(err) }
            return cb(null, newUser)
          })
        }
        return cb(null, user)
      })
  }))

  app.get('/login/facebook', passport.authenticate('facebook'))

  app.get('/login/facebook/return', passport.authenticate('facebook', {
    failureRedirect: '/'
  }), (req, res) => {
    return res.redirect('/')
  })
}

export default passportConfig
