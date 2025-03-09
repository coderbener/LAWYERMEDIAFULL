document.addEventListener("DOMContentLoaded", () => {
  fetch("https://lawyermediafull.onrender.com/api/services")  // <-- Correct API URL
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

document.getElementById("contact-form").addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent the default form submission

  // Get form data
  const formData = {
      firstname: document.getElementById("fname").value,
      lastname: document.getElementById("lname").value,
      email: document.getElementById("email").value,
      districts: document.getElementById("districts").value,
      subject: document.getElementById("subject").value
  };

  try {
      // Send form data to backend
      const response = await fetch("https://lawyermediafull.onrender.com/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstname: document.getElementById("fname").value.trim(),
            lastname: document.getElementById("lname").value.trim(),
            email: document.getElementById("email").value.trim(),
            districts: document.getElementById("districts").value.trim(),
            subject: document.getElementById("subject").value.trim()
          })
      });

      const result = await response.json();

      if (result.success) {
          alert("✅ Form submitted successfully! Our team will contact you.");
          document.getElementById("contact-form").reset(); // Clear form after success
      } else {
          alert("❌ Failed to send the form. Please try again.");
      }
  } catch (error) {
      console.error("Error:", error);
      alert("❌ Error submitting form.");
  }
});






// Auto-slide every 3 seconds
setInterval(() => changeSlide(1), 3000);

// Show first slide on page load
showSlide(slideIndex);

  