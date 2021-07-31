const express = require('express')
const app = express()
const Joi = require('joi')

app.use(express.json())

let courses = [
    {id : 1, title: 'Angular'},
    {id : 2, title: 'React js'},
    {id : 3, title: 'vue js'}
]


// app.get('/', (req, res) => {
//     res.send('hello')
// })

// app.get('/api/courses' , (req,res) => {
//     res.send(['angular','laravel','node js'])
// })

// app.get('/api/courses/:id' , (req,res) => {
//     res.send(req.params.id, req.params.year, req.params.mounth)
// })

app.post('/api/courses', (req,res) => {

    const schema = Joi.object({
        title: Joi.string().alphanum().min(3).max(120).required()

    })

    schema.validate(req.body)
    if(!req.body.title || req.body.title.length <3){

        res.status(400).send('title is required and must be great hten 3 caracter')
    }
    const course = {
        id: courses.length + 1,
        title: req.body.title
    }

    courses = [...courses, course];

    res.send(course)
})

app.get('/api/courses' , (req,res) => {
    res.send(courses)
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`the app listening the port ${port} ...`))