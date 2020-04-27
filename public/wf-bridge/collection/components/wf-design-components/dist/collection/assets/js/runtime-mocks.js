window.config = {
  presets: {
    drawerLeft: (position) => {
      const config = { start: 0, end: 0 };
      if (position !== 'top' && position !== 'bottom') {
        const header = document.querySelector('#header');
        const footer = document.querySelector('#footer');
        config.start = header ? header.getBoundingClientRect().bottom : 0;
        config.end = window.innerHeight - footer ? footer.getBoundingClientRect().top : 0;
      }
      return config;
    },
    drawerBottom: (position) => {
      const config = { start: 0, end: 0 };
      if (position !== 'left' && position !== 'right') {
        const sidebar = document.querySelector('#sidebar');
        config.start = sidebar.getBoundingClientRect().width;
        config.end = 0;
      }
      return config;
    },
  },
  agGridLicenseKey:
    '[TRIAL]_10_April_2020_[v2]_MTU4NjQ3NjgwMDAwMA==4723e223afba4b709ced674df3827698',
};
