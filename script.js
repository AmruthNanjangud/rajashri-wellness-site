const CONTACT = {
  whatsappNumber: "918197104679",
  email: "couragesage7@gmail.com",
};

const form = document.querySelector("[data-booking-form]");

function buildMessage() {
  const data = new FormData(form);
  const name = (data.get("name") || "A prospective client").toString().trim();
  const concern = data.get("concern");
  const session = data.get("session");
  const message = (data.get("message") || "").toString().trim();

  return [
    `Hello Rajashri, my name is ${name}.`,
    `I would like to enquire about a ${session}.`,
    `Main concern: ${concern}.`,
    message ? `A little context: ${message}` : "",
    "Please let me know your availability and session fee.",
  ]
    .filter(Boolean)
    .join("\n");
}

function openEnquiry(channel) {
  const message = buildMessage();

  if (channel === "whatsapp") {
    const url = `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    return;
  }

  const subject = encodeURIComponent("Life coaching session enquiry");
  const body = encodeURIComponent(message);
  window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
}

form?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-channel]");
  if (!button) return;
  openEnquiry(button.dataset.channel);
});
