// script.js

$(document).ready(function () {
  // Sticky header
  $(window).scroll(function () {
    if ($(this).scrollTop() > 1) {
      $(".header-area").addClass("sticky");
    } else {
      $(".header-area").removeClass("sticky");
    }

    updateActiveSection();
  });

  // Smooth scroll + active link
  $(".header ul li a").click(function (e) {
    e.preventDefault();
    var target = $(this).attr("href");

    if (target === "#home") {
      $("html, body").animate({ scrollTop: 0 }, 500);
    } else {
      var offset = $(target).offset().top - 40;
      $("html, body").animate({ scrollTop: offset }, 500);
    }

    $(".header ul li a").removeClass("active");
    $(this).addClass("active");
  });

  // ScrollReveal animations
  ScrollReveal({ distance: "100px", duration: 2000, delay: 200 });
  ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", {
    origin: "left",
  });
  ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", {
    origin: "right",
  });
  ScrollReveal().reveal(".project-title, .contact-title", { origin: "top" });
  ScrollReveal().reveal(".projects, .contact", { origin: "bottom" });

  // Mobile menu toggle
  $(".menu_icon").click(function () {
    $(".header").toggleClass("active");
  });

  // Contact form integration with Google Sheets
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbzUSaaX3XmlE5m9YLOHOBrRuCh2Ohv49N9bs4bew7xPd1qlgpvXtnudDs5Xhp3jF-Fx/exec";
  const form = document.forms["submitToGoogleSheet"];
  const msg = document.getElementById("msg");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then((response) => {
        msg.innerHTML = "Message sent successfully";
        setTimeout(() => {
          msg.innerHTML = "";
        }, 5000);
        form.reset();
      })
      .catch((error) => console.error("Error!", error.message));
  });
});

// Function to highlight active nav section
function updateActiveSection() {
  var scrollPosition = $(window).scrollTop();

  if (scrollPosition === 0) {
    $(".header ul li a").removeClass("active");
    $(".header ul li a[href='#home']").addClass("active");
    return;
  }

  $("section").each(function () {
    var target = $(this).attr("id");
    var offset = $(this).offset().top;
    var height = $(this).outerHeight();

    if (
      scrollPosition >= offset - 40 &&
      scrollPosition < offset + height - 40
    ) {
      $(".header ul li a").removeClass("active");
      $(".header ul li a[href='#" + target + "']").addClass("active");
    }
  });
}
