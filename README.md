# Vitala AI — Health Risk Assessment (Redesigned)

A responsive, dark futuristic, browser-based educational project built with HTML, CSS, and vanilla JavaScript. It can be hosted directly on GitHub Pages.

## Features
- Dark navy / electric blue / violet dashboard styling
- Responsive landing page and assessment form
- Validation for required fields and reasonable input bounds
- Rule-based score based on the scoring logic in the original `script.js`
- Transparent breakdown of all seven scoring factors
- Measurement summaries and general educational suggestions
- Downloadable text report and print-friendly results
- No login, external API, database, or server required; entries are processed in the browser and not stored by the page

## Run locally
1. Extract the ZIP.
2. Open `index.html` in a modern browser. For a better development experience, use VS Code with the Live Server extension.
3. Fill in the assessment and test the download and print buttons.

## Publish on GitHub Pages
1. Open your existing repository on GitHub.
2. Keep a backup of the old files first (download the current repository ZIP).
3. Upload `index.html`, `style.css`, `script.js`, and this README to the repository root, replacing the old website files.
4. Commit the changes.
5. In the repository, open **Settings → Pages** and make sure Pages is configured to publish from the intended branch and root folder.
6. Wait for the deployment to finish, then hard-refresh the website (Ctrl+F5).

## Important note about the score
The score is a custom educational score based on the rules in the original website JavaScript. It is **not clinically validated** and must not be used to diagnose, predict disease, or guide treatment. Blood pressure, glucose, and BMI interpretation depends on context. The separate Java console file in the uploaded ZIP uses a different scoring model; this redesigned page follows the original website's JavaScript rules rather than claiming the two models are identical.

## Files
- `index.html` — structure and content
- `style.css` — visual design and responsive layout
- `script.js` — validation, scoring, results, download, and print
