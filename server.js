const express = require('express')
const path = require('path');

const app = express()
const port = process.env.PORT || 8000

app.use(express.static(path.resolve(__dirname, "./evenoddapp/build")));


app.listen(port, () =>{
    console.log(`Server is running on port ${port}!`)
})