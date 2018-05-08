//this page is written for the index.html of quiz app
//function findLocation, ErrorofLocation, getUserLocation is design for the function of the website "Get the questions on map" (in the index page).
//this function allow user to see a cicle which is near the user's location(the radius is always 200 meters)
function FindLocation(e) {
    var radius = 200;
    L.marker(e.latlng).addTo(mymap).bindPopup("The radius is " + radius + " meters from your position.").openPopup();
    L.circle(e.latlng, radius).addTo(mymap);
}

//This function send the error message back.
function ErrorofLocation(e) {
    alert(e.message);
    }

//This function send the location of the user and zoom into the position of user
function getUserLocation(){
    mymap.on('locationfound', FindLocation);
    mymap.on('locationerror', ErrorofLocation);
    mymap.locate({setView: true, maxZoom: 16, watch: true});
}

//the following functions from line 17 to line 120 are changed from reference: https://blog.csdn.net/envon123/article/details/7415213
//QuestionPop_ID is for store the id of the pop out window ID  
var QuestionPop_ID="";  
  
//Popwindow function is for pop up the window (window_ID is the ID of the div of the window which need to be shown)  
function PopWindow(window_ID){  
    //create the background obj  
    var background=document.createElement("div");  
    background.setAttribute('id','EV_bgModeAlertDiv');  
    document.body.appendChild(background);  
    //show the background full the page   
    EV_Show_bgDiv();  
    //show the div of question window in the middle of the background div  
    QuestionPop_ID=window_ID;  
    EV_Show_msgDiv();  
}  
  
//close the window div  
function EV_closeAlert(){  
    var msgObj=document.getElementById(QuestionPop_ID);  
    var background=document.getElementById("EV_bgModeAlertDiv");  
    msgObj.style.display="none";  
    document.body.removeChild(background);  
    QuestionPop_ID="";  
}  
  
//when the size of the window is changing, correct the size and position of the window.
window.onresize=function(){  
    if (QuestionPop_ID.length>0){  
        EV_Show_bgDiv();  
        EV_Show_msgDiv();  
    }  
}  
  
//When the window is onscroll, show the correct size and the position of question window.
window.onscroll=function(){  
    if (QuestionPop_ID.length>0){  
        EV_Show_bgDiv();  
        EV_Show_msgDiv();  
    }  
}  
  
//put the div which is needed to be shown in the center  
function EV_Show_msgDiv(){  
    var msgObj   = document.getElementById(QuestionPop_ID);  
    msgObj.style.display  = "block";  
    var msgWidth = msgObj.scrollWidth;  
    var msgHeight= msgObj.scrollHeight;  
    var bgTop=EV_myScrollTop();  
    var bgLeft=EV_myScrollLeft();  
    var bgWidth=EV_myClientWidth();  
    var bgHeight=EV_myClientHeight();  
    var msgTop=bgTop+Math.round((bgHeight-msgHeight)/2);  
    var msgLeft=bgLeft+Math.round((bgWidth-msgWidth)/2);  
    msgObj.style.position = "absolute";  
    msgObj.style.top      = msgTop+"px";  
    msgObj.style.left     = msgLeft+"px";  
    msgObj.style.zIndex   = "10001";  
      
}  

//the background div is shown on the full of the page 
function EV_Show_bgDiv(){  
    var background=document.getElementById("EV_bgModeAlertDiv");  
    var bgWidth=EV_myClientWidth();  
    var bgHeight=EV_myClientHeight();  
    var bgTop=EV_myScrollTop();  
    var bgLeft=EV_myScrollLeft();  
    background.style.position   = "absolute";  
    background.style.top        = bgTop+"px";  
    background.style.left       = bgLeft+"px";  
    background.style.width      = bgWidth + "px";  
    background.style.height     = bgHeight + "px";  
    background.style.zIndex     = "10000";  
    background.style.background = "#777";  
    background.style.filter     = "progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=60,finishOpacity=60);";  
    background.style.opacity    = "0.6";  
}  
//the height of the website scroll
function EV_myScrollTop(){  
    var n=window.pageYOffset   
    || document.documentElement.scrollTop   
    || document.body.scrollTop || 0;  
    return n;  
}  
//the left width of the website scroll
function EV_myScrollLeft(){  
    var n=window.pageXOffset   
    || document.documentElement.scrollLeft   
    || document.body.scrollLeft || 0;  
    return n;  
}  
//the visible area of the website  
function EV_myClientWidth(){  
    var n=document.documentElement.clientWidth   
    || document.body.clientWidth || 0;  
    return n;  
}  
//the visible height of the website 
function EV_myClientHeight(){  
    var n=document.documentElement.clientHeight   
    || document.body.clientHeight || 0;  
    return n;  
}  
// the previews part are from reference: https://blog.csdn.net/envon123/article/details/7415213


