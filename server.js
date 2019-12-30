const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://yhk8462:younghokim0308@cluster0-qvvul.mongodb.net/StudentProjects?retryWrites=true&w=majority', { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    if (req === "OPTIONS") {
        res.header("Access-Control-Allow-Origin", 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
const subscribersRouter = require('./routes/projects')
app.use('/projects', subscribersRouter)

app.listen(3001, () => console.log('Server Started'))