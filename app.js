
const express = require('express')
const app = express()

const login = require('./routes/login')
const signup = require('./routes/signup')
const forget = require('./routes/forget')
const registeremp = require('./routes/registeremp')
const empattendance = require('./routes/empattendance')

const bodyParser = require('body-parser')
const logger = require('morgan')

app.use(logger('dev'))
app.use('/public', express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/login', login)
app.use('/register', signup)
app.use('/forgot', forget)
app.use('/registerEmp', registeremp)
app.use('/attendance', empattendance)
app.use('/update_salary', empattendance)

app.set('view engine', 'ejs')

app.get('/', (req,res) => {
  res.render('index')
})

const port = process.env.port || 8080
app.listen( port, () => console.log(`listening on port ${port}`) )