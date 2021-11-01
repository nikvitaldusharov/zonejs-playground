const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
app.use(cors());
console.log(process.argv);

app.use('/dist', express.static(path.join(__dirname, '../node_modules/zone.js/dist')))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, `../${process.argv[2]}`));
});

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
app.listen(port, function () {
    console.log('Server started on port ' + port);
});


