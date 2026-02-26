const type = localStorage.getItem("selectedExpertType");

const title = document.getElementById("title");
const container = document.getElementById("expertContainer");

const expertsData = {
    psychology: [
        {
            name: "Dr. Geetanshi Sharma",
            image: "aman.jpg",
            about: "Clinical Psychologist with 8+ years experience in anxiety and stress management."
        },
        
    ],
    diet: [
        {
            name: "Dr. Riya Kapoor",
            image: "riya.jpg",
            about: "Certified Dietitian helping clients with weight loss and lifestyle improvement."
        },
        
    ]
};

if(type){
    title.innerText = "Our Experts";

    expertsData[type].forEach((expert, index) => {
        container.innerHTML += `
            <div class="expert-box" onclick="openProfile('${type}', ${index})">
                <h3>${expert.name}</h3>
            </div>
        `;
    });
}

function openProfile(type, index){
    localStorage.setItem("selectedProfileType", type);
    localStorage.setItem("selectedProfileIndex", index);
    window.location.href = "profile.html";
}
