var config = {
    apiKey: "AIzaSyDWSOF8Hxo29-Eoom-NhoRmCwL9EN47AbA",
    authDomain: "train-time-85b49.firebaseapp.com",
    databaseURL: "https://train-time-85b49.firebaseio.com",
    projectId: "train-time-85b49",
    storageBucket: "",
    messagingSenderId: "598334570574",
    appId: "1:598334570574:web:6e966c26b9b4a1ea"
  };

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
  
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().dest;
    var startTime = childSnapshot.val().start;
    var frequency = childSnapshot.val().freq;
  
    console.log(trainName);
    console.log(destination);
    console.log(startTime);
    console.log(frequency);
  
    var startTimeConverted = moment.unix(startTime).format("HH:mm");
    console.log(startTimeConverted);

    var currentTime = moment();
    console.log(moment(currentTime).format("hh:mm"));

    var timeDifference = moment().diff(moment(startTimeConverted, "X"), "minutes");
    console.log(timeDifference);

    var remainder = timeDifference % frequency;
    console.log(remainder);

    var minutesUntilTrain = frequency - remainder;
    console.log(minutesUntilTrain);

    var nextTrain = moment().add(minutesUntilTrain, "minutes");
    console.log(moment(nextTrain).format("hh:mm"));

    
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(nextTrain),
      $("<td>").text(minutesUntilTrain),
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });