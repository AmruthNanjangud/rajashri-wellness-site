const CONTACT = {
  whatsappNumber: "919136800769",
};

const form = document.querySelector("[data-booking-form]");

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
