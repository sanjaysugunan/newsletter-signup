const express= require("express");
const bodyParser= require("body-parser");
const request = require("request");
const dotenv = require("dotenv");
const app = express();
const https = require("https");
const client = require("@mailchimp/mailchimp_marketing");

dotenv.config();
client.setConfig({
  apiKey: process.env.API_KEY,
  server: process.env.API_SERVER_PREFIX,
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


/*app.get("/style.css" , function(req, res) {

    res.sendFile ( __dirname + "/\style.css");
  
  })*/
  //alternate for css
