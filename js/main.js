
document.addEventListener("DOMContentLoaded", function () {
    const accordionButtons = document.querySelectorAll(".accordion-button");

    accordionButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const content = button.nextElementSibling;
            const isExpanded = button.getAttribute("aria-expanded") === "true";

            button.setAttribute("aria-expanded", !isExpanded);
            content.hidden = isExpanded;
        });
    });
});


/* Part 3: Gallery lightbox with previous and next controls */
const galleryImages = document.querySelectorAll(".gallery-card img");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const closeLightbox = document.getElementById("close-lightbox");
const previousImage = document.getElementById("previous-image");
const nextImage = document.getElementById("next-image");

if (
    lightbox &&
    lightboxImage &&
    closeLightbox &&
    previousImage &&
    nextImage
) {
    let currentImageIndex = 0;

    function showImage(index) {
        currentImageIndex =
            (index + galleryImages.length) % galleryImages.length;

        const image = galleryImages[currentImageIndex];
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
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
        if (lightbox.hidden) {
            return;
        }

        if (event.key === "Escape") {
            closeImageLightbox();
        } else if (event.key === "ArrowRight") {
            showImage(currentImageIndex + 1);
        } else if (event.key === "ArrowLeft") {
            showImage(currentImageIndex - 1);
        }
    });
}


/* Part 3: Back-to-top button */
const backToTopButton = document.getElementById("back-to-top");

if (backToTopButton) {
    backToTopButton.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

/* Part 3: Booking form validation and response */
const inquiryForm = document.getElementById("inquiry-form");

if (inquiryForm) {
    inquiryForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("booking-name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const service = document.getElementById("service").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;
        const response = document.getElementById("booking-response");

        if (!/^0[0-9]{9}$/.test(phone)) {
            alert("Please enter a valid cell phone number.");
            return;
        }

        response.textContent =
            "Thank you, " + name +
            ". Your appointment request for " + service +
            " on " + date + " at " + time +
            " has been received. Please contact the studio to confirm your appointment.";

        inquiryForm.reset();
    });
}

/* Part 3: Prevent past appointment dates */
const appointmentDate = document.getElementById("date");

if (appointmentDate) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    appointmentDate.min = `${year}-${month}-${day}`;
}
/* Part 3: Gallery search */
const gallerySearch = document.getElementById("gallery-search");
const galleryCards = document.querySelectorAll(".gallery-card");
const searchMessage = document.getElementById("search-message");

if (gallerySearch && searchMessage && galleryCards.length > 0) {
    gallerySearch.addEventListener("input", function () {
        const searchTerm = gallerySearch.value.toLowerCase().trim();
        let visibleCount = 0;

        galleryCards.forEach(function (card) {
            const hairstyleName = card.textContent.toLowerCase();
            const matches = hairstyleName.includes(searchTerm);

            card.hidden = !matches;

            if (matches) {
                visibleCount++;
            }
        });

        if (visibleCount === 0) {
            searchMessage.textContent = "No hairstyles found. Try another search.";
        } else {
            searchMessage.textContent = visibleCount + " hairstyle(s) found.";
        }
    });
}

/* Part 3: Contact form validation and email process */
const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("inquiry-name").value.trim();
        const email = document.getElementById("inquiry-email").value.trim();
        const message = document.getElementById("inquiry-message").value.trim();

        if (name === "" || email === "" || message === "") {
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
