module.exports = {
  content: [
    "./index.html",
    "./src/components/*.{jsx,tsx}", // Adjust the path to your React components directory
  ],
  theme: {
    extend: {
      colors: {
          primary: '#415a77', 
          secondary: '#1b263b', 
          accent: '#778da9',
          background: '#0d1b2a',
          light: '#e0e1dd',
      },
      backgroundImage: {
        'hero': "url('./src/assets/home-background.jpg')",
      },
    },
  },
  plugins: [],
}