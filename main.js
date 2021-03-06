var pincodes = ["400053", "400004", "400056",]; //enter your pincodes
var dateArr = ["14-05-2021", "15-05-2021", "16-05-2021"]; //enter your preferred dates
var trialCounter = 1;

const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); 
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

async function fetchByPincode() {
    console.log("Check: ", trialCounter++);
    
    for (i=0;i < pincodes.length; i++) {
      for (j=0; j < dateArr.length; j++) {
        url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByPin?pincode="+pincodes[i]+"&date="+dateArr[j];
        await sleepNow(1100);
        a = httpGet(url);
        try {
          a = JSON.parse(a)
        } catch(e) {
          continue;
        }
        for (c in a.centers) {
        for (s in a.centers[c].sessions) {
              if (a.centers[c].sessions[s].min_age_limit < 45 && a.centers[c].sessions[s].available_capacity > 0) {
                console.log("Open Slot At: ", a.centers[c].pincode, a.centers[c].name, a.centers[c].sessions[s].available_capacity);
                // Sound Alert:
                var audio = new Audio('https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3');
                audio.play();
              }
          }
        }
      }
    }
    await sleepNow(10000);
    fetchByPincode();
}

console.log('Script Is Ready To run!');
fetchByPincode();
