module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
                  @import "@/assets/scss/variables.scss";
              `,
      },
    },
  },
  // publicPath: '/zadanie_slider/'
};
