# ims-tailwind
An incident management system built with Next.js and Tailwind CSS.

Run dynamic version:

```bash
npm run dev
```

Build and run static version:

```bash
npx --no-install next build
npx serve@latest out
```

## Limitations of Static Version

- Dynamic routing has to be resolved at build time
- No API endpoint