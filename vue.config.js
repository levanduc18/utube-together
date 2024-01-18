const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: "PenguinLott",
    manifestOptions: {
      icons: [
        {
          src: "./public/img/icons/favicon-32x32.png",
          sizes: "32x32",
          type: "image/png",
        },
        {
          src: "./public/img/icons/favicon-16x16.png",
          sizes: "16x16",
          type: "image/png",
        },
      ],
    },
  },
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/utube-together/" // Thay tên repository của các bạn vào đây nhé
      : "/",
});
