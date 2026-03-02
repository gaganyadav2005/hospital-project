const type = localStorage.getItem("selectedProfileType");
const index = localStorage.getItem("selectedProfileIndex");

const expertsData = {
    psychology: [
        {
            name: "Dr. Geetanshi Sharma",
            image: "g.jfif",
            about: "Clinical Psychologist with 8+ years experience in anxiety and stress management."












            
        },
       
    ],
    diet: [
        {
            name: "Dr. Riya Kapoor",
            image: "riya.jpg",
            about: "Certified Dietitian helping clients with weight loss and lifestyle improvement."
        },
        {
            name: "Dr. Arjun Mehta",
            image: "arjun.jpg",
            about: "Sports Nutrition Expert focused on muscle gain and performance diet plans."
        }
    ]
};

const expert = expertsData[type][index];

document.getElementById("profileImage").src = expert.image;
document.getElementById("profileName").innerText = expert.name;
document.getElementById("profileAbout").innerText = expert.about;
