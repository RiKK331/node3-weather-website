const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// define paths for configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join (__dirname, '../templates/partials')

// setup handlebars engine
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static stuff
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    creator: 'RiK Munoz'
  })
})

app.get('/about', (req, res) => {
    res.render('about', {
      title: 'About me',
      creator: 'RiK Munoz'
    })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    creator: 'RiK Munoz',
    msg: 'This is the help section'
  })
})

app.get('/weather', (req, res) => {
      if (!req.query.address) {
          return res.send({
             error: 'You must provide an address'
          })
      }
    res.send({
            forecast: 'It is sunny',
            location: 'Malaga',
            address: req.query.address
      })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
      return res.send({
        error: 'you must provide a search term'
      })
  }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000')
})