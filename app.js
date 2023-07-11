const express= require("express");
const bodyParser= require("body-parser");
const request = require("request");
const app = express();
const https = require("https");
const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({
  apiKey: "7be886d853c8da83b45c93a361a1b2f8-us21",
  server: "us21",
});


app.use(bodyParser.urlencoded({extended: true}));

 app.use(express.static(__dirname));//for css to work
  
  
app.get("/", function(req,res){


    res.sendFile(__dirname+"/signup.html");
})
app.post("/", function(req,res){
   const firstName= req.body.fname;
   const lastName= req.body.lname;
   const email= req.body.email;
   
   const run = async () => {
    const response = await client.lists.batchListMembers("9539953ba8", {
      members: [{
        "email_address": email,
            "status": "subscribed",
            "merge_fields":{
                "FNAME": firstName,
                "LNAME": lastName
            } 
      }],
    });
    if(response.error_count==0){
        res.sendFile(__dirname+"/success.html");
    }
    else{
        res.sendFile(__dirname+"/failure.html");
    }
  };
  
  run();
   
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