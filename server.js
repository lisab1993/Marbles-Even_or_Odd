const express = require('express')
const app = express()
const port = process.env.PORT || 8000

app.listen(port, function() {
    console.log('server listening on 8000')
})