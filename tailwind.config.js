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
        'main-background': "url('./assets/img/bg.svg')",
      },
      height: {
        '21rem': '21rem',
      },
      screens: {
        'sm-s': '640px',
        'lg-l': '1024px',
        '2xl': '1536px',
      },
      inset: {
        '50px': '50px',
        '50%': '50%',
        '69%': '69%',
        'img-calc': 'calc(50% - 48px)',
      },
      width: {
        '21w': 'calc(100% - 20px)',
        '60%': '60%',
        '1/95': '95%',
        '125px': '125px',
      },
      Height: {
        '25rem': '25rem',
      },
      fontSize: {
        'xx-s': '0.7rem',
      },
      padding: {
        '0.52rem': '0.52rem',
      },
    },
  },
  plugins: [],
};
