var app = require('express')()

var mongoose = require('mongoose')

var bodyParser = require('body-parser')

app.use(bodyParser.json())

//create a connection to database
mongoose.connect('mongodb+srv://yhk8462:younghokim0308@cluster0-qvvul.mongodb.net/StudentProjects?retryWrites=true&w=majority')

//define a "table" structure
var ProjectSchema = new mongoose.Schema({
    sId: String,
    sName: String,
    sYear: String,
    cId: String,
    cName: String,
    sem: String,
    aName: String,
    aDes: String,
    aPer: String,
    tech: String,
    scope: String,
    des: String,
    company: String,
    app: String,
    photoURL: String,
})

//create a model Student ==> students (database collection)
//Teacher => teachers , Course => courses
var Project = mongoose.model('Project', ProjectSchema)

app.get('/projects', function (req, res) {
    Project.find({}, function (err, projects) {
        res.send(projects)
    })
})

app.post('/projects', function (req, res) {
    Project.create(req.body, function (err, project) {
        res.send(project)
    })
})

app.delete('/projects/:id', function (req, res) {
    Project.deleteOne({ id: req.params.id }, function (err, result) {
        res.send(result)
    })
})

app.put('/projects/', function (req, res) {
    Project.findOneAndUpdate({ id: req.body.id }, { name: req.body.name }, function (err, result) {
        res.send(result)
    })
})


app.get('/projects/search/:keyword', function (req, res) {
    Project.find({ name: req.params.keyword }, function (err, result) {
        res.send(result)
    })
})


app.listen(27017)