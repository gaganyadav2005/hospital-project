const form = document.getElementById("appointmentForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        concern: document.getElementById("concern").value,
        date: document.getElementById("date").value,
    };

    const res = await fetch("/appointment", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });

    const data = await res.json();
    alert("Appointment Sent Successfully");
});