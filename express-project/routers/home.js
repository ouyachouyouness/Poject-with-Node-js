const express = require('express')

const router = express.Router();


router.get('/' , (req,res) => {
    res.render('index' , {
        title: 'My first app with express',
        content: 'Lorem ipsum'
    })
})


module.exports = router