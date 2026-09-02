# Baranwal Design Portfolio

A responsive portfolio website recreated from the supplied Baranwal Design visual reference.

## Structure

- `index.html` — page content and sections
- `styles.css` — paper texture, typography, layout and responsive styling
- `script.js` — theme toggle + active navigation
- `assets/baranwal-design-logo.png` — supplied Baranwal Design logo PNG (paper background removed)
- `assets/designer-illustration.png` — supplied designer illustration
- `assets/projects/` — project image placeholders

## Replace project images

When you provide your actual project images, replace:

- `assets/projects/project-01-placeholder.svg`
- `assets/projects/project-02-placeholder.svg`
- `assets/projects/project-03-placeholder.svg`

You can also change the project title, category and button link directly in `index.html`.

## Publish on GitHub Pages

1. Create a new GitHub repository.
2. Upload all files/folders from this project.
3. Commit to the `main` branch.
4. Go to **Settings → Pages**.
5. Select **Deploy from a branch**.
6. Choose `main` and `/ (root)`.
7. Save. GitHub will generate the live portfolio URL.

No build step is required.


## Background texture

`assets/paper-texture.png` is the supplied paper texture and is used as the repeating site background.


## Background texture — latest version

The background uses the latest supplied paper texture. It is converted into a large mirrored seamless tile so the page reads as one continuous paper surface rather than repeated rectangular boxes.


## Light + Dark mode

- **Light mode:** uses the supplied seamless warm paper texture.
- **Dark mode:** uses the supplied dark paper texture from the latest design reference.
- The theme is saved locally and follows the user's system preference on first visit.
- Keyboard focus indicators and a skip link are included.
- Interactive targets use a minimum ~44px touch target where applicable.
- Reduced-motion preferences are respected.

### WCAG implementation notes

The UI is designed toward WCAG 2.2 AA practices: semantic landmarks, keyboard access, visible focus, readable contrast for primary text and controls, accessible theme state, reduced-motion support, and responsive reflow. Contrast should still be checked after replacing project imagery or custom text colors.


## Contrast pass

The latest version adds a controlled light/dark texture wash so text contrast is not dependent on individual texture pixels. Light-mode accent text is darkened; dark-mode accent text is lightened. Primary and secondary text colors were selected for WCAG AA-oriented contrast, and the outlined CTA/theme control receives a stable surface.


## Portfolio projects

The Selected Work section contains seven supplied projects. Every project card and image is a working link to its own project page.

1. Ferry Management System
2. Northbrook Commerce Admin
3. Atomprints
4. Buildup India
5. HR Requirement Dashboard
6. Pebble — Lifestyle Solution
7. Sholo Guti


## Project links

External project links have been added to both the Selected Work cards and each project detail page.

- Ferry Management System → Behance + Figma
- Pebble → Behance
- Atomprints → Live Framer website
- Northbrook Commerce Admin → Behance
- Sholo Guti → Live game
- Buildup India → Behance + Figma
- HR Requirement Dashboard → Live Framer prototype

Project pages also use a texture overlay and stable content surfaces so typography remains readable in both light and dark modes.


## Responsive + interactive update

- Custom sketch-pencil cursor on pointer devices
- Mobile navigation with accessible menu state
- Scroll progress indicator
- Scroll-triggered reveal animations
- Interactive project-card hover spotlight and image zoom
- Responsive project grid and typography
- Touch-device hover fallback
- Reduced-motion support
- Existing light/dark theme preserved


## Contact / profile links

- Email: baranwalsumit70@gmail.com
- Phone: +91 70177 06211
- LinkedIn: https://www.linkedin.com/in/baranwalsumit/
- Topmate: https://topmate.io/sumit_baranwal/
- GitHub: https://github.com/baranwalsumit70-gif/


## Hero artwork blending

The hero illustration now uses a responsive feathered alpha mask and a subtle
paper/dark atmospheric halo, so the source image no longer appears as a hard
rectangle against the website background. The treatment adapts to light and
dark mode and remains responsive on mobile.


## Selected Work — 9 projects

1. Ferry Management System — Behance case study only
2. Northbrook Commerce Admin — Behance + Claude prototype
3. Atomprints — existing live website link retained
4. Buildup India — live website + Behance case study
5. HR Requirement Dashboard — Figma case study/prototype
6. Pebble — Behance case study + Figma prototype
7. Sholo Guti — existing live game link retained
8. Gemstone Product Detail — Framer case study
9. Nivala Foods — live website

The generic “View Project” CTA has been removed from every project card. Project 01–07 internal pages remain accessible through their project artwork, while projects 08–09 use their supplied external destinations.


## Theme icon

The light/dark mode control is now a custom hand-drawn rope-wrapped bulb,
inspired by the supplied sketch reference. It has a paper-toned light state,
an amber-glowing dark state, sketch-like rays, and a subtle switch animation.


## Minimal theme bulb

The previous rope/lightbulb theme icon was removed and replaced with a minimal
outline bulb icon. Light mode uses a simple paper/ink outline with a subtle
orange accent; dark mode uses a restrained warm glow.


## Hanging bulb theme icon

The theme control now uses a compact hand-drawn hanging rope bulb inspired by
the supplied reference image. The previous circular/minimal icon is removed.
The bulb remains lightweight at header scale, with warm filament/rays in dark
mode and a restrained paper-toned glass treatment in light mode.


## Final pencil cursor

The supplied pencil reference image is converted to a compact transparent PNG
and used directly as the native CSS cursor. The cursor hotspot is positioned
at the pencil tip. The image is intentionally kept within a browser-friendly
64×64 cursor canvas so it renders reliably on desktop browsers and GitHub Pages.


## Sketch social icons

LinkedIn, Topmate, and GitHub in the contact section now use custom
hand-drawn SVG icons based on the supplied sketch visual language. Each icon
keeps its real destination link and has a subtle hover/wiggle interaction.


## Expanded skills

The skills section now contains 15 skills and uses a balanced responsive grid,
so the second row is populated instead of leaving a single Figma pill alone.


## Resume link

A fourth sketch-style social/contact item, **Resume**, has been added next to
LinkedIn, Topmate, and GitHub. It opens the supplied Google Drive resume in a
new tab.


### Cursor update
The supplied pencil cursor is mirrored horizontally (vertical-axis flip) and the cursor hotspot is adjusted so the pencil tip remains the click point.

## Pencil sketch trace

On mouse/pointer devices, the mirrored pencil cursor now leaves an extremely
subtle sketch-like graphite trace while moving. Individual marks fade smoothly
and disappear after approximately 3 seconds. The effect is disabled for touch
screens and reduced-motion preferences.


## Pencil cursor orientation

The supplied sketch pencil is used as the custom cursor, rotated 90° clockwise.
The cursor hotspot is positioned at the sharpened tip for accurate clicking.
The subtle pencil sketch trail remains enabled with its ~3-second fade.


## Floating navigation

The desktop and mobile header now becomes a subtle floating overlay after scrolling. It hides while scrolling down and smoothly reappears when scrolling up, with a paper-texture-friendly translucent surface.


### Theme control
The hanging bulb theme control is intentionally larger and more prominent while retaining the hand-drawn sketch aesthetic.


## About section

Added the supplied hand-drawn design-journey illustration with blended paper edges, responsive sizing, and a short narrative caption. The About copy was refreshed to reflect a journey from curiosity and sketching through learning, making, collaboration, and product design.


### About caption fix
The journey illustration already contains its caption, so the duplicate HTML caption has been removed.
