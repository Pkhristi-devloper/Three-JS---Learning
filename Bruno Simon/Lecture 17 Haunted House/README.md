# Haunted House - Three.js Project

Welcome to the **Haunted House** project, built using [Three.js](https://threejs.org/)! This project is inspired by Bruno Simon's Three.js course, specifically Lecture 17, and demonstrates how to create an interactive haunted house scene with advanced 3D graphics.

## Features

- **3D Haunted House Model:** Includes a house, door, windows, roof, and surrounding environment.
- **Realistic Lighting:** Uses ambient, directional, and point lights to create a spooky atmosphere.
- **Texturing:** Custom textures for walls, roof, door, and ground for added realism.
- **Fog Effect:** Implements fog to enhance the haunted ambiance.
- **Animated Ghosts:** Floating ghost lights move around the house.
- **Interactive Camera Controls:** Navigate the scene using orbit controls.
- **Responsive Design:** Adapts to different screen sizes.

## Technologies Used

- [Three.js](https://threejs.org/) - 3D rendering library
- JavaScript (ES6)
- [Vite](https://vitejs.dev/) or [Webpack](https://webpack.js.org/) (for development/build)
- Texture assets (from [ambientCG](https://ambientcg.com/) or similar sources)

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

```bash
git clone https://github.com/yourusername/haunted-house-threejs.git
cd haunted-house-threejs
npm install
```

### Running the Project

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000` (or the port shown in your terminal).

## Project Structure

```
├── public/
│   └── textures/
├── src/
│   ├── main.js
│   ├── HauntedHouse.js
│   └── assets/
├── README.md
├── package.json
└── vite.config.js
```

## Key Concepts Demonstrated

- **Geometry Creation:** Custom meshes for house, roof, door, bushes, and graves.
- **Material Usage:** Standard, Lambert, and Phong materials for different effects.
- **Texture Mapping:** Applying multiple textures and normal maps.
- **Lighting:** Combining ambient, directional, and point lights.
- **Animation:** Ghosts move in circular paths using trigonometry.
- **Fog:** Adds depth and atmosphere to the scene.
- **Camera Controls:** User can explore the scene interactively.

## Credits

- Inspired by [Bruno Simon's Three.js Journey](https://threejs-journey.com/)
- Texture assets from [ambientCG](https://ambientcg.com/)

## License

This project is for educational purposes. Please check individual asset licenses before commercial use.

---

Feel free to explore, modify, and expand this haunted house scene!