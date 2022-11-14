import xapi from 'xapi';

//auth string is base64 encoded email and API key in this format:   email:apikey
var auth = "";
//https://api.thousandeyes.com/v6/voice/rtp-stream/{testid}.json
var apiurl = "";
// In milliseconds. Should be > TE polling time (typically 5 minutes)
const everyminute = 300000;

//poll the TE API
function getData() {
  return xapi.Command.HttpClient.Get({
    Header: `Authorization: Basic ${auth}`,
    ResultBody: "Plaintext",
    Url: apiurl
  }).then(
      v=> JSON.parse(v.Body)
    )
}

//parse data and output to the endpoint
function formatOutput(testData){
  var mosAverage = 0;
  for(let i = 0; i < testData.voice.metrics.length; i++) {
    mosAverage += testData.voice.metrics[i].mos;
  }
  mosAverage = mosAverage / (testData.voice.metrics.length);
  mosAverage = Math.round (mosAverage * 1000) / 1000; //3 decimal precision
  console.log(`The currently reported MOS average is: ${mosAverage}`);
  //xapi.Config.UserInterface.CustomMessage.set(`Current Webex MOS Score: ${mosAverage}`);
  switch (true) {
    case (mosAverage > 4.030):
      xapi.Config.UserInterface.CustomMessage.set(`Webex quality is great! (mos:${mosAverage})`);
      break;
    case (mosAverage > 3.600 ):
      xapi.Config.UserInterface.CustomMessage.set(`Webex quality is decent. (mos:{mosAverage})`);
      break;
    case (mosAverage > 0 && mos <= 3.600):
      xapi.Config.UserInterface.CustomMessage.set(`Webex quality is poor. (mos:${mosAverage})`);
      break;
    default:
      xapi.Config.UserInterface.CustomMessage.set(`Webex quality not available.`);
      break;
    }
}

//execute the polling of the TE service and display results
function update(){
  getData().then(formatOutput);
}

//runs constantly
const timerId = setInterval(update, everyminute);
