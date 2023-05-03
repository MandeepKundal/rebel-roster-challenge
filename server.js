const port = 5000

const express = require('express')
const app = express()

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})