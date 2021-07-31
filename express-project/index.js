const express = require('express')
const app = express()



app.get('/', (req, res) => {
    res.send('hello')
})

app.get('/api/coures' , (req,res) => {
    res.send(['angular','laravel','node js'])
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("allez"))