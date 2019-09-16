var express = require('express')
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var router=require('./router');
// app.get('/addUser', (req, res) => {
//     res.send('12')
    
// })
app.use(router);

app.listen(3000, () => console.log('Example app listening on port 3000!'))