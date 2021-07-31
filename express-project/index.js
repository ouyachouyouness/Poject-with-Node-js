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

    

    app.put('/api/courses/:id', (req,res) => {
        //very course exisr or not 
        let course = courses.find(course => course.id === parseInt(req.params.id))

        if(!course){
            res.status(404).send('course not found !!')
        }
        //validate course 
        const schema = Joi.object({
            title: Joi.string().alphanum().min(3).max(10).required()
    
        })
    
        const {error, value} = schema.validate(req.body)
    
        if(error){
            res.status(400).send(error.details[0].message)
        }
        // modify course 

        course.title = value.title
        //send course 
        res.send(course)
    
    })

    
    const course = {
        id: courses.length + 1,
        title: value.title
    }

    courses = [...courses, course];

    res.send(course)
})

app.get('/api/courses' , (req,res) => {
    res.send(courses)
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`the app listening the port ${port} ...`))