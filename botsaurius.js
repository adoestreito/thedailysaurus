
var request = require("request") //use to reach json
var Twit = require('twit');  //import twit packet
var config = require('./config');	//The keys are in the config file
var ontime = require('ontime'); //Schedule tweets
var T = Twit(config); //Create a Twit objet using the keys
let searchUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search='; //Search wikipedia
//setting up an user stream
var stream = T.stream('user');
var streamfollow = T.stream('user'); //User event stream
//var streamback = T.stream('user');
//Retweet stream below
//  
//Anytime someone follows me
stream.on('favorite', favorited);
streamfollow.on('follow', followed);
//streamback.on('tweet',replyback);
var dino = require('./dino.json');

var day = Math.floor(Math.random()*1400);
var dinoGoodMorning = dino.dinosaurs[day];
//daylydino();
//setInterval(timeline,1000*5);
//timeline();
var test = 0;


// function replyback(mention){
// 	let theOneWhoMention = mention.user.screen_name;
// 	if (mention.in_reply_to_screen_name = "thedailysaurus" && theOneWhoMention != "thedailysaurus"){
// 	var reply = "Hey .@" +theOneWhoMention + " are you a fan of dinosaurs? #jurassic";
// 	tweet(reply);}
// };


function test2(){
	 	   T.get('trends/available', function (err, data, response) {
 	   console.log(data);
 	
})};

// function timeline(){ //destroy tweets

//   T.get('statuses/user_timeline', {user_id: '947862751199858691', count: 1}, function (err, data, response){  	console.log(test);
//   	console.log(data);
//   	for (var i = 0; i <= 0; i++){
//   		test = data[i].id_str;
//   		console.log(test);
//    	   T.post('statuses/destroy/:id', { id: test }, function (err, data, response) {
//   if(err){
//   	console.log(err);
//   }else {
//   	console.log(data)
//   	}
//   })
//    	}}) 

// };



//Not ready for PROD


// stream2.on('tweet', function (tweet) {   //used for retweets
//   let idrt = tweet.id_str;
//   let hmf = tweet.user.followers_count;
//   console.log(hmf);
//   if (hmf > 1000){
// 	   T.post('statuses/retweet/:id', { id: idrt }, function (err, data, response) {
// 	   console.log("Retweet");
// 	})}else{
// 	   	console.log("Not worth my time");
// 	   } 
	
// })
function favorited(event){
	console.log(event.source);
	console.log('You are my favorite');
};
function unfollowed(event){
	console.log('I just unfollowed someone');
};

function callback(err, data, response) { //In case something happens
	if (err){
		console.log("Something went wrong");
	}else{
	console.log('we just tweet');}
   };

function followed(event){
	console.log(event);
	var following = event.source.screen_name;
	console.log(following);
	txt ='Hey @' +following+ '! your spirit dinosaur is: #' +dino.dinosaurs[Math.floor(Math.random()*1400)];
tweet(txt);
};

//Just run one time or after and error (Add random number)
function alive(){
	tweet("Life always finds a way");
}

//Dayly dino improve the retweet **Random i will be better**
function daylydino(){ 
	console.log(dino.dinosaurs);
	var dinoOfTheDay = "Say hello! to the dino of the day: #" +dino.dinosaurs[day];
	var dinoDescription = " ";
	let toDelete = String(dino.dinosaurs[day]).length;
	var searchFor = searchUrl + dino.dinosaurs[day];
	//console.log(searchFor);
	request({
    url: searchFor,
    json: true
}, function (error, response, body) {
    if (!error && response.statusCode === 200) {
        var description = new  String(body[2]);
        var salida = toDelete;
        
  
    }
    for (var i=toDelete + 1; i <= 100 || i<=description.lentgh ;i++){ //Limit description to 80 characters
    	dinoDescription += description[i];
    	salida +=1;
    } while( description[salida+1] != ' '){
    	salida += 1;
    	dinoDescription += description[salida];
    }

  
        dinoOfTheDay += dinoDescription + "...Learn more at " +body[3];
        console.log(dinoOfTheDay);
        dinoGoodMorning = dino.dinosaurs[day];
        day = Math.floor(Math.random()*1400);
		tweet(dinoOfTheDay); 
}) 
      };

ontime({   //Tweet the dino of the day
    cycle: [ '9:18:00'], //Spain is UTC +1 so this will be 9 am Spain time
    utc: true
}, function (ot) {
    // do your job here
    daylydino();
    ot.done();
    return
})

ontime({   //Tweet a morning raise up
    cycle: ['7:30:00'],
    utc:true    // daily
}, function (ot){
	tweet("Raise up like a big " +dinoGoodMorning +" #jurassic"); //This is supossed to be the dyno of yesterday
	ot.done();
	return
});


function tweet(txt){
var tweet= {
	'status': txt //What we are going to twit
};
T.post('statuses/update',tweet,callback); //Post that tweet

};
