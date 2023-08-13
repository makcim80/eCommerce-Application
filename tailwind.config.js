module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'blue-color': '#8EB2C6',
        'login-color': '#222222',
        'footer-color': '#3A5874',
        'form-color': '#21364A',
        'neon-color': '#7df9ff',
        'input-color': '#FFE76E',
      },
      borderRadius: {
        'radius-sm': '50%',
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
        '2xl': '1536px',
      },
      inset: {
        '50px': '50px',
        '50%': '50%',
        '65%': '65%',
        'img-calc': 'calc(50% - 48px)',
      },
      width: {
        '21w': 'calc(100% - 20px)',
        '40%': '60%',
        '1/95': '95%',
        '127px': '125px',
      },
      Height: {
        '100h': '25rem',
      },
      fontSize: {
        'xx-s': '0.7rem',
      },
      padding: {
        '0.7rem': '0.7rem',
      },
    },
  },
  plugins: [],
};
