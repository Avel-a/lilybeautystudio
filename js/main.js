
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


/* Part 3: Gallery lightbox */
const galleryImages = document.querySelectorAll(".gallery-card img");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const closeLightbox = document.getElementById("close-lightbox");

if (lightbox && lightboxImage && closeLightbox) {
    galleryImages.forEach(function (image) {
        image.addEventListener("click", function () {
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
            lightbox.hidden = false;
        });
    });

    closeLightbox.addEventListener("click", function () {
        lightbox.hidden = true;
        lightboxImage.src = "";
    });

    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            lightbox.hidden = true;
            lightboxImage.src = "";
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

/* Part 3: Booking form validation */
const inquiryForm = document.getElementById("inquiry-form");

if (inquiryForm) {
    inquiryForm.addEventListener("submit", function (event) {
        const phone = document.getElementById("phone").value.trim();
          if (!/^0[0-9]{9}$/.test(phone)) {
            event.preventDefault();
            alert("Please enter a valid cell phone number.");
        }
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
/* Part 3: Contact form validation */
const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        const name = document.getElementById("inquiry-name").value.trim();
        const email = document.getElementById("inquiry-email").value.trim();
        const message = document.getElementById("inquiry-message").value.trim();

        if (name === "" || email === "" || message === "") {
            event.preventDefault();
            alert("Please complete all fields before submitting.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            event.preventDefault();
            alert("Please enter a valid email address.");
        }
    });
}