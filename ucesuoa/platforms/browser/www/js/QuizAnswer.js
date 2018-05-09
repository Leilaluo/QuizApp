//function getvaluefrom_URL get the user email information from the URL as when user login, their index urls will have their email information(eg: http://developer.cege.ucl.ac.uk:31265?email=cege@gmail.com)
function getvaluefrom_URL(){
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
return obj.email;
}
//the email of user will be stored in the global variable
var quiz_user_email = getvaluefrom_URL();

//the function submit_quiz_answer,processQuizData,QuizdataUploaded is adapted based on the tutorial of this module
function submit_quiz_answer(){
    alert ("Start Data Upload!");
    var QuizCheckedA = document.getElementById("quiz_checkboxA").checked;
    var QuizCheckedB = document.getElementById("quiz_checkboxB").checked;
    var QuizCheckedC = document.getElementById("quiz_checkboxC").checked;
    var QuizCheckedD = document.getElementById("quiz_checkboxD").checked;
    var Quizcontent = document.getElementById("quiz_window_content").innerHTML;
    var Quizuser = quiz_user_email;
    var QuizAnswer = [QuizCheckedA,QuizCheckedB,QuizCheckedC,QuizCheckedD];
    //the values which will be stored into the quiz answer table of database will be: the content of the question(which should be unique),the QuizCheckedA,QuizCheckedB,QuizCheckedC and QuizCheckedD which are bool type data.
    var postString = "Quizcontent="+Quizcontent +"&QuizCheckedA="+QuizAnswer[0]+"&QuizCheckedB="+QuizAnswer[1]+"&QuizCheckedC="+QuizAnswer[2]+"&QuizCheckedD="+QuizAnswer[3]+"&Quizuser="+Quizuser;
    processQuizData(postString);
    
}

var client;

function processQuizData(postString) {
 client = new XMLHttpRequest();
 client.open('POST','http://developer.cege.ucl.ac.uk:30265/uploadQuizData',true);
 client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
 client.onreadystatechange = QuizdataUploaded; 
 client.send(postString);
}


// create the code to wait for the response from the data server, and process the response once it is received
function QuizdataUploaded() {
 // this function listens out for the server to say that the data is ready - i.e. has state 4
 if (client.readyState === 4) {
 // change the DIV to show the response
    document.getElementById("QuizdataUploadResult").innerHTML = client.responseText;
 }
}
   
