$(function(){
    $('#myPrice').change(function(){
	drawData($('#myPrice').val());
	drawVisualization();
    });
    $('.selectable').on('selectablestop',function(event, ui){
	drawVisualization();
    });

    $('#findForm').submit(function(){
	$('#loader').css('display','block').animate({opacity:1},500);
	$('.submit').animate({opacity:0},500).css('display','none');
	$.get('/find/'+$('#outCode').val()+','+$('#beds').val()+',houses', function(data){
	    latestData=data.slice(0);
	    $('#loader').animate({opacity:1},500).css('display','none');
	    $('.stats').css('display','block').animate({opacity:1},500);
	    $('.submit').css('display','block').animate({opacity:1},500);
	    $('#findForm').animate({left:'85%',top:'5%'},1000);
	    drawData($('#myPrice').val());
	    drawVisualization();
	    $('ul').css('display','block').animate({opacity:1},500);
	    $('#chart').css('display','block').animate({opacity:1},1000);
	});
    })
});

var calcScore = function(pos, pgs){
    return Math.floor((((10-((pos+1)/1.5))/(pgs+1))*10));
}

/*var makeGraph = function(scoreMult,priceMult){
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var pgs;
    var pos;
    canvas.width=canvas.width;
    for(pgs=0; pgs<$('ul').length; pgs++) {
	for(pos=0; pos<$('ul')[pgs].children.length; pos++) {
	    context.lineTo(((10-pos)/pgs)*scoreMult,+$('ul')[pgs].children[pos].innerHTML/priceMult);   
	}
    };
    console.log(test,(+$('#myPrice').val()/priceMult)-2)
    context.strokeStyle = '#000000';
    context.stroke();

    context.fillStyle="#FF0000";   
    context.beginPath();
    context.arc(+$('#score').text()*scoreMult, +$('#myPrice').val()/priceMult, 5, 0, 2 * Math.PI, false);
    console.log(+$('#score').text()*scoreMult, +$('#myPrice').val()/priceMult);
    context.closePath();
    context.fill();
}*/

var latestData = [];



var drawData = function(price){
    $('#allHouses').html('');
    curData=latestData.slice(0);
    curData.push(+price);
    curData.sort(function(a,b){return b-a});
    curData.map(function(value,index){
	$('li').css('color', 'black')
	console.log(value,curData);
	if(index%10==0){
	    $('#allHouses').append($('<ul>').attr({'id':Math.round(index/10)*10,class:'selectable'}).text('Page: '+((index/10)+1)).selectable({stop:function(){drawVisualization();}}));
	}
	$('#'+Math.floor(index/10)*10).append($('<li>').text(value));
	$('li').map(function(liIndex, liValue){
	    if(+liValue.innerHTML==+$('#myPrice').val()){
		$(liValue).css('color','white')
		$('#pageRank').text(Math.floor(liIndex/10)+1);
		$('#position').text(Math.round(((liIndex/10)%1)*10)+1);
		$('#score').text(calcScore(+$('#pageRank').text(),+$('#position').text()));
	    }
	})
    });
}

function drawVisualization() {
    // Create and populate the data table.
    var data = new google.visualization.DataTable();
    var selected = new google.visualization.DataTable();
    data.addColumn('number', 'Price');
    data.addColumn('number', 'Score');
    data.addColumn('number', 'My Score');
    data.addColumn('number', 'Selected');
    
    for(pgs=0; pgs<$('ul').length; pgs++) {
	for(pos=0; pos<$('ul')[pgs].children.length; pos++) {
	    data.addRow([+$('ul')[pgs].children[pos].innerHTML,calcScore(pos,pgs),null,null]);
	}
    };
    
    data.addRow([+$('#myPrice').val(),null,+$('#score').text(),null]);

    $('.ui-selected').map(function(index,value){
	console.log(calcScore($(value).index(),+$(value).parent().attr('id')/10))
	debugger;
	data.addRow([+$(value).text(),null,null,calcScore($(value).index(),+$(value).parent().attr('id')/10)]);
    });
    // Create and draw the visualization.
    var chart = new google.visualization.ScatterChart(
        document.getElementById('chart'));
    chart.draw(data, {title: 'Score and Price',
                      width: 600, height: 400,
                      vAxis: {title: "Wigwamm Listing Score", titleTextStyle: {color: "green"}},
                      hAxis: {title: "Listing Price", titleTextStyle: {color: "green"}},
		      legend:'none',
		      colors:['blue','red','green'],
		      trendlines: { 0: {} }
		     }
              );
}