// Shared interactions for AINexoraTech
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.textContent = isOpen ? "×" : "☰";
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "☰";
  }));
}
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Demo-only newsletter interaction. Connect a real email marketing service before launch.
const newsletterForm = document.getElementById("newsletterForm");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", event => {
    event.preventDefault();
    const message = document.getElementById("newsletterMessage");
    message.textContent = "Thanks for your interest! This demo form is not yet connected to an email list.";
    newsletterForm.reset();
  });
}

// Contact form uses the visitor's email application as a simple starter solution.
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", event => {
    event.preventDefault();
    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const subject = document.getElementById("contactSubject").value.trim();
    const message = document.getElementById("contactMessage").value.trim();
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:hello@ainexoratech.com.pk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

// Article search and category filtering
const articleSearch = document.getElementById("articleSearch");
const categorySelect = document.getElementById("categorySelect");
const listingCards = [...document.querySelectorAll("[data-article-card]")];
function filterArticles() {
  if (!listingCards.length) return;
  const query = (articleSearch?.value || "").toLowerCase().trim();
  const category = categorySelect?.value || "all";
  let visible = 0;
  listingCards.forEach(card => {
    const matchesText = card.textContent.toLowerCase().includes(query);
    const matchesCategory = category === "all" || card.dataset.category === category;
    const show = matchesText && matchesCategory;
    card.hidden = !show;
    if (show) visible++;
  });
  const empty = document.getElementById("emptyState");
  if (empty) empty.hidden = visible !== 0;
}
articleSearch?.addEventListener("input", filterArticles);
categorySelect?.addEventListener("change", filterArticles);
if (categorySelect && listingCards.length) {
  const wanted = new URLSearchParams(location.search).get("category");
  if (wanted) {
    const match = [...categorySelect.options].find(option => option.value.toLowerCase() === wanted.toLowerCase());
    if (match) categorySelect.value = match.value;
    filterArticles();
  }
}


/* Contact form: prepare a message for WhatsApp or the visitor's email app. */
(() => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const getMessage = () => {
    if (!form.reportValidity()) return null;
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value.trim();
    const message = document.getElementById('contactMessage').value.trim();
    return `Hello AINexoraTech,\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`;
  };

  document.getElementById('sendWhatsApp')?.addEventListener('click', () => {
    const message = getMessage();
    if (!message) return;
    const url = `https://wa.me/923127169856?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener');
  });

  document.getElementById('sendEmail')?.addEventListener('click', () => {
    const message = getMessage();
    if (!message) return;
    const subject = document.getElementById('contactSubject').value.trim();
    const url = `mailto:raqeemafalak277@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.location.href = url;
  });
})();
