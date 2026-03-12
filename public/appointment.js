const params = new URLSearchParams(window.location.search);
const expert = params.get("expert") || "psychology";

document.getElementById("expertType").innerText =
expert === "dietitian"
? "You are booking an appointment with our Dietitian Expert."
: "You are booking an appointment with our Psychology Expert.";

const form = document.getElementById("appointmentForm");

form.addEventListener("submit", async function(e){

e.preventDefault();

const appointment = {
name: document.getElementById("name").value,
email: document.getElementById("email").value,
phone: document.getElementById("phone").value,
concern: document.getElementById("concern").value,
date: document.getElementById("time").value
};

try{

const response = await fetch(window.location.origin + "/appointment",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify(appointment)

});

const data = await response.json();

document.getElementById("successMsg").innerText =
"✅ Appointment booked successfully!";

form.reset();

}catch(error){

alert("Server error! Please try again.");

console.log(error);

}

});