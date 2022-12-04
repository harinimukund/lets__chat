function login(){
user_name=document.getElementById("log_in_input").value;
localStorage.setItem("user_name_key",user_name);
window.location="kwitter_room.html";


}