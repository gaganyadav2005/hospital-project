console.log("Appointment JS Loaded");

/* Page load hone ke baad hi JS chale */
document.addEventListener("DOMContentLoaded", function () {

const params = new URLSearchParams(window.location.search);
const expert = params.get("expert") || "psychology";

const expertText = document.getElementById("expertType");

if (expertText) {
expertText.innerText =
expert === "dietitian"
? "You are booking an appointment with our Dietitian Expert."
: "You are booking an appointment with our Psychology Expert.";
}

const form = document.getElementById("appointmentForm");

if (!form) {
console.log("Form not found");
return;
}

form.addEventListener("submit", async function(e){

e.preventDefault();

console.log("Form Submitted");

const appointment = {
name: document.getElementById("name").value,
email: document.getElementById("email").value,
phone: document.getElementById("phone").value,
concern: document.getElementById("concern").value,
date: document.getElementById("time").value
};

console.log("Sending Data:", appointment);

try{

const response = await fetch("/appointment",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify(appointment)
});

const data = await response.json();

console.log("Server Response:", data);

document.getElementById("successMsg").innerText =
data.message || "Appointment booked successfully!";

form.reset();

}catch(error){

console.error("Fetch Error:", error);

alert("Server error! Please try again.");

}

});

});