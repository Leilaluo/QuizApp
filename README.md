# QuizApp
The Quiz App of the assignment of CEGEG077 module
The main functions in quiz app in this project are “User Login”, “User Register”, “Get the Questions on Map“, “Get your location“, “Get the Question Near You“, “Remove the Closest Question on Map“, “Remove all Questions on Map“, “Contact Us” and “Help”. 

The httpServer_QuizApp.js serve this application.

The URLs of the websites in this application are as following:

http://developer.cege.ucl.ac.uk:31265/

http://developer.cege.ucl.ac.uk:31265/index.html

http://developer.cege.ucl.ac.uk:31265/login.html

http://developer.cege.ucl.ac.uk:31265/register.html

Function: 
“User Login” (Users log into the accounts they have): 
Using Login.js and login.html;

“User Register” (Users register the accounts for this application):
Using Register.js and register.html;

“Get the Questions on Map” (Get all the questions which are asked and zoom into the buffer which is 200 meter of user's position): 
Using index.html, appActivity.js and  httpServer_QuizApp.js;

“Get your location“ (Get the location of user):
Using index.html and appActivity.js;

“Get the Question Near You“ (This function is for getting the closest one question from the user's postion and then user answer the pop up question): Using index.html, appActivity.js, QuizAnswer.js and httpServer_QuizApp.js;

“Remove the Closest Question on Map” (Remove the questions layer which is getted from function “Get the Questions on Map”):  
Using index.html, appActivity.js;

“Remove all Questions on Map“ (Remove the questions layer which is getted from funciton “Get the Question Near You“): 
Using index.html, appActivity.js;

“Contact Us” (The contact information of developer which is a div in index.html): 
Using index.html and appActivity.js

“Help” (The guide line for user which is a div in index.html): 
Using index.html and appActivity.js;

