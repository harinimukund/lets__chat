var firebaseConfig = {
      apiKey: "AIzaSyBEo32GI2nJ-vR-OqDtRQfa_lCcikP9dYM",
      authDomain: "kwitter-db-49d81.firebaseapp.com",
      databaseURL: "https://kwitter-db-49d81-default-rtdb.firebaseio.com",
      projectId: "kwitter-db-49d81",
      storageBucket: "kwitter-db-49d81.appspot.com",
      messagingSenderId: "895227473389",
      appId: "1:895227473389:web:bdd9599905f6d21296cbe4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
                  console.log(Room_names);
                  row='<div class="room_name" id="'+Room_names+'" onclick="redirect(this.id)">'+Room_names+'</div><hr>';
                  document.getElementById("output").innerHTML+=row;
                  //End code
            });
      });               
}
function redirect(room_id){
      console.log(room_id)
      localStorage.setItem("room_name_key", room_id);
      window.location="kwitter_page.html";

}
getData();
username = localStorage.getItem("user_name_key");
document.getElementById("welcome").innerHTML = "welcome " + username;

function add_room() {
      room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
            purpose: "main folder created"
      });
      localStorage.setItem("room_name_key", room_name);
      window.location = "kwitter_page.html"
}
function logout(){
      localStorage.removeItem("user_name_key");
      localStorage.removeItem("room_name_key");
      window.location="index.html"
}