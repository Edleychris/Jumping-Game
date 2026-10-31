# Jumping Game

A small, responsive browser game built with plain HTML, CSS, and JavaScript. Jump over randomly generated obstacles, earn points, and try to beat your best score as the game gradually speeds up.

## Features

- Keyboard and touch controls
- Random cactus, rock, spike, stump, and obstacle-cluster patterns
- Increasing movement speed
- Current-score and best-score tracking
- Responsive layout for phones, tablets, and desktops
- Automatic light and dark color themes
- No packages, frameworks, or build step

## Controls

- Press **Space** or **Arrow Up** to start and jump.
- Tap or click inside the game area to start and jump.
- After a collision, use any jump control to restart.

## Run locally

You can open `index.html` directly in a modern browser. For a local development server, run one of these commands from the project directory:

```bash
python -m http.server 8000
```

or, if Node.js is installed:

```bash
npx serve .
```

Then open the address shown in the terminal.

## Project structure

```text
Jumping-Game/
├── index.html   # Game markup and start/game-over overlay
├── style.css    # Responsive layout, themes, and game artwork
└── script.js    # Input, physics, obstacles, collisions, and scoring
```

## Customization

The color palette is defined with CSS custom properties at the top of `style.css`. Gameplay values such as gravity, jump velocity, player dimensions, and starting speed are defined near the top of `script.js`.

## Browser support

The game works in current versions of Chrome, Edge, Firefox, and Safari. JavaScript must be enabled.
