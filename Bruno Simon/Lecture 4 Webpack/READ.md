# Three.js Project Setup with Webpack

When starting with Three.js, you might load it using a simple `<script>` tag. However, this approach has several limitations:

- **Missing Classes:** Some essential Three.js classes may not be available.
- **Security:** Running code directly from files can cause security issues.
- **No Local Server:** You need a server to emulate a real website environment.

## Why Use a Bundler?

A **bundler** is a tool that processes your project files—JavaScript, CSS, HTML, images, TypeScript, Stylus, Sass, and more. It applies necessary modifications and outputs a web-friendly "bundle".

### Benefits of Using a Bundler

- Runs a local development server
- Manages dependencies
- Improves compatibility
- Adds module support
- Optimizes files
- Simplifies deployment

## Getting Started

We'll use **Node.js** and **npm** to install Three.js and set up our development server.

---

> **Tip:** Using a bundler like Webpack makes your Three.js workflow smoother and more scalable!