//function getemailfrom_URL design for the store the email of user from the URL(as it could be stored into the answer database)
function getemailfrom_URL(){
    var url=location.search,obj={};

    if(url.indexOf("?")!=-1)
    {
        var str = url.substr(1);
        strs= str.split("&");
        for(var i=0;i<strs.length;i++)
        {
            obj[strs[i].split("=")[0]]=unescape(strs[ i].split("=")[1]);
        }
}
//change the email name of the user in the index
document.getElementById("span_user_email").textContent = obj.email;
return obj.email;
}

//user_email store the email of this user
var user_email = getemailfrom_URL();
//initial the questionlayer fot the function "Get the questions on map" in the index page
var questionlayer;

//function getNearQuestion is design for the function "Get the nearest question" in the index page
function getNearQuestion(){
   alert('Getting Questions Near You!');
   // getQuestionData is the function to get the closest question
   navigator.geolocation.getCurrentPosition(getQuestionData);
}

//initial the nearquestionlayer for function "Get the nearest question" in the index page
var nearquestionlayer;

//initial the latitude and the longtitude of the user's position
var locationcoord_lat;
var locationcoord_lng;

//create a variable that will hold the XMLHttpRequest() - this must be done outside a function so that all the functions can use the some varaible
var client;

//create two different type marker, this part is created based on the reference from week 2 tutorial of this module
var testMarkerRed = L.AwesomeMarkers.icon({
    icon: 'play',
    markerColor: 'red'
});
var testMarkerPink = L.AwesomeMarkers.icon({
    icon: 'play',
    markerColor: 'pink'
});

//function getQuestionData,nearquestionResponse,nearquestionlayer are created based on the reference from the tutorial of this module
function getQuestionData(position){
    alert("your position is"+ position.coords.latitude + position.coords.longitude);
    locationcoord_lat = position.coords.latitude;
    locationcoord_lng =  position.coords.longitude;
    alert(locationcoord_lat + " "+ locationcoord_lng);
    L.marker([position.coords.latitude,position.coords.longitude]).addTo(mymap).bindPopup("<b>I am your place!</b>").openPopup();
    client = new XMLHttpRequest();
    //the detail of this url setting is in httpServer.js
    var url = "http://developer.cege.ucl.ac.uk:30265/SettershowQuestionData"
    client.open('GET',url);
    client.onreadystatechange = nearquestionResponse;
    client.send();   
}

function nearquestionResponse() {
 // this function listens out for the server to say that the data is ready - i.e. has state 4
    if (client.readyState == 4) {
        // once the data is ready, process the data
        var nearquestiondata = client.responseText;
        alert("client ready");
        nearquestionlayer(nearquestiondata);
    }
}


// initial the distance_array to store the distance from the user position to every questions
// initial the minium distance
var distance_array = [];
var min_distance;

//function onEachFeature1 is for getting the mininum distance among the user position and all the questions' positions
function onEachFeature1(feature,layer){
    // the if statement here is filter the questions which do not have content.
    if (feature.properties && feature.properties.question_content) {
        var lat = feature.geometry.coordinates[1];
        var lng = feature.geometry.coordinates[0];
        var distance = calculateDistance(locationcoord_lat, locationcoord_lng, lat,lng, 'K');
        distance_array.push(distance);
        min_distance = Math.min.apply(null, distance_array);
        return layer;
    }
}

