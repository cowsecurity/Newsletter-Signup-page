
const express = require("express");
const request = require("request");
const https =   require("https")

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({extended : true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){

  const firstName = req.body.fName;

  const lastName = req.body.lName;

  const email = req.body.email;

  const data = {
    members:[
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

 const jsondata = JSON.stringify(data);

 const url = "https://us7.api.mailchimp.com/3.0/lists/19cf927bdc";

  const options = {
    method:"POST",
    auth:"Yash:21b0860042d23fb8e885b043c67c0950-us7"
  }

const request =  https.request(url, options ,function(response){

  if(response.statusCode === 200){
  res.sendFile(__dirname +"/success.html");
}else{
  res.sendFile(__dirname + "/failure.html")
}

     response.on("data",function(data){
     console.log(JSON.parse(data));
   })
 })
  request.write(jsondata);
  request.end();
});

app.post("/failure",function(req,res){
  res.redirect("/")
})

app.listen(process.env.PORT || 3000,function(){
  console.log("Server is live on port 3000");
});


// api key

// 21b0860042d23fb8e885b043c67c0950-us7

// uid

// 19cf927bdc
