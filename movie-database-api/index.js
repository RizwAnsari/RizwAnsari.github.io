var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');

var app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
// app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
	res.render('search');
});

app.get('/result', (req, res) => {
	var mName = req.query.movieName;
	var url = `http://www.omdbapi.com/?apikey=thewdb&s=${mName}`;
	request(url, (error, response, body) => {
		if (!error && response.statusCode == 200) {
			var objectData = JSON.parse(body);
			// console.log(objectData.Search[0].Title);
			res.render('result', { movies: objectData });
		} else {
			console.log(error);
		}
	});
});
// app.post('/result', (req, res) => {
// 	var mName = req.body.movieName;
// 	request('http://www.omdbapi.com/?apikey=thewdb&s=' + mName, (error, response, body) => {
// 		if (!error && response.statusCode == 200) {
// 			var objectData = JSON.parse(body);
// 			// console.log(objectData.Search[0].Title);
// 			res.render('result.ejs', { movies: objectData });
// 		} else {
// 			console.log(error);
// 		}
// 	});
// });

app.listen(3000, () => {
	console.log('Movie Database App Started On Port 3000');
});
