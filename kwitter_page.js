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
user_name = localStorage.getItem("user_name_key");
room_name = localStorage.getItem("room_name_key");
console.log(room_name);

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        sub_folder_name = childKey;
                        sub_folder_data = childData;
                        //Start code
                        u_name = sub_folder_data["name"];
                        u_like = sub_folder_data["likes"];
                        u_message = sub_folder_data["message"];
                        name_tag = '<h4>' + u_name + '<img src="tick.png" class="user_tick"></h4>';
                        message_tag = '<h4 class="message_h4">' + u_message + '</h4>'
                        button_start_tag = '<button class="btn btn-warning"id="' + sub_folder_name + '" onclick="update_likes(this.id)" value="' + u_like + '">';

                        button_end_tag = '<span class="glyphicon glyphicon-thumbs-up"> like:' + u_like + '</span></button><hr>';
                        row = name_tag + message_tag + button_start_tag + button_end_tag;
                        document.getElementById("output").innerHTML += row;
                        //End code
                  }
            });
      });
}
getData();

function logout() {
      localStorage.removeItem("user_name_key");
      localStorage.removeItem("room_name_key");
      window.location = "index.html"
}

function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            likes: 0
      });
      document.getElementById("msg").value = "";
}

function update_likes(sub_name) {
      number_likes = parseInt(document.getElementById(sub_name).value)
      number_likes = number_likes + 1;
      firebase.database().ref(room_name).child(sub_name).update({
            likes: number_likes
      });
}