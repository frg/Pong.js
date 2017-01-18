var express = require('express'),
    fs = require('fs');

var app = express(),
    listDir = 'examples';

app.use('/', express.static(__dirname + '/examples'));
app.use('/examples', express.static(__dirname + '/examples'));
app.use('/build', express.static(__dirname + '/build'));

app.get('/', function(req, res) {
    var files = getFiles(listDir).filter(function(element, index) {
        return element.endsWith('.html') === true;
    }).map(function(element, index) {
        return '<a href="/' + element + '">' + element + '</a>';
    }).reduce(function(a, b) {
        return a + '</br>' + b;
    });

    res.send(files);
});

app.listen(3000, function() {
    console.log('listening on port 3000!');
});


function getFiles(dir, files_) {
    files_ = files_ || [];
    var files = fs.readdirSync(dir);

    for (var i in files) {
        var name = dir + '/' + files[i];

        if (fs.statSync(name).isDirectory()) {
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }

    return files_;
}