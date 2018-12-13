var express = require('express')
var bodyParser = require('body-parser')

var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

var todoList = [
    {
        id: 1,
        todo: "Implement a REST API"
    }
]

// GET /api/todos
app.get('/api/todos', function(req, res, nextFn){
    res.send(todoList)
})

// POST /api/todos
app.post('/api/todos', function(req, res, nextFn){
    todoList.push(req.body)
    // todoList.push({id:2,todo:"next todo item"})
    res.send(todoList)
    // TODO: make sure that req.body is a valid TODO item
})

// GET /api/todos/:id
app.get('/api/todos/:id', function(req, res, nextFn){
    function findObjectByKey(array, key, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][key] === value) {
                return array[i]
            }
        }
        return null
    }
    res.send(findObjectByKey(todoList, 'id', parseInt(req.params.id)))
})

// PUT /api/todos/:id
app.put('/api/todos/:id', function(req, res, nextFn){
    var index = todoList.findIndex(x => x.id == (req.params.id))
    todoList[index] = (req.body)
    res.send(todoList)
})

// DELETE /api/todos/:id
app.delete('/api/todos/:id', function(req, res, nextFn){
    var index = todoList.findIndex(x => x.id == (req.params.id))
    todoList.splice(index, 1)
    res.send(todoList)
})

app.listen(3000, function(){
    console.log('Todo List API is now listening on port 3000...');
})