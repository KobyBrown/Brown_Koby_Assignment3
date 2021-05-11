//Koby Brown - 5/9/21
//Code from instructions and Professor Port's getting started with Assignemnt 2 screencast.
//Create server for our site.
var express = require('express');
var app = express();
var myParser = require("body-parser");
var data = require('./public/products.js');
var products = data.products
app.use(myParser.urlencoded({ extended: true }));
var qs = require('qs'); // Starts up qs system actions
var fs = require('fs'); // Starts up fs system actions
const querystring = require('querystring');
const { response } = require('express');

// Reads user_data.json - Lab 14 code
var user_data_file = "./user_data.json";
if (fs.existsSync(user_data_file)) {
    var file_stats = fs.statSync(user_data_file)
    var user_data = JSON.parse(fs.readFileSync(user_data_file, "utf-8"));
} 

//Code taken from Lab
app.all('*', function (request, response, next) {
    console.log(request.method + ' to path ' + request.path);
    next();
});

app.post("/process_page", function (request, response, next) {
    //Same code in products_display, modified
    let POST = request.body;
    if (typeof POST['purchase_submit'] != 'undefined') {
    const stringified = querystring.stringify(POST);
    has_errors = false; // assume quantities are valid
    total_qty = 0; 
    for (i in products) {
        if (typeof POST[`quantity${i}`] != "undefined") {
            a_qty = POST[`quantity${i}`];
            // Sticky textboxes
            total_qty += a_qty; 
            if(!isNonNegInt(a_qty)) {
                has_errors = true; //invalid quantity error
            }
        }
    }
    // Respond to errors or redirect to login if no errors - response.redirect code found from Getting start with Assign. 2 screencast
    if(has_errors) { // if has errors then keeps user on products_display page
        response.redirect("./products_display.html?" + stringified);
    } else if(total_qty == 0) { // if no quantity selection then keeps user on products_display page
        response.redirect("./products_display.html?" + stringified);
    } else { // if nothing wrong then send user to login page
        response.redirect("./login.html?" + stringified);
    }
}
})

// Processes login form - Modified Code from Prof Port's Assignment 2 screencast
app.post('/process_login', function (request, response, next) {
    request.query["uname"] = request.body["uname"];
    // Sets user input for username as uname; put into lower case to make it case insensitive
    let username_entered = request.body["uname"].toLowerCase();
    let password_entered = request.body["psw"];
    // checks if username_entered matches any usernames in user_data
    if (typeof user_data[username_entered] != "undefined") {
        // Checks if password matches password that is connected to that username
        if (user_data[username_entered]["password"] == password_entered) {
            // sends user to invoice if no problems
        response.redirect("invoice.html?" + qs.stringify(request.query));
    } else {

    }
} else {

}
// sends back to login if login info does not match user_data info
response.redirect("login.html?" + qs.stringify(request.query));
})


// Processes register form. Modified Code from Prof Port's Assignment 2 screencast
app.post('/process_register', function (request, response, next) {
    request.query["uname"] = request.body["uname"];  
    request.query["email"] = request.body["email"]; 
    request.query["psw"] = request.body["psw"]; 
    request.query["pswRepeat"] = request.body["pswRepeat"];
    
    // USERNAME VALIDATION:
    // Checks to make sure there are no special char in username
    var unameRegex = /^[A-Za-z0-9]+$/
    // emailRegex checks to make sure that it is valid email
    var emailRegex = /[0-9a-zA-Z]+@[0-9a-zA-Z]+[\.]{1}[0-9a-zA-Z]+[\.]?[0-9a-zA-Z]+/g;
    if (unameRegex.test(request.body.uname)) {

    } else {
        response.redirect("register.html?" + qs.stringify(request.query));
    }
    // Sets uname to min of 4 char and max of 10 char
    if ((request.body.uname.length < 4) || (request.body.uname.length > 10)) {
        response.redirect("register.html?" + qs.stringify(request.query));
    }

    // PASSWORD VALIDATION:
    // Sets psw to min of 6
    if (request.body.psw.length < 6) {
        response.redirect("register.html?" + qs.stringify(request.query));
    }
    // Makes sure psw and pswRepeat are the same
    if (request.body.psw != request.body.pswRepeat){
        response.redirect("register.html?" + qs.stringify(request.query));
    }

    // EMAIL VALIDATION:
    // Checks whether email is in the proper format of an email address
    if (emailRegex.test(request.body.email)) {

    } else {
        response.redirect("register.html?" + qs.stringify(request.query));
    }

    

    // add a new user to the DB
    // Adds username to user_data in lowercase
    username = request.body["uname"].toLowerCase(); 
    user_data[username] = {};
    user_data[username].password = request.body["psw"];
    user_data[username].email = request.body["email"];
    // save updated user_data to file (DB)
    fs.writeFileSync(user_data_file, JSON.stringify(user_data));
    response.redirect("invoice.html?" + qs.stringify(request.query)); 
});

app.use(express.static('./public')); // Run public folder on the server
app.listen(8080, () => console.log('listening on 8080')); //server on 8080

// function code from Invoice4
function isNonNegInt(q, returnErrors = false) {
    var errors = []; // assume that there are no errors
    if(q == "") q = 0; // Considers blank inputs as 0
    if(Number(q) != q) errors.push('Not a number!'); // Check if string is number
    else if(q < 0) errors.push('Negative value!'); // Check if non-negative
    else if(parseInt(q) != q) errors.push('Not an integer!'); // Check if integer
    return returnErrors ? errors : (errors.length == 0);
    }