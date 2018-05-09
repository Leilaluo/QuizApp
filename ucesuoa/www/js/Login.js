//the function QuizApp_user_Login called when the user click on "log in"
function QuizApp_user_Login(){
    alert ("Start Login!");
    var register_email = document.getElementById("login_email").value;
    var register_pass = document.getElementById("login_password").value;
    // if either of the email and the password is empty, system will directly prompt out error message 
    if(register_email === "" || register_pass === ""){
    alert("Please input email and password!");
    }
    else{
    var postString = "register_email="+register_email +"&register_pass="+register_pass;
    processData(postString);
    }
}

// client is the global value        
var client;

//function processData and dataUploaded are adapted from the tutorial of this module
function processData(postString) {
 client = new XMLHttpRequest();
 client.open('POST','http://developer.cege.ucl.ac.uk:30265/QuizAppLogin',true);
 client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
 client.onreadystatechange = dataUploaded; 
 client.send(postString);
}


// create the code to wait for the response from the data server, and process the response once it is received
function dataUploaded() {
 // this function listens out for the server to say that the data is ready - i.e. has state 4
 if (client.readyState == 4) {
 // change the DIV to show the response
  document.getElementById("dataUploadResult").innerHTML = client.responseText;
  getResult();

 }
}

//function getResult is for showing the result in the "dataUploadResult" div and then tell user if the login is success or fail.(Success: turn to the index page whose url has user's email information; fail: refresh the login page.)
function getResult(){
    result = document.getElementById("dataUploadResult").textContent;
    if (result == '"0"')
    {
        alert("There are something wrong with your email or password!\nPlease login again!")
        window.location.href = "./login.html"
    }
    else 
    {
        if (result == '"1"'){
        var user_email = document.getElementById("login_email").value;
        url= "index.html?email="+escape(user_email);
        alert("Login success!")
        window.location.href = url;
        }
}}
