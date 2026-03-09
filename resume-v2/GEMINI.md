# MEXDOT - Personal Portfolio Project

This project is a modern, high-performance personal portfolio website named **MEXDOT**, designed with a focus on smooth animations and a clean aesthetic.

## Project Overview
- **Type:** Static Web Application (Portfolio)
- **Main Technologies:**
    - **Frontend:** HTML5, Vanilla JavaScript, CSS3 (with CSS Variables).
    - **Animations:** [GSAP (GreenSock Animation Platform)](https://greensock.com/gsap/) including `ScrollTrigger` and `ScrollToPlugin`.
    - **Typography:** [Pretendard](https://github.com/orioncactus/pretendard) (Web Font).
- **Architecture:**
    - `index.html`: Main entry point and structure.
    - `assets/css/style.css`: Comprehensive styling with responsive design.
    - `assets/js/main.js`: Core logic for animations, preloader, and smooth scrolling.
    - `assets/img/`: Local images and branding assets.

## Building and Running

### Development Server
The project is a static website. You can run it locally using any static server.

- **Using Python:**
  ```bash
  python -m http.server 8000
  ```
- **Using Node.js (serve):**
  ```bash
  npx serve .
  ```
- **Local Access:** Open `index.html` directly in a browser or use the servers above.

### Build Process
This project does not currently have a build step (no minification or bundling). All assets are served directly.

## Development Conventions

### Coding Style
- **Naming:** Follows standard kebab-case for CSS classes and camelCase for JavaScript variables.
- **Modularity:** Keep styles in `assets/css/style.css` and logic in `assets/js/main.js`.
- **GSAP Animations:** All scroll-based reveals and interactive effects should be implemented using GSAP for consistency.

### Assets Management
- **Images:** Local images should be placed in `assets/img/`. Currently, many images are linked externally from `template.dsngrid.com`.
- **Fonts:** Pretendard is loaded via CDN in the `<head>` of `index.html`.

### Key Features to Maintain
- **Preloader:** A GSAP-driven preloader that counts to 100% before revealing the content.
- **Smooth Scroll:** Smooth navigation between sections via `ScrollToPlugin`.
- **Responsive Design:** Ensures the layout works from mobile (breakpoint at 991px) to large desktop screens (1400px container).
