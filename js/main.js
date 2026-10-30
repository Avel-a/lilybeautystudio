
document.addEventListener("DOMContentLoaded", function () {

    // Display form messages
    function showFormMessage(element, message, isError) {
        if (!element) return;

        element.textContent = message;
        element.style.color = isError ? "red" : "green";
    }


    // Check South African phone numbers
    function isValidPhone(phone) {
        return /^0[0-9]{9}$/.test(phone);
    }


    // Check email addresses
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    }


    // Services accordion
    const accordionButtons = document.querySelectorAll(".accordion-button");

    accordionButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const content = button.nextElementSibling;

            if (!content) return;

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
            if (event.target === lightbox) {
                closeImageLightbox();
            }
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
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }


    // Booking form validation
    const inquiryForm = document.getElementById("inquiry-form");

    if (inquiryForm) {

        const appointmentDate = document.getElementById("date");
        const bookingResponse = document.getElementById("booking-response");

        // Set today's date as the earliest booking date
        if (appointmentDate) {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, "0");
            const day = String(today.getDate()).padStart(2, "0");

            appointmentDate.min = `${year}-${month}-${day}`;
        }

        inquiryForm.noValidate = true;

        inquiryForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("booking-name").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const service = document.getElementById("service").value;
            const date = document.getElementById("date").value;
            const time = document.getElementById("time").value;

            // Check that all fields are completed
            if (!name || !phone || !service || !date || !time) {
                showFormMessage(
                    bookingResponse,
                    "Please complete all booking fields.",
                    true
                );
                return;
            }

            // Check phone number
            if (!isValidPhone(phone)) {
                showFormMessage(
                    bookingResponse,
                    "Please enter a valid 10-digit cell phone number starting with 0.",
                    true
                );
                return;
            }

            // Check that the selected date is not in the past
            if (appointmentDate && date < appointmentDate.min) {
                showFormMessage(
                    bookingResponse,
                    "Please select today or a future date.",
                    true
                );
                return;
            }

            // Display successful booking message
            showFormMessage(
                bookingResponse,
                "Thank you, " + name + ". Your appointment request for " +
                service + " on " + date + " at " + time +
                " has been received. Please contact the studio to confirm your appointment.",
                false
            );

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

                if (matches) {
                    visibleCount++;
                }
            });

            searchMessage.textContent = visibleCount === 0
                ? "No hairstyles found. Try another search."
                : visibleCount + " hairstyle(s) found.";
        });
    }


    // Contact form validation
    const contactForm = document.getElementById("contact-form");

    if (contactForm) {

        const contactResponse = document.getElementById("contact-form-message");

        contactForm.noValidate = true;

        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("inquiry-name").value.trim();
            const email = document.getElementById("inquiry-email").value.trim();
            const phone = document.getElementById("inquiry-phone").value.trim();
            const service = document.getElementById("inquiry-service").value;
            const message = document.getElementById("inquiry-message").value.trim();

            // Check that all fields are completed
            if (!name || !email || !phone || !service || !message) {
                showFormMessage(
                    contactResponse,
                    "Please complete all fields before submitting.",
                    true
                );
                return;
            }

            // Check email address
            if (!isValidEmail(email)) {
                showFormMessage(
                    contactResponse,
                    "Please enter a valid email address.",
                    true
                );
                return;
            }

            // Check phone number
            if (!isValidPhone(phone)) {
                showFormMessage(
                    contactResponse,
                    "Please enter a valid 10-digit cell phone number starting with 0.",
                    true
                );
                return;
            }

            // Prepare the email
            const subject = encodeURIComponent("Website Inquiry from " + name);

            const body = encodeURIComponent(
                "Name: " + name + "\n" +
                "Email: " + email + "\n" +
                "Phone: " + phone + "\n" +
                "Service: " + service + "\n\n" +
                "Inquiry:\n" + message
            );

            showFormMessage(
                contactResponse,
                "Your details are valid. Opening your email application...",
                false
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

                if (matches) {
                    visibleCount++;
                }
            });

            serviceSearchMessage.textContent = visibleCount === 0
                ? "No services found. Try another search."
                : visibleCount + " service section(s) found.";
        });
    }


    // Live clocks and automatic copyright year
    function updateTimeAndYear() {
        const now = new Date();

        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");

        const currentTime = `${hours}:${minutes}:${seconds}`;

        // Update the existing digital clock
        const timeElement = document.getElementById("time");

        if (timeElement && timeElement.tagName !== "INPUT") {
            timeElement.textContent = currentTime;
        }

        // Update the footer clock
        document.querySelectorAll("[data-clock]").forEach(function (element) {
            element.textContent = currentTime;
        });

        // Update the copyright year
        document.querySelectorAll("[data-year]").forEach(function (element) {
            element.textContent = now.getFullYear();
        });
    }

    updateTimeAndYear();
    setInterval(updateTimeAndYear, 1000);


    // Display current date on the home page
    const homeDate = document.getElementById("home-date");

    if (homeDate) {
        const today = new Date();
        homeDate.textContent = today.toDateString();
    }

});
