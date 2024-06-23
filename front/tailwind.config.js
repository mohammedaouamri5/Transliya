module.exports = {
  content: [
    "./index.html",
    "./src/components/*.{jsx,tsx}", // Adjust the path to your React components directory
  ],
  theme: {
    extend: {
      colors: {
          primary: '#f2f4f3', 
          secondary: '#f2f4f3', 
          accent: '#ef233c',
          background: '#283618',
          subtext: '#669bbc',
          light: '#f2f4f3',
      },
      backgroundImage: {
        'hero': "url('./src/assets/home-background.jpg')",
      },
    },
  },
  plugins: [],
}