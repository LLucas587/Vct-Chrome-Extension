let text = ""
var request = new XMLHttpRequest()

request.open('GET', 'https://vlrggapi.vercel.app/match/upcoming', true)

request.onload = function () {
  var res = JSON.parse(this.response)
  console.log(res)
  console.log(typeof res)
  console.log(typeof res.data.segments)
  addRegiontoArray(res.data.segments)
  addInternationalVar(res.data.segments)
  res.data.segments.forEach(consoleLog)
  createAll(res.data.segments,20)
  document.getElementById("All").addEventListener("click", function(){clear("div1")});
  document.getElementById("All").addEventListener("click", function(){createAll(res.data.segments,20)});
  document.getElementById("Americas").addEventListener("click", function(){clear("div1")});
  document.getElementById("Americas").addEventListener("click", function(){createGames(res.data.segments,20,"Americas")});
  document.getElementById("Apac").addEventListener("click", function(){clear("div1")});
  document.getElementById("Apac").addEventListener("click", function(){createGames(res.data.segments,20,"Apac")}); 
  document.getElementById("Emea").addEventListener("click", function(){clear("div1")});
  document.getElementById("Emea").addEventListener("click", function(){createGames(res.data.segments,20,"Emea")}); 
  document.getElementById("Inter").addEventListener("click", function(){clear("div1")});
  document.getElementById("Inter").addEventListener("click", function(){createInt(res.data.segments,20)});
}

function consoleLog(value) {
  console.log(value)
};

function clear(id){
  document.getElementById(id).innerHTML = "";
}

function createAll(array,number) {
  options = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: 'true'};
   for (let i = 0; i < number && i<array.length; i++) {
    if (array[i].team1 != "TBD") {
        match = document.createElement("p")
        now = new Date();
        if (array[i].time_until_match == "LIVE"){
          node = document.createTextNode(array[i].team1 + " vs " + array[i].team2 + " " + array[i].time_until_match);
        }
        else{
          now = changeTime(array[i].time_until_match,now)
          dateOutput = now.toLocaleDateString("en-US", options); 
          node = document.createTextNode(array[i].team1 + " vs " + array[i].team2+  " @ " + dateOutput);
        }
        match.appendChild(node)
        element = document.getElementById("div1")
        element.appendChild(match);
    }
}
};

function createInt(array,number) {
  for (let i = 0; i < number && i<array.length; i++) {
   if (array[i].team1 != "TBD" && array[i].international == true) {
       match = document.createElement("p")
       now = new Date();
       if (array[i].time_until_match == "LIVE"){
         node = document.createTextNode(array[i].team1 + " vs " + array[i].team2 + + " " + array[i].time_until_match);
       }
       else{
         now = changeTime(array[i].time_until_match,now)
         dateOutput = now.toLocaleDateString("en-US", options); 
         node = document.createTextNode(array[i].team1 + " vs " + array[i].team2+  " @ " + dateOutput);
       }
       match.appendChild(node)
       element = document.getElementById("div1")
       element.appendChild(match);
   }
}
};

function createGames(array,number,region) {
  for (let i = 0; i < number && i<array.length; i++) {
    if (array[i].team1 != "TBD" && (array[i].region1 == region||array[i].region2 == region)) {
        match = document.createElement("p")
        now = new Date();
        if (array[i].time_until_match == "LIVE"){
          node = document.createTextNode(array[i].team1 + " vs " + array[i].team2 + + " " + array[i].time_until_match);
        }
        else{
          now = changeTime(array[i].time_until_match,now)
          dateOutput = now.toLocaleDateString("en-US", options); 
          node = document.createTextNode(array[i].team1 + " vs " + array[i].team2+  " @ " + dateOutput);
        }        
        match.appendChild(node)
        element = document.getElementById("div1")
        element.appendChild(match);
    }
}
};

function addRegiontoArray(array) {
  let table = {
    "flag_eu": "Emea",
    "flag_tr": "Emea",
    "flag_fr": "Emea",
    "flag_pt": "Emea",
    "flag_es": "Emea",
    "flag_uk": "Emea",
    "flag_ru": "Emea",
    "flag_us": "Americas",
    "flag_cl": "Americas",
    "flag_ar": "Americas",
    "flag_ca": "Americas",
    "flag_co": "Americas",
    "flag_mx": "Americas",
    "flag_do": "Americas",
    "flag_br": "Americas",
    "flag_kr": "Apac",
    "flag_in": "Apac",
    "flag_sg": "Apac",
    "flag_jp": "Apac",
    "flag_th": "Apac",
    "flag_vn": "Apac",
    "flag_ph": "Apac",
    "flag_id": "Apac",
    "flag_tw": "Apac",
    "flag_id": "Apac",
    "flag_pk": "Apac",
    "flag_hk": "Apac",
    "flag_au": "Apac",
    "flag_nz": "Apac",
    "flag_my": "Apac",
    "flag_cn": "China",
    "flag_un": "",
  }
  for (let i = 0; i < array.length; i++) {
     if (array[i].team1 != "TBD")
       array[i].region1 = table[array[i].flag1]
       array[i].region2 = table[array[i].flag2]
  }
}

function addInternationalVar(array){
  for (let i = 0; i < array.length; i++) {
    if (array[i].tournament_name.includes("Champions") || array[i].tournament_name.includes("Masters")) {
      array[i].international = true;
    } else {
      array[i].international = false;
    }
  }
}

function addTime(date, hours, minutes) {
  const newDate = new Date(date)
  newDate.setHours(newDate.getHours() + hours)
  if (minutes > 0){
    newDate.setMinutes(0)
    newDate.setHours(newDate.getHours() + 1)
  }
  return newDate
}

function changeTime(timeuntil,now){
  timeArray = timeuntil.split(' ')
  console.log(timeArray[0].includes("d"))
  if (timeArray[0].includes("d")){
    hours = parseInt(timeArray[0])*24
    hours = hours + parseInt(timeArray[1]) + 1
    now.setMinutes(-2);
  } else
    hours = parseInt(timeArray[0])
    minutes = parseInt(timeArray[1])
  if (minutes != minutes && hours != hours) {
     // do nothing
  }
  else if(minutes != minutes){
    now = addTime(now,hours,0)
  }
  else if(hours != hours){
    now = addTime(now,0,minutes)
  }
  else{
    now = addTime(now,hours,minutes)
  }
  return now
}


// Send request
request.send()