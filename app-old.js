const express= require("express");
const bodyParser= require("body-parser");
const request = require("request");
const app = express();
const https = require("https");


app.use(bodyParser.urlencoded({extended: true}));

 app.use(express.static(__dirname));//for css to work
  
  
app.get("/", function(req,res){


    res.sendFile(__dirname+"/signup.html");
})
app.post("/", function(req,res){
   const firstName= req.body.fname;
   const lastName= req.body.lname;
   const email= req.body.email;
   
   const data ={
    members: [
        {
            email_address: email,
            status: "subscribed",
            merge_fields:{
                FNAME: firstName,
                LNAME: lastName
            } 
        }
    ]
   };
 
   var jsonData = JSON.stringify(data);
   const url = "https://us21.api.mailchimp.com/3.0/lists/9539953ba8";

   const options ={
    method: "POST",
    auth: "s4njy: 7be886d853c8da83b45c93a361a1b2f8-us21"
   }

   const request = https.request(url, options, function(response){
       response.on("data", function(data){
          console.log(JSON.parse(data));
       })
   })
  request.write(jsonData);
  request.end();
})

app.listen(3000, function(){
    console.log("Server is running on 3000.");
})


//api key:7be886d853c8da83b45c93a361a1b2f8-us21
// unique id :9539953ba8
//YOUR_SERVER_PREFIX: us21
//https://us21.api.mailchimp.com/3.0/lists/9539953ba8
/*app.get("/style.css" , function(req, res) {

    res.sendFile ( __dirname + "/\style.css");
  
  })*/
  //alternate for css
