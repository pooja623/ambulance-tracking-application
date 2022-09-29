const admin =  require('firebase-admin')
const express = require('express')
const app = express()

var serviceAccount = require("./ambulance-6e615-firebase-adminsdk-ri7ws-7ec383dc9c.json");
app.use(express.json())

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ambulance-6e615-default-rtdb.firebaseio.com"
});

app.post('/send-noti',(req,res)=>{

    console.log(req.body)
   const message = {
    notification:{
        title:"new ad",
        body:"new ad posted click to open"
    },
   tokens:req.body.tokens
}

admin.messaging().sendMulticast(message).then(res=>{
   console.log('send success')
}).catch(err=>{
    console.log(err)
})
})

app.listen(3000,()=>{
    console.log('surver running')
})
