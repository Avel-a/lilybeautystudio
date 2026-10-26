
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
