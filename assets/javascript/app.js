var config = {
    apiKey: "AIzaSyDWSOF8Hxo29-Eoom-NhoRmCwL9EN47AbA",
    authDomain: "train-time-85b49.firebaseapp.com",
    databaseURL: "https://train-time-85b49.firebaseio.com",
    projectId: "train-time-85b49",
    storageBucket: "",
    messagingSenderId: "598334570574",
    appId: "1:598334570574:web:6e966c26b9b4a1ea"
  };
  // Initialize Firebase
  firebase.initializeApp(config);

var database = firebase.database();

$("#add-train").on("click", function(event) {
    event.preventDefault();
  
    var trainName = $("#name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var startTime = moment($("#start-input").val().trim(), "HH:mm").format("X");
    var frequency = $("#frequency-input").val().trim();
  
    var newTrain = {
      name: trainName,
      dest: destination,
      start: startTime,
      freq: frequency
    };
  
    database.ref().push(newTrain);
  
    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.start);
    console.log(newTrain.freq);
  
  
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().dest;
    var startTime = childSnapshot.val().start;
    var frequency = childSnapshot.val().freq;
  
    // Employee Info
    console.log(trainName);
    console.log(destination);
    console.log(startTime);
    console.log(frequency);
  
    var startTimeConverted = moment(startTime, "HH:mm").subtract(1, "years");
    console.log(startTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(startTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    var nextArrival = moment().diff(moment(startTime, "X"), "minutes");
    console.log(nextArrival);
    
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(nextTrain),
      $("<td>").text(tMinutesTillTrain),
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });