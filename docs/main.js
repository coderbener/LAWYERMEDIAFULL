document.addEventListener("DOMContentLoaded", () => {
  fetch("https://lawyermediafull-3.onrender.com/api/services")  // <-- Correct API URL
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("Fetched services:", data);
      displayServices(data);
    })
    .catch(error => console.error("Error fetching services:", error));
});

  
  function displayServices(services) {
    const servicesGrid = document.getElementById("services-grid");
    servicesGrid.innerHTML = "";  // Clear previous services
  
    services.forEach(service => {
      const serviceCard = document.createElement("div");
      serviceCard.classList.add("col");
  
      serviceCard.innerHTML = `
        <img src="${service.image}" alt="${service.name}" />
        <h4>${service.name}</h4>
        <p>${service.description}</p>
      `;
  
      servicesGrid.appendChild(serviceCard);
    });
  }
  let slideIndex = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove("active");
        if (i === index) slide.classList.add("active");
    });
}

function changeSlide(step) {
    slideIndex = (slideIndex + step + slides.length) % slides.length;
    showSlide(slideIndex);
}

// Auto-slide every 3 seconds
setInterval(() => changeSlide(1), 3000);

// Show first slide on page load
showSlide(slideIndex);

  