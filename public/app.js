function makePayment() {

    let session = document.getElementById("sessionType").value;

    if(session === ""){
        alert("Please select session type");
        return;
    }

    let confirmPayment = confirm("Pay ₹" + session + " to book session?");

    if(confirmPayment){
        localStorage.setItem("paymentStatus", "paid");
        localStorage.setItem("amount", session);

        document.getElementById("sessionAccess").style.display = "block";

        alert("Payment Successful! Session Unlocked.");
    }
}
