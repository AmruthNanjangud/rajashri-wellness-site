const CONTACT = {
  whatsappNumber: "919136800769",
};

const form = document.querySelector("[data-booking-form]");

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#main-navigation");

if (header && menuToggle && navigation) {
  const compactHeader = window.matchMedia("(max-width: 960px)");
  const setMenuOpen = (open) => {
    navigation.classList.toggle("is-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.textContent = open ? "Close" : "Menu";
  };

  menuToggle.hidden = false;
  header.classList.add("nav-ready");
  menuToggle.addEventListener("click", () => {
    setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
  });
  header.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      const target = event.target.closest("a");
      setMenuOpen(false);
      if (compactHeader.matches && navigation.contains(target)) menuToggle.focus();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      menuToggle.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (!header.contains(event.target)) setMenuOpen(false);
  });
  header.addEventListener("focusout", (event) => {
    if (!header.contains(event.relatedTarget)) setMenuOpen(false);
  });
  compactHeader.addEventListener("change", () => {
    if (compactHeader.matches && navigation.contains(document.activeElement)) menuToggle.focus();
    if (!compactHeader.matches && document.activeElement === menuToggle) navigation.querySelector("a").focus();
    setMenuOpen(false);
  });
}

function buildMessage() {
  const data = new FormData(form);
  const name = (data.get("name") || "").toString().trim();
  const concern = data.get("concern");
  const session = data.get("session");
  const message = (data.get("message") || "").toString().trim();

  return [
    name ? `Hello Rajashri, my name is ${name}.` : "Hello Rajashri, I would like to enquire about a session.",
    `Preferred session: ${session}.`,
    `Main concern: ${concern}.`,
    data.get("astrology") === "yes" ? "I would like to include optional astrology reflection with my coaching session." : "",
    message ? `A little context: ${message}` : "",
    "Please let me know your availability and session fee.",
  ]
    .filter(Boolean)
    .join("\n");
}

function updateEnquiryLinks() {
  const message = buildMessage();
  const body = encodeURIComponent(message);
  form.querySelector('[data-channel="whatsapp"]').href = `https://wa.me/${CONTACT.whatsappNumber}?text=${body}`;
}

if (form) {
  form.addEventListener("submit", (event) => event.preventDefault());
  form.addEventListener("input", updateEnquiryLinks);
  form.addEventListener("change", updateEnquiryLinks);
  form.addEventListener("click", (event) => {
    if (event.target.closest("[data-channel]")) updateEnquiryLinks();
  });

  document.querySelectorAll("[data-session], [data-astrology]").forEach((link) => {
    link.addEventListener("click", () => {
      if (link.dataset.session) form.elements.session.value = link.dataset.session;
      if (link.hasAttribute("data-astrology")) form.elements.astrology.checked = true;
      updateEnquiryLinks();
      form.elements.session.focus({ preventScroll: true });
    });
  });

  updateEnquiryLinks();
}
