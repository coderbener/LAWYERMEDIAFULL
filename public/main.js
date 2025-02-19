document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:5000/api/services") // Update URL as per your backend
      .then(response => response.json())
      .then(services => displayServices(services))
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
  