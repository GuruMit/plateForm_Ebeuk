const express = require('express')
const app = express()
const cors = require("cors");
const clientRouter = require('./routes/clients')
const annonceRouter = require('./routes/annonces')

const Port = 5000 ;

app.use(express.json()); // post and get json files from endpoint
app.use(cors());//middleware
// app.use("/api/clients", clientRouter);
app.use("/api", annonceRouter);




app.listen (Port , () => console.log(`App listening on port ${Port}`))