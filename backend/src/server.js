const express = require('express')
const ConfigViewEngine = require('./config/viewengine')
const router = require('./routes')
const connectDb = require('./config/connectDb')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

//config engine
ConfigViewEngine(app)

router(app);

//connet db
connectDb();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})