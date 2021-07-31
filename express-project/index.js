const express = require('express')
const app = express()
const Joi = require('joi')
const helmet = require('helmet')
const morgan = require('morgan')
const config = require('config')
const courses = require('./routers/courses')
const home = require('./routers/home')
const logged = require('./middleware/logged')


app.use(express.json())
app.set('view engine', 'pug');
app.set('views', './views');
app.use('/api/courses', courses)
app.use('/', home)
app.use(logged.log)


//Configuration
console.log(`App Name: ${config.get('name')}`);
console.log(`Mail server: ${config.get('mail.host')}`);
console.log(`Mail password: ${config.get('mail.password')}`);




console.log(`NODE_ENV: ${process.env}`);
console.log(`Mode : ${app.get('env')}`);



app.use(express.static('public'))
if(app.get('env' === 'development'))
{

    app.use(morgan('tiny'))
}
app.use(express.urlencoded());
app.use(helmet());
app.use((req, res, next) => {
    console.log('Ahutentificated...');
    next()
})




//BASE


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`the app listening the port ${port} ...`))



// app.get('/', (req, res) => {
//     res.send('hello')
// })

// app.get('/api/courses' , (req,res) => {
//     res.send(['angular','laravel','node js'])
// })

// app.get('/api/courses/:id' , (req,res) => {
//     res.send(req.params.id, req.params.year, req.params.mounth)
// })