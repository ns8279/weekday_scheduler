//setting up today's date and displaying it on the page
var todayEl = moment().format("MMMM Do YYYY");
    console.log(todayEl);
$("#currentDay").append(todayEl);

//get the number of hours in a workday
var hoursPerDay = 10;
let time = [];
var timeInDay = () => {
    var formattedTime = [];
    time = formattedTime;
    for(i =0; i < hoursPerDay; i++) {
        var thatTime = (10 + i);
        formattedTime.push(moment().startOf('day').add(thatTime, 'hours').format("hh:mm A"));
    }
}

//render the to do lists
var index=[];
var rowEl;
var hourColEl;
var descColEl;
var saveColEl;
var inputDescEl;
var saveBtn;
var containerDivEl = $(".container");
var saveBtnIcon;
var currentTimeEl;



var renderCalender = () => {
    for (var i =0; i < hoursPerDay; i++) {
        //dynamically create the container elements with bootstrap classes
        rowEl = $('<div>')
        .attr("class", "row");

        hourColEl = $('<div>' + time[i] + '</div>')
        .attr("class", "col-lg-1 hour");

        descColEl = $('<div>')
        .attr("class", "col-lg-10");
        

        saveColEl = $('<div>')
        .attr("class", "col-lg-1");
        //create a button for save
        saveBtn = $("<button>").attr("class", "saveBtn")
        .attr("type", "submit").attr("id", time[i]).text("Save");
        

        //create a button to clear the task
        // clearBtn = $("<button>").attr("class", "clearBtn")
        // .attr("type", "submit").attr("id", time[i]).text("Clear Task");

        //description Element needs a textarea for input
        inputDescEl =  $('<textarea>').attr("value", "")
                    .attr("class", "description").attr("id", time[i]);
        

        //update the index with the id of the description
        index.push(inputDescEl.attr("id"));

        //apend the created elements to the parent elemet
            //apend the hour, decription and save elements to the row element
            rowEl.append(hourColEl);
            rowEl.append(descColEl);
            rowEl.append(saveColEl);

            //append the buttons to the save element
            saveColEl.append(saveBtn);
            //saveColEl.append(saveBtnIcon);
            

            //apend the textarea to the description element
            descColEl.append(inputDescEl);

            //append the row element to the main container
            containerDivEl.append(rowEl);

     }
     $(document).on("click", ".saveBtn", saveTask);
    //  $(document).on("click", ".clearBtn", clearTask);

}

//function to determine the current time
var currentTime = () => {
    currentTimeEl = moment().format("hh:mm A");
     //console.log()

     var timeArea = $('textarea').get();
     let getTask;
     timeArea.forEach(taskDesc => {
        var timeId = parseInt(taskDesc.id);
        console.log(taskDesc);

        //to check if the time is past
        if(parseInt(currentTimeEl) > timeId) {
            taskDesc.classList.value = "description past";
            getTask = localStorage.getItem(taskDesc.id);
            taskDesc.value = getTask;

        }//check if the time is future
        else if (parseInt(currentTimeEl) < timeId) {
            taskDesc.classList.value = "description future";
            getTask = localStorage.getItem(taskDesc.id);
            taskDesc.value = getTask;
        }//check if it is the present time
        else {
            console.log(" future time  " + parseInt(taskDesc));
            taskDesc.classList.value = "description present";
            taskDesc.value = getTask;
        }


     });
};
// Current time function Ends here//

//function to save task
var saveTask = function(event) {
    event.preventDefault();

    var task = $(this).parent().parent()
    .find(".description", ['textarea'])[0].value;

    var time = $(this).parent().parent()
    .find(".description", ['textarea'])[0].id;

    console.log(task);
    console.log(time);

    localStorage.setItem(time,task);
}

//function to clear task
// var clearTask = function() {
//     $(this).parent().parent()
//     .find(".description", ['textarea'])[0].value = "";

//     var time = $(this).parent().parent()
//     .find(".description", ['textarea'])[0].id;

//     console.log(task);
//     console.log(time);

//     localStorage.setItem(time,task);
// }

renderCalender();
timeInDay();
currentTime();

