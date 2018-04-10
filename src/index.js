import Express from 'express'
import mongoose from 'mongoose'
import session from 'express-session'
import bodyParser from 'body-parser'
import passportConfig from './config/passport'
import routesUser from './server/users/routes'
import routesGradient from './server/gradients/routes'

const app = new Express()

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

// Static
app.use('/public', Express.static('public'))

// MongoDB
mongoose.connect('mongodb://localhost/gradientdb')

// Passport
passportConfig(app)

// Routes
app.use('/', routesUser)
app.use('/', routesGradient)

app.get('/', (req, res) => {
  const photoUser = req.user && req.user.photo ? req.user.photo : ''
  return res.send(`<html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Gradient</title>
      <link rel="stylesheet" href="/public/css/app.css" />
    </head>
    <body>
      <div id="app">
        <h1>Hi!!!</h1>
      </div>
      <script>var photoUser = "${photoUser}"</script>
      <script src="/public/js/app.min.js"></script>
    </body>
  </html>`)
})

app.listen(3000, () => {
  console.log('La app esta corriendo en el puerto 3000.')
})
