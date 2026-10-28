
document.addEventListener("DOMContentLoaded", function () {

    // Accordion
    const accordionButtons = document.querySelectorAll(".accordion-button");

    accordionButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const content = button.nextElementSibling;
            const isExpanded = button.getAttribute("aria-expanded") === "true";

            button.setAttribute("aria-expanded", String(!isExpanded));
            content.hidden = isExpanded;
        });
    });

    // Gallery lightbox
    const galleryImages = document.querySelectorAll(".gallery-card img");
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const closeLightbox = document.getElementById("close-lightbox");
    const previousImage = document.getElementById("previous-image");
    const nextImage = document.getElementById("next-image");

    if (lightbox && lightboxImage && closeLightbox && previousImage && nextImage) {
        let currentImageIndex = 0;

        function showImage(index) {
            if (galleryImages.length === 0) return;

            currentImageIndex = (index + galleryImages.length) % galleryImages.length;
            lightboxImage.src = galleryImages[currentImageIndex].src;
            lightboxImage.alt = galleryImages[currentImageIndex].alt;
        }

        galleryImages.forEach(function (image, index) {
            image.addEventListener("click", function () {
                showImage(index);
                lightbox.hidden = false;
            });
        });

        nextImage.addEventListener("click", function () {
            showImage(currentImageIndex + 1);
        });

        previousImage.addEventListener("click", function () {
            showImage(currentImageIndex - 1);
        });

        function closeImageLightbox() {
            lightbox.hidden = true;
            lightboxImage.src = "";
        }

        closeLightbox.addEventListener("click", closeImageLightbox);

        lightbox.addEventListener("click", function (event) {
            if (event.target === lightbox) closeImageLightbox();
        });

        document.addEventListener("keydown", function (event) {
            if (lightbox.hidden) return;

            if (event.key === "Escape") {
                closeImageLightbox();
            } else if (event.key === "ArrowRight") {
                showImage(currentImageIndex + 1);
            } else if (event.key === "ArrowLeft") {
                showImage(currentImageIndex - 1);
            }
        });
    }

    // Back-to-top button
    const backToTopButton = document.getElementById("back-to-top");

    if (backToTopButton) {
        backToTopButton.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // Booking form validation and response
    const inquiryForm = document.getElementById("inquiry-form");

    if (inquiryForm) {
        const appointmentDate = document.getElementById("date");

        if (appointmentDate) {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, "0");
            const day = String(today.getDate()).padStart(2, "0");
            appointmentDate.min = `${year}-${month}-${day}`;
        }

        inquiryForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("booking-name").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const service = document.getElementById("service").value;
            const date = document.getElementById("date").value;
            const time = document.getElementById("time").value;
            const response = document.getElementById("booking-response");

            if (!/^0[0-9]{9}$/.test(phone)) {
                alert("Please enter a valid 10-digit cell phone number starting with 0.");
                return;
            }

            if (!name || !service || !date || !time || !response) {
                alert("Please complete all booking fields.");
                return;
            }

            response.textContent =
                "Thank you, " + name + ". Your appointment request for " +
                service + " on " + date + " at " + time +
                " has been received. Please contact the studio to confirm your appointment.";

            inquiryForm.reset();
        });
    }

    // Gallery search
    const gallerySearch = document.getElementById("gallery-search");
    const galleryCards = document.querySelectorAll(".gallery-card");
    const searchMessage = document.getElementById("search-message");

    if (gallerySearch && searchMessage && galleryCards.length > 0) {
        gallerySearch.addEventListener("input", function () {
            const searchTerm = gallerySearch.value.toLowerCase().trim();
            let visibleCount = 0;

            galleryCards.forEach(function (card) {
                const matches = card.textContent.toLowerCase().includes(searchTerm);
                card.hidden = !matches;

                if (matches) visibleCount++;
            });

            searchMessage.textContent = visibleCount === 0
                ? "No hairstyles found. Try another search."
                : visibleCount + " hairstyle(s) found.";
        });
    }

    // Contact form validation and email process
    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("inquiry-name").value.trim();
            const email = document.getElementById("inquiry-email").value.trim();
            const message = document.getElementById("inquiry-message").value.trim();

            if (!name || !email || !message) {
                alert("Please complete all fields before submitting.");
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            const subject = encodeURIComponent("Website Inquiry from " + name);
            const body = encodeURIComponent(
                "Name: " + name + "\n" +
                "Email: " + email + "\n\n" +
                "Inquiry:\n" + message
            );

            window.location.href =
                "mailto:info@lilybeautysstudio.com?subject=" +
                subject + "&body=" + body;
        });
    }

    // Service price sorting
    const priceSort = document.getElementById("price-sort");
    const sortedServices = document.getElementById("sorted-services");
    const sortedServiceList = document.getElementById("sorted-service-list");
    const sortMessage = document.getElementById("sort-message");

    if (priceSort && sortedServices && sortedServiceList && sortMessage) {
        const services = [
            { name: "Hair Wash", price: 80 },
            { name: "Blow Out", price: 100 },
            { name: "Restore", price: 130 },
            { name: "Hair Treatment", price: 150 },
            { name: "Dark n Lovely", price: 180 },
            { name: "Mizani", price: 300 },
            { name: "Straight Back", price: 400 },
            { name: "Wig Installation and Styling", price: 450 },
            { name: "Up-style", price: 450 },
            { name: "Knotless Braids", price: 500 },
            { name: "Half Up and Half Down Cornrow Braids", price: 500 },
            { name: "Boho Braids", price: 550 },
            { name: "Fulani Braids", price: 600 }
        ];

        priceSort.addEventListener("change", function () {
            const selectedSort = priceSort.value;

            if (selectedSort === "default") {
                sortedServices.hidden = true;
                sortMessage.textContent = "";
                sortedServiceList.innerHTML = "";
                return;
            }

            const sortedList = services.slice();

            if (selectedSort === "low-high") {
                sortedList.sort(function (a, b) {
                    return a.price - b.price;
                });
            } else if (selectedSort === "high-low") {
                sortedList.sort(function (a, b) {
                    return b.price - a.price;
                });
            }

            sortedServiceList.innerHTML = "";

            sortedList.forEach(function (service) {
                const item = document.createElement("li");
                item.textContent = service.name + " - R" + service.price;
                sortedServiceList.appendChild(item);
            });

            sortedServices.hidden = false;
            sortMessage.textContent = sortedList.length + " services sorted by price.";
        });
    }

    // Service search
    const serviceSearch = document.getElementById("service-search");
    const serviceSearchMessage = document.getElementById("service-search-message");
    const serviceAccordions = document.querySelectorAll(".service-accordion");

    if (serviceSearch && serviceSearchMessage && serviceAccordions.length > 0) {
        serviceSearch.addEventListener("input", function () {
            const searchTerm = serviceSearch.value.toLowerCase().trim();
            let visibleCount = 0;

            serviceAccordions.forEach(function (section) {
                const matches = section.textContent.toLowerCase().includes(searchTerm);
                section.hidden = !matches;

                if (matches) visibleCount++;
            });

            if (visibleCount === 0) {
                serviceSearchMessage.textContent = "No services found. Try another search.";
            } else {
                serviceSearchMessage.textContent =
                    visibleCount + " service section(s) found.";
            }
        });
    }

});

    // Live digital clock
function displayTime() {
    const now = new Date();

    let hours = String(now.getHours()).padStart(2, "0");
    let minutes = String(now.getMinutes()).padStart(2, "0");
    let seconds = String(now.getSeconds()).padStart(2, "0");

    const timeElement = document.getElementById("time");

    if (timeElement) {
        timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
}

displayTime();
setInterval(displayTime, 1000);
// Display current date on the home page only
const homeDate = document.getElementById("home-date");

if (homeDate) {
    const today = new Date();
    homeDate.textContent = today.toDateString();
}
