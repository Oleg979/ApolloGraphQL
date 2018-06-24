const express = require('express')
const graphQL = require('express-graphql')
const app = express()
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

app.use(cors())

mongoose.connect('mongodb://localhost:27017/myApp')
mongoose.connection.once('open', () => {
    console.log('Connected to db...')
})


app.use('/', graphQL({
    schema,
    graphiql : true
}))

app.listen(4000, () => {
    console.log("Server is started...")
})