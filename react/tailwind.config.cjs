module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#DF6951',
        'primary-yellow': '#F1A501',
        secondary: '#5E6282',
        'dark-navy': '#181E4B',
        'dark-text': '#212832',
        'light-gray': '#F0F4F9',
        'soft-peach': '#FFF1DA',
        'cta-purple': '#DFD7F9'
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        volkhov: ['Volkhov', 'serif'],
        cursive: ['Volkhov', 'serif']
      },
      boxShadow: {
        'primary-btn': '0 20px 35px 0 rgba(241, 165, 1, 0.15)',
        'danger-btn': '0 15px 30px 0 rgba(223, 105, 81, 0.3)',
        'social': '0 2px 10px 0 rgba(0, 0, 0, 0.1)',
        'card-custom': '0px 100px 80px rgba(0, 0, 0, 0.02), 0px 64.8148px 46.8519px rgba(0, 0, 0, 0.0318519), 0px 38.5185px 25.4815px rgba(0, 0, 0, 0.04), 0px 20px 13px rgba(0, 0, 0, 0.05), 0px 8.14815px 6.51852px rgba(0, 0, 0, 0.0681481), 0px 1.85185px 3.14815px rgba(0, 0, 0, 0.1)',
        'service-hover': '0px 100px 80px rgba(0, 0, 0, 0.02), 0px 64.8148px 46.8519px rgba(0, 0, 0, 0.0318519), 0px 38.5185px 25.4815px rgba(0, 0, 0, 0.04), 0px 20px 13px rgba(0, 0, 0, 0.05), 0px 8.14815px 6.51852px rgba(0, 0, 0, 0.0681481), 0px 1.85185px 3.14815px rgba(0, 0, 0, 0.1)'
      }
    }
  },
  plugins: []
}
