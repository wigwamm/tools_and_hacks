var express = require('express');
var cheerio = require('cheerio');
var request = require('request');
var prompt = require('prompt');
var ejs = require('ejs');

var app = express();
app.use(express.static(__dirname));
app.set('view engine','ejs');
app.engine('ejs', ejs.__express);

app.get('/',function(req,res,next){
    console.log('Someone wants the page!');
    res.render('index');
})

app.get('/outcode/:params',function(req,res,next){
    res.send(JSON.parse(fs.readFileSync('outcodesArr','utf8')));
})

app.get('/find/:params', function(req,res,next){
    console.log('Someone wants Data!');
    var index=0;
    var prices = [];
    getStuff('0/svr','1/svr');
    function getStuff(curId,lastId){
	var url = 'http://www.rightmove.co.uk/property-for-sale/find.html?locationIdentifier=OUTCODE^'+req.params.params.split(',')[0]+
	    '&radius=0&minBedrooms='+req.params.params.split(',')[1]+
	    '&maxBedrooms='+req.params.params.split(',')[1]+
	    '&displayPropertyType='+req.params.params.split(',')[2]+
	    '&index='+index*10;
	
	request(url, function(err, resp, body) {
	    if (err)
		throw err;
	    $ = cheerio.load(body);
	    if($('.regular a').attr('href').split('/svr')[0]!=curId.split('/svr')[0]){
		$('.regular a').each(
		    function(){
			if($(this).text().indexOf('£')>-1)
			    prices.push(parseFloat($(this).text().replace('£','').replace(',','')));
			console.log(prices)
		    }
		);
		index++;
		getStuff($('.regular a').attr('href'),curId);
	    } else {res.send( prices );}
	});
    }
})

app.listen(1337);