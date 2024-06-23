const express = require("express");
const bodyp = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyp.urlencoded({ extended: true }));

app.get("/", function(req, res){

    res.sendFile(__dirname + "/signup.html");
    
});

app.post("/", function(req, res){

    const finame = req.body.fname;
    const laname = req.body.lname;
    const mail = req.body.email;

    const data = {
        members: [
            {
                email_address: mail,
                status: "subscribed",
                merge_fields: {
                    FNAME: finame,
                    LNAME: laname
                },
            },
        ],
    };

    const jsondata = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/d07ffaae94";

    const options = {
        method:"post",
        auth:"amnaihm:82576ca464d046f410a1abd1f314b148-us21"
    };

   

    const request = https.request(url, options, function(response){


        // Notification.requestPermission().then((result) => {
        //     console.log(result);
        // });
        // function askNotificationPermission() {
        //     // function to actually ask the permissions
        //     function handlePermission(permission) {
        //       // set the button to shown or hidden, depending on what the user answers
        //       notificationBtn.style.display =
        //         Notification.permission === "granted" ? "none" : "block";
        //     }
          
        //     // Let's check if the browser supports notifications
        //     if (!("Notification" in window)) {
        //       console.log("This browser does not support notifications.");
        //     } else {
        //       Notification.requestPermission().then((permission) => {
        //         handlePermission(permission);
        //       });
        //     }
        // }
        // // const img = "/to-do-notifications/img/icon-128.png";
        // const text = `An amateur web development based project made by Amna Iftikhar. Currently this site offers no services other than getting you subscribed. Show your support and subscribe to my first ever deployed project!`;
        // const notification = new Notification("Welcome!", { body: text, icon: img });
        // const n = new Notification("My Great Song");
        // document.addEventListener("visibilitychange", () => {
        //   if (document.visibilityState === "visible") {
        //     // The tab has become visible so clear the now-stale Notification.
        //     n.close();
        //   }
        // });

       
        // var intro = "An amateur web development based project made by Amna Iftikhar. Currently this site offers no services other than getting you subscribed. Show your support and subscribe to my first ever deployed project!";
        // alert(intro);

        if(response.statusCode === 200){

            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
        });

    });

    request.write(jsondata);
    request.end();
});


app.post("/failure", function(req, res){
    
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){

    console.log("Server is running on port 3000.");
    
});




  


// apikey
// 82576ca464d046f410a1abd1f314b148-us21

// listid
// d07ffaae94