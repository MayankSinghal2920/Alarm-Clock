// audio for the alarm
const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
audio.loop = true;


//function to play the alarm
function ringing(now){
    audio.play();
    alert(`Hey! It is {$now}`)
}


let alarmTime = null;
let alarmTimeout = null;




//function to format the time:- converts "1:2:3" to "01:02:03"
function formatTime(time){
    if(time< 10) {
        return '0' + time;
    }
    return time;
}


// Showing the time in correct form
//updates time every second
const display = document.getElementById('clock');

function updateTime(){
    var today = new Date();
    let hour = formatTime(today.getHours());
    let minutes = formatTime(today.getMinutes());
    let seconds = formatTime(today.getSeconds());
   
    display.innerText= `${hour}:${minutes}:${seconds}`;

    let now = `${hour}:${minutes}:${seconds}`;

        // check if the alarmList includes the current time , "now"
        // if yes, ringing() is called
    if(alarmList.includes(now) ){
      ringing(now);
    } 
    
}
setInterval(updateTime, 1000);






//setting the alarm when submit button is clicked

const alarmList = [];   //Stores all the alarms being set

const addAlarm = document.getElementById('setAlarm');

addAlarm.addEventListener('submit', e=> {
    e.preventDefault();

    let new_h = formatTime(addAlarm.a_hour.value);
    if(new_h === '0'){
        new_h = '00'
    }

    let new_m = formatTime(addAlarm.a_min.value);
    if(new_m === '0'){
        new_m = '00'
    }

    let new_s = formatTime(addAlarm.a_sec.value);
    if(new_s === '0'){
        new_s = '00'
    }
   
    const newAlarm = `${new_h}:${new_m}:${new_s}`;


    // add newAlarm to alarmList

    if(isNaN(newAlarm)){
        if(!alarmList.includes(newAlarm)){
            alarmList.push(newAlarm);
            console.log(alarmList);
            console.log(alarmList.length);
            showNewAlarm(newAlarm);
            addAlarm.reset();
        } else{
            alert(`Alarm for ${newAlarm} already set.`);
        }
    } else{
        alert("Invalid Time Entered")
    }
    
})


//Display the alarm in the list

const myList = document.querySelector('#myList');

function showNewAlarm(newAlarm){
    const html =`
    <li class = "time-list">
    <span>${newAlarm}</span>
    <button class="deleteAlarm time-control" id="delete-button" onclick = "remove(this.value)" value=${newAlarm}>Delete Alarm</button>
    </li>
    `
    myList.innerHTML += html
};








// function to clear/stop the currently playing alarm
function clearAlarm() {
    audio.pause();
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
        alert('Alarm cleared');
    }
}  


// removes an alarm from the unordered list and the webpage when "Delete Alarm" is clicked
myList.addEventListener('click', e=> {
    console.log("removing element")
    if(e.target.classList.contains("deleteAlarm")){
        e.target.parentElement.remove();
    }    
})

// removes an alarm from the array when "Delete Alarm" is clicked
remove = (value) => {
    let newList = alarmList.filter((time) => time != value);
    alarmList.length = 0;                  // Clear contents
    alarmList.push.apply(alarmList, newList);
    
    console.log("newList", newList);
    console.log("alarmList", alarmList);
}
































