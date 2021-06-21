



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

function createTimer(){
   
    //timer, maxTime, and server values from timer menu
    var tinput = document.getElementById("tinput").value;
    var sinput = document.getElementById("sinput").value;
    var resetTime = document.getElementById("maxTime").value;

    //resets whats in the dom as that data is already saved through tinput and sinput above.
    //this way that menu resets every time the button is pressed.
    document.getElementById("tinput").value = "0:00";
    document.getElementById("sinput").value = "Server";

    //adding another row to the table, now the only thing to do is update each row every second in a helper function below.
    document.getElementById("tbodydisplay").innerHTML = document.getElementById("tbodydisplay").innerHTML + "<tr><th scope='row'>3</th><td>"+sinput+"</td><td>"+tinput+"</td><td style='display:none;'>"+resetTime+"</td></tr>";   
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
            seconds = 60
        }

        if(minutes < 0){
            minutes = Number(maxTime.substring(0, maxTime.indexOf(':')));
            seconds = Number(maxTime.substring(maxTime.indexOf(':')+1));
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



