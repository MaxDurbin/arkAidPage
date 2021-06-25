



//listeners must only be set up after the page is loaded or the getElementById function returns null
window.onload = function(){setUpListeners()};

//setting up the lisetener, could have done this inside line 9 but if more functions are added this will make things
//easier to read
function setUpListeners(){
    document.getElementById("start button").onclick = function(){
        createTimer();
    }
}

    /* --------createTimer()----------
    This function creates a new row in the table using the time and server input fields information from the menu on the
    left of the table. Another function below will loop through the table and update every entry once per second
    so that time is kept up to date. 
    */
    //count just increments so that every row shows a different number
var count = 0;
function createTimer(){
    //timer, maxTime, and server values from timer menu
    var tinput = document.getElementById("tinput").value;
    var sinput = document.getElementById("sinput").value;
    var resetTime = document.getElementById("maxTime").value;
    var alarm = document.getElementById("alarm").value;
    var alarmtime = document.getElementById("alarmtime").value;

    //resets whats in the dom as that data is already saved through tinput and sinput above.
    //this way that menu resets every time the button is pressed.
    document.getElementById("tinput").value = "0:00";
    document.getElementById("sinput").value = "Server";

    count++;

    //adding another row to the table, now the only thing to do is update each row every second in a helper function below.
    var newRow = document.createElement('tr');
    newRow.innerHTML = "<tr><th scope='row'>"+count+"</th>              <td>"+sinput+"<button id='button"+count+"' onclick='deleteButton(button"+count+");'>X</button>    <button id='button2"+count+"'onclick='subOneSec(button2"+count+");'>-</button>   <button id='button3"+count+"'onclick='addOneSec(button3"+count+");'>+</button>      <input id='soundSlider"+count+"' type='range' min='1' max='100' value='50' class='slider' id='myRange'> </td>                      <td>"+tinput+"</td>                    <td style='display:none;'>"+resetTime+"</td>            <td style='display:none;'>"+alarm+"</td>         <td style='display:none;'>"+alarmtime+"</td>     </tr>";
    document.getElementById("tbodydisplay").appendChild(newRow); 
}

//uses the button name and html onclick() to delete that buttons row. Loops through the table until the buttons corresponding row is found, that row is then removed. 
function deleteButton(buttonName){
    buttonName.parentElement.parentElement.remove();
}

//uses the 2button name like above to subtract one second
function subOneSec(buttonName2){
    var time = buttonName2.parentElement.parentElement.querySelectorAll('td')[1].innerHTML;
    var seconds = Number(time.substring(time.indexOf(':')+1));
    var minutes = Number(time.substring(0, time.indexOf(':')));
    seconds = seconds - 1;
    buttonName2.parentElement.parentElement.querySelectorAll('td')[1].innerHTML = (minutes + ":" + seconds);
}


//same as above but adds one second
function addOneSec(buttonName3){
    var time = buttonName3.parentElement.parentElement.querySelectorAll('td')[1].innerHTML;
    var seconds = Number(time.substring(time.indexOf(':')+1));
    var minutes = Number(time.substring(0, time.indexOf(':')));
    seconds = seconds + 1;
    buttonName3.parentElement.parentElement.querySelectorAll('td')[1].innerHTML = (minutes + ":" + seconds);
}



    /* --------countDownEntryUpdater()----------
    keeps every entry made by createTimer() up to date by looping through the tbody element.
    As the loop loops through the rows it will take the current time of a timer and replace it with itself plus
    one second.

    By "updating" every row once per second each entry will have an accurate time
    */

setInterval(function countDownEntryUpdater(){
    //grabs the table element and loops through it
    
    for(var i = 0; i < document.getElementById("tbodydisplay").querySelectorAll('tr').length; i++){
        
        

        //grabs the row
        var row = document.getElementById("tbodydisplay").querySelectorAll('tr')[i];

        //specifies what the timer should reset to every time it hits 0:00
        var maxTime = row.querySelectorAll('td')[2].innerHTML;

        var alarmsound = row.querySelectorAll('td')[3].innerHTML;

        var alarmtime = row.querySelectorAll('td')[4].innerHTML;
        var alarmtimemin = Number(alarmtime.substring(0, alarmtime.indexOf(':')));
        var alarmtimesec = Number(alarmtime.substring(alarmtime.indexOf(':')+1));

        //grabs the time from the row
        var time = row.querySelectorAll('td')[1].innerHTML;
        
        //gets the part of the time var that comes before the ':'
        var minutes = Number(time.substring(0, time.indexOf(':')));
        //console.log(minutes);

        //gets the second part of the time var that comes after the ':'
        var seconds = Number(time.substring(time.indexOf(':')+1));
        //console.log(seconds);
        
        seconds = seconds - 1;
        //console.log(seconds);

        if(seconds < 0){
            minutes = minutes - 1;
            seconds = 59
        }

        if(minutes < 0){
            minutes = Number(maxTime.substring(0, maxTime.indexOf(':')));
            seconds = Number(maxTime.substring(maxTime.indexOf(':')+1));
        }

        //I want an alarm to notify the user at some specified time
        //May also include extra code i want to run during a notification period
        if(minutes == alarmtimemin && seconds == alarmtimesec ){
            if(alarmsound != "none"){
                var snd = new Audio(alarmsound + ".wav");
                snd.volume = row.querySelectorAll('td')[0].querySelector('input').value/100;
                snd.play();
            }
        }
        
        //instead of displaying 15:5 i want to display 15:05
        //checks to see if seconds is less than 10 and if so add a zero, as a string, in front of seconds
        var extraZero = ""
        if(seconds < 10){
            extraZero = "0"
        }else{
            extraZero = ""
        }

        row.querySelectorAll('td')[1].innerHTML = (minutes + ":" + extraZero + seconds);
    }

},1000);