//function onEachFeature2 is for show the hidden question window for the closest question
function onEachFeature2(feature,layer){
    var lat = feature.geometry.coordinates[1];
    var lng = feature.geometry.coordinates[0];
    //calculate the distance between user's location and the questions' postion one by one.
    var distance = calculateDistance(locationcoord_lat, locationcoord_lng, lat,lng, 'K');
    // if the distance is equal to the minimun distance, then this is the point which is needed to show in the map and pop up the question window.
    if (distance <= min_distance){
            //call the function to pop up the hidden question window
            PopWindow('envon');
            //change the showing content of the question window into this feature's properties.
            document.getElementById('quiz_window_title').textContent = feature.properties.title;
            document.getElementById('quiz_window_content').textContent = feature.properties.question_content;
            document.getElementById('quiz_window_answer1').textContent = feature.properties.optiona;
            document.getElementById('quiz_window_answer2').textContent = feature.properties.optionb;
            document.getElementById('quiz_window_answer3').textContent = feature.properties.optionc;
            document.getElementById('quiz_window_answer4').textContent = feature.properties.optiond;
            document.getElementById('quiz_window_useremail').textContent = feature.properties.user_email;
            //set an eventlistener here to make sure after user click one the submit button of the question window, then the value of the anwser will be stored.
            document.getElementById("submit_quiz_answer").addEventListener("click", function(){
                var QuizCheckedA = document.getElementById("quiz_checkboxA").checked;
                var QuizCheckedB = document.getElementById("quiz_checkboxB").checked;
                var QuizCheckedC = document.getElementById("quiz_checkboxC").checked;
                var QuizCheckedD = document.getElementById("quiz_checkboxD").checked;
                var QuizAnswerValue = [];
                // to set the QuizCheckedA,QuizCheckedB,QuizCheckedC,QuizCheckedD to shown for user which answers they choosed.
                if (QuizCheckedA){
                        QuizAnswerValue.push("A")
                }
                if (QuizCheckedB){
                        QuizAnswerValue.push("B")
                }
                if (QuizCheckedC){
                        QuizAnswerValue.push("C")
                }
                if (QuizCheckedD){
                        QuizAnswerValue.push("D")
                }
                //alert the message whether the users' answer is correct or not
                if ((QuizCheckedA === feature.properties.optiontruea)&&(QuizCheckedB === feature.properties.optiontrueb))
                {
                    if ((QuizCheckedC === feature.properties.optiontruec)&&(QuizCheckedD === feature.properties.optiontrued))
                    {
                        alert("Correct Answer!");
                        // Store the "answer" to shown the information on the map
                        var answer = "Your answer is correct!"
                    }
                }
                else{
                        alert("Wrong Answer!");
                        var answer = "Your answer is wrong!"
                }
                layer.setIcon(testMarkerPink);
                //the popup store the message that the user just input and the information of this question.
                layer.bindPopup("<dt>Question Title: "+ 
                        feature.properties.title+"</dt>"+"<dt>Question Content: "+ 
                        feature.properties.question_content+"</dt>" + "<dt>Your Answer: "+ QuizAnswerValue+"</dt>"+ "<dt>"+answer).openPopup();
            });
            
        }
        
}

// this function is explained in the line 179
function nearquestionlayer(nearquestiondata) {
    // convert the text to JSON
    var nearquestionjson = JSON.parse(nearquestiondata);
    // add the JSON layer onto the map - it will appear using the default icons
    nearquestionlayer = L.geoJson(nearquestionjson,{onEachFeature: onEachFeature1});
    nearquestionlayer = L.geoJson(nearquestionjson,{onEachFeature: onEachFeature2}).addTo(mymap);
    mymap.fitBounds(nearquestionlayer.getBounds());
}

