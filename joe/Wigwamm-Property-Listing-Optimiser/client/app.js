Template.details.events({
    'submit #findForm':function(e){
	e.preventDefault();
	Meteor.call('getData',1586,2,function(error, data){
	    Session.set('houseData',data);
	    $('#rankings').sortable({
		update:function(event, ui){
		    console.log($(ui.item[0]).index())
		},
		cancel:'li:not(#'+Session.get('myPrice')._id+')'
	    });
	    runSort();
	    $('#rankings li').each(function(index,value){
		console.log(Session.get($(value).attr('id')))
//		console.log(calcScore((index+1)%10,Math.floor((index+1)/10)))
	    })
	});
    },
    'change #myPrice':function(e){
	Session.set('myPrice',{price:+e.target.value,_id:Session.get('myPrice')._id});
	runSort();
    }
});

var runSort = function(){
    $('ul li').tsort('',{sortFunction:function(a,b){
	var iCalcA = parseInt(a.s[0].split(' ')[4]);
	var iCalcB = parseInt(b.s[0].split(' ')[4]);
	return iCalcA===iCalcB?0:(iCalcA<iCalcB?1:-1);
    }});
}

var calcScore = function(pos, pgs){
    return Math.floor((((10-((pos+1)/1.5))/(pgs+1))*10));
}

Session.set('houseData',[]);
Session.set('myPrice',{price:0,_id:Random.id()})

Template.ranking.results=function(){
    var myPrice = Session.get('myPrice')
    var data = Session.get('houseData');
    data.push(myPrice);
    return data;
}

Template.ranking.scoreSessions=[]

Template.ranking.score=function(id){
    Session.set(id,1);
    Template.ranking.scoreSessions.push(Session.get(id));
    return Session.get(id);
}

$(function(){
    $('#'+Session.get('myPrice')._id+' div,.score').css({'background-color':'#36C91C'});
    $('#rankings').bind('DOMSubtreeModified',function(){
	//runSort();
	$('#rankings li').each(function(index,value){
	    console.log('hi')
//	    Session.set($(value).attr('id'),calcScore((index+1)%10, Math.floor((index+1)/10))+1)
	});
    });
});