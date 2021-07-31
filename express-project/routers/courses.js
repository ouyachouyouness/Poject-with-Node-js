
const express = require('express')

const router = express.Router();


let courses = [
    {id : 1, title: 'Angular'},
    {id : 2, title: 'React js'},
    {id : 3, title: 'vue js'}
]






router.get('/', (req, res ) => {
    res.send(courses)
})
//POST
router.post('/', (req,res) => {

    const {error, value} = validateCourse(req.body)

    if(error){
        res.status(400).send(error.details[0].message)
    }

    const course = {
        id: courses.length + 1,
        title: value.title
    }

    courses = [...courses, course];

    res.send(course)
})

// PUT
router.put('/:id', (req,res) => {
    //very course exisr or not 
    let course = courses.find(course => course.id === parseInt(req.params.id))

    if(!course){
        res.status(404).send('course not found !!')
    }
    //validate course 
   

    const {error, value} = validateCourse(req.body)

    if(error){
        res.status(400).send(error.details[0].message)
    }
    // modify course 

    course.title = value.title
    //send course 
    res.send(course)

})



//GET


//
router.delete('/:id', (req,res) => {

    //verify existing course or not 
    let course = courses.find(course => course.id === parseInt(req.params.id))

    if(!course){
        res.status(404).send('course not found !!')
    }
    
    //delete course 
    const index = courses.indexOf(course);
    courses.splice(index, 1);


    //send response
    res.status(204).send({})

})


function validateCourse(course){
    const schema = Joi.object({
        title: Joi.string().alphanum().min(3).max(10).required()

    })
    return schema.validate(course)
}

module.exports = router