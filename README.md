# Webify – Music Player

Webify is a React-based music player interface with demo login, music themes,
playlist search, playback controls, volume control, shuffle, repeat, and an
audio visualizer.

## Run locally

```bash
npm ci
npm run dev
```

## Deploy to GitHub Pages

This repository includes a GitHub Actions workflow at
`.github/workflows/deploy.yml`.

1. Create a **public** GitHub repository (for example, `webify`).
2. Upload all files and folders from this project to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **GitHub Actions** as the source.
5. Open the **Actions** tab and wait for **Deploy Webify to GitHub Pages** to finish.
6. Your website URL will appear under **Settings → Pages**.

## Demo login

The project README supplied with the source lists demo credentials:
`student` / `music123` or `admin` / `admin123`.

These are demonstration-only credentials. This project has no backend
authentication, so do not use real passwords or personal credentials.

## Technologies

- React
- Vite
- JavaScript
- CSS
- HTML5 Audio API and Web Audio API
