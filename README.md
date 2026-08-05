# Rajashri Nanjangud Life Coaching Website

A low-cost static website for a women-centered life coaching service. It is designed to build trust, help visitors recognize concerns they can bring to a session, and start a booking enquiry through WhatsApp or email.

## Project Goals

- Keep annual running cost below INR 2,000.
- Use GitHub for version control.
- Avoid paid backend services.
- Keep deployment under the owner's control.
- Make future content changes simple.

## Recommended Stack

- Static HTML, CSS, and JavaScript.
- GitHub Pages for hosting.
- Manual GitHub Actions deployment from the `main` branch.
- Custom domain purchased separately, if needed.

This keeps hosting free. The only likely recurring cost is the domain renewal.

## Edit Before Launch

Update these placeholders:

- `index.html`: session descriptions, coach bio details, testimonials, real pricing if desired.
- `script.js`: replace `CONTACT.whatsappNumber` and `CONTACT.email`.
- `assets/calm-consultation.svg`: replace with a real professional photo later if available.

## Local Preview

Open `index.html` directly in a browser, or run a small local server:

```powershell
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## Deploy

See `DEPLOYMENT.md`.
