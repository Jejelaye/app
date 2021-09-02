const app = require('express')()
const bodyParser = require('body-parser')
const logger = require('morgan')

var name, location, age, gender = "";

const port = process.env.PORT || 3030

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('*', (req, res) => {
  res.send('ResQ Ussd app')
})

app.post('*', (req, res) => {
  let {sessionId, serviceCode, phoneNumber, text} = req.body

  
    
  // if ( typeof(text) != "undefined") {

    // we split the text string to give us an array
    let details;

    if (text == "") {
      // show welcome screen to user
      let response = "CON Welcome to the registration portal. \nPlease enter your full name";

      res.send(response)
    };
  
    // if name has been set, show age
    if ( typeof(text == "string") && text.split("*").length == 1 ) {
      details = text.split(",") // add name to array
      let response = `CON Hi ${details[0]}, please enter your age \n`;

      res.send(response);
    } 
    // if age has been endtered, split text into array and show gender and location
    else if ( text.split("*").length == 2 ) {
        // details = text.split(",") // add name to array
        let response = `CON Please enter your gender \n`;

        res.send(response);
      }
      // if age has been set, show location
      else if ( text.split("*").length == 3 ) {
        let response = `CON Please enter your location \n`;

        res.send(response)
      }
      // if all values have been collected, save the values to database and end the session
      else if ( text.split("*").length == 4 ) {
      details = text.split("*") // add name to array

        let response = `END Thank you ${details[0]}, for registering. \n We will keep you updated.`;

        res.send(response)
      }

      // res.setHeader("Content-Type", "text/plain");
      // res.send(response)
      // }
    
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
