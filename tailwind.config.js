module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'blue-color': '#8EB2C6',
        'login-color': '#222222',
      },
      backgroundImage: {
        'main-background': "url('./assets/img/bg.png')",
      },
      height: {
        '85h': '21rem',
      },
      screens: {
        'sm-s': '640px',
        'lg-l': '1024px',
      },
      inset: {
        '50px': '50px',
      },
    },
  },
  plugins: [],
};