// function calculateDistance is based on the reference from the tutorial of this module.
// code adapted from https://www.htmlgoodies.com/beyond/javascript/calculate-the-distance-between-two-points-inyour-web-apps.html
function calculateDistance(lat1, lon1, lat2, lon2, unit) {
 var radlat1 = Math.PI * lat1/180;
 var radlat2 = Math.PI * lat2/180;
 var radlon1 = Math.PI * lon1/180;
 var radlon2 = Math.PI * lon2/180;
 var theta = lon1-lon2;
 var radtheta = Math.PI * theta/180;
 var subAngle = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
 subAngle = Math.acos(subAngle);
 subAngle = subAngle * 180/Math.PI; // convert the degree value returned by acos back to degrees from radians
 dist = (subAngle/360) * 2 * Math.PI * 3956; // ((subtended angle in degrees)/360) * 2 * pi * radius )
// where radius of the earth is 3956 miles
 if (unit=="K") { dist = dist * 1.609344 ;} // convert miles to km
 if (unit=="N") { dist = dist * 0.8684 ;} // convert miles to nautical miles
 return dist;
}

// function getLocation and getPosition are all based on the reference from the the tutorial of this module.
function getLocation() {
    alert('getting location');
    navigator.geolocation.getCurrentPosition(getPosition);
}
function getPosition(position) {
    L.marker([position.coords.latitude,position.coords.longitude]).addTo(mymap).bindPopup("<b>Hello world!</b><br/>I am your position."
        +"<dt>This is the postion: </dt>"
        +"("+position.coords.latitude + "," + position.coords.longitude + ")"
        ).openPopup();
    mymap.setView([position.coords.latitude,position.coords.longitude],20);

}

//the reference of this function is in the tutorial of this module
function replaceGraphs(){
    document.getElementById("graphdiv").innerHTML ="<img src='images/ucl.png'>"
    scrollto('contactme');
}


//function getData,dataResponse,loadLayer are created based on the reference from the tutorial of this module
//create the code to get the data using an XMLHttpRequest
function getData(layername){
    client = new XMLHttpRequest(); 
    //depending on the layername we get differnet URLs
    if (layername == "question_map"){
        //the detail of this url setting is in httpServer.js
        url = "http://developer.cege.ucl.ac.uk:30265/SettershowQuestionData"
    }
    client.open('GET',url);
    client.onreadystatechange = dataResponse;
    client.send();
}
// create the code to wait for the response from the data server, and process the response once it is received
function dataResponse(){
    // this function listens out for the server to say that the data is ready - i.e. has state 4
    if(client.readyState==4){
        // once the data is ready, process the data
        var geoJSONData = client.responseText;
        loadLayer(geoJSONData);
    }
}
       
// convert the received data - which is text - to JSON format and add it to the map
function loadLayer(geoJSONData){
    if (geoJSONData.indexOf("user_email")>0){
        var loadingQuestions = true;
    }
    //convert the text to JSON
    var json = JSON.parse(geoJSONData);
    if (loadingQuestions == true){
        getUserLocation();
        questionlayer = L.geoJson(json,{
            pointToLayer: function(feature,latlng)
            {                        
                return L.marker(latlng,{icon:testMarkerPink}).bindPopup("<dt>Title: </dt>"+feature.properties.title
                            +"<dt>Content: </dt>"+ feature.properties.question_content
                            +"<dt></dt>");
            }
        }).addTo(mymap);
        mymap.fitBounds(questionlayer.getBounds());
    }
 
}

//create a variable that will hold the XMLHttpRequest() - this must be done outside a function so that all the functions can use the some varaible
var client;
function removeData(layername){
    if (layername == "questionlayer") {
        alert ("remove the question layer here!");
        mymap.removeLayer(questionlayer);
    } 
    if (layername == "nearquestionlayer") {
        alert ("remove the near question layer layer here!");
        mymap.removeLayer(nearquestionlayer);
    }
}

//function eqChanged control the open and close of the whole question layer
function eqChanged(checkboxElem) {
  if (checkboxElem.checked) {
    getData('question_map');
  } else {
    removeData('questionlayer');
  }
}

//function nqChanged control the open and close of the closest question layer
function nqChanged(checkboxElem) {
  if (checkboxElem.checked) {
    getNearQuestion();
  } else {
    removeData('nearquestionlayer');
  }
}

//function scrollto(m) is for user to click on and scroll to the div which ID is m
function scrollto(m){
    document.getElementById(m).scrollIntoView();
}

// function changetoLogin is for user to log out or change the account
function changetoLogin(){
    window.location.href = "./login.html"
}

