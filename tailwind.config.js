module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'profile-bg': '#fafcfc',
        'blue-color': '#8EB2C6',
        'login-color': '#222222',
        'footer-color': '#3A5874',
        'form-color': '#21364A',
        'neon-color': '#7df9ff',
        'input-color': '#FFE76E',
        'address-color': '#e0c643',
        'successful-color': '#3EB972',
        'error-color': '#F74339',
        'modal-window-bg': '#FFFFFF',
        'save-btn': '#ffdf40',
        'label-profile': '#9797af',
        'popup-color': '#ebebeb',
        'modal-password': '#292929cc',
      },
      borderWidth: {
        // eslint-disable-next-line prettier/prettier
        '1px': '1px',
        '3px': '3px',
      },
      borderRadius: {
        'radius-sm': '50%',
      },
      backgroundImage: {
        'main-background': "url('./assets/img/bg.svg')",
      },
      height: {
        '36px': '36px',
        '42px': '42px',
        '21rem': '21rem',
      },
      screens: {
        'sm-sm': '320px',
        '445px': '445px',
        '606px': '606px',
        'sm-s': '640px',
        'sm-ss': '689px',
        'max-ms': '805px',
        '900px': '900px',
        'lg-l': '1024px',
        '1200px': '1200px',
        '1350px': '1350px',
        '2xl': '1536px',
      },
      inset: {
        '50px': '50px',
        '13%': '13%',
        '41%': '41%',
        '50%': '50%',
        '69%': '69%',
        '70%': '70%',
        'img-calc': 'calc(50% - 48px)',
      },
      width: {
        '21w': 'calc(100% - 20px)',
        '20w': 'calc(100% - 90px)',
        '60%': '60%',
        '1/95': '95%',
        '36px': '36px',
        '42px': '42px',
        '125px': '125px',
        '30rem': '30rem',
        '35rem': '35rem',
      },
      Height: {
        '25rem': '25rem',
      },
      fontSize: {
        '0.55rem': '0.55rem',
        '0.65rem': '0.65rem',
        'xx-s': '0.7rem',
      },
      padding: {
        '0.26rem': '0.26rem',
      },
      spacing: {
        '16px': '16px',
        '18px': '18px',
        '500px': '500px',
        '720px': '720px',
        '900px': '900px',
      },
      maxWidth: {
        '13rem': '13rem',
        '23rem': '23rem',
        '28rem': '28rem',
        '8rem': '8rem',
        '665px': '665px',
      },
      maxHeight: {
        '374px': '374px',
      },
      flex: {
        '2flex': '0 0 9rem',
      },
      minHeight: {
        '8rem': '8rem',
      },
      flexGrow: {
        100: '100',
        99: '99',
      },
      boxShadow: {
        '5xl': '0 2px 6px rgba(28,28,30,.3)',
      },
      fontFamily: {
        'serif-s': ['ui-serif', 'Rubik Wet Paint'],
        'mono-s': ['ui-sans-serif', 'Roboto'],
      },
    },
  },
  plugins: [],
};
