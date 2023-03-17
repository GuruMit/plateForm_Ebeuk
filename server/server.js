const express = require('express')
const app = express()
const cors = require("cors");
const clientRouter = require('./routes/clients')
const claimRoute = require('./routes/claimRoute')
const userRouter = require('./routes/users')

const annonceRouter = require('./routes/annonces')

const Port = 5000 ;

app.use(express.json()); // post and get json files from endpoint
app.use(cors());//middleware
app.use("/api/clients", clientRouter);
// app.use("/api/userLogin", userRouter);
// app.use("api/setCustomClaims/:uid", claimRoute);
app.use("/api/annonces", annonceRouter);






app.listen (Port , () => console.log(`App listening on port ${Port}`))