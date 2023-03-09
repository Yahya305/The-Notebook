const  connectMongo= require("./db")
const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000

app.use(cors({
  origin:'http://localhost:3000',
}))
connectMongo();


app.use(express.json())
app.use('/api/randomquote',require('./routes/quote'));
app.use('/api/notes',require('./routes/notes'))
app.use('/api/auth',require('./routes/auth'))
app.use('/api/imagelab',require('./routes/imagelab'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})