var postcodes = new Meteor.Collection();

if (Meteor.isClient) {
  
}

if (Meteor.isServer) {
    
  Meteor.startup(function () {
    // code to run on server at startup
  });

    Meteor.methods({
	'getData':function(outCode, bedrooms, callback){
	    console.log('Someone Wants It :p')
	    var data=[],index=0;
	    while (true) {
		$ = cheerio.load(Meteor.http.get('http://www.rightmove.co.uk/property-for-sale/find.html?locationIdentifier=OUTCODE^'+outCode+'&radius=0&minBedrooms='+bedrooms+'&maxBedrooms='+bedrooms+'&displayPropertyType=houses'+'&index='+index*10).content);
		if($($('.pagecount')[0]).text().split(' ')[1]!=$($('.pagecount')[0]).text().split(' ')[3]){
		    $('.regular a').each(function(){
			if($(this).text().indexOf('£')>-1)
			    data.push({price:parseFloat($(this).text().replace('£','').replace(',','')),_id:Random.id()});
		    });
		    index++;
		} else {break;}
	    }
	    console.log(data);
	    return data;
	}
    });
}
