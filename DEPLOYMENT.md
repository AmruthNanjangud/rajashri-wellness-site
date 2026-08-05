# Deployment Plan

## Best Fit

Use GitHub Pages with the included manual workflow.

Why:

- Free static hosting.
- GitHub keeps the full version history.
- Production deploys happen only when the workflow is manually run.
- No build step or paid backend is needed.
- A custom domain can be attached later.

## Cost Model

- Hosting: INR 0/year with GitHub Pages or Cloudflare Pages free tier.
- Domain: usually the only recurring cost. Choose a `.in`, `.co.in`, or similar low-cost domain if the INR 2,000/year cap matters.
- Booking: INR 0/year if using WhatsApp/email links.
- Forms: avoid paid form backends unless enquiry volume grows.

## One-Time GitHub Setup

1. Create a new GitHub repository.
2. Copy this folder into that repository.
3. Commit and push to `main`.
4. In GitHub, go to `Settings` > `Pages`.
5. Set `Source` to `GitHub Actions`.
6. Go to `Actions` > `Deploy static site to GitHub Pages`.
7. Click `Run workflow`.

The live URL will be shown in the workflow run summary.

## Custom Domain

1. Buy a domain from a registrar.
2. In GitHub Pages settings, add the custom domain.
3. Add the DNS records GitHub asks for at the registrar.
4. Enable HTTPS after DNS is verified.

## Deployment Control

The workflow uses `workflow_dispatch`, so code pushes do not automatically publish the site. To publish, run the workflow manually from GitHub Actions.

## Alternative

Cloudflare Pages is also a strong free option. Its free plan supports Git integration, custom domains, and a generous static-site limit. Use it if you already manage DNS on Cloudflare or want branch preview deployments.
