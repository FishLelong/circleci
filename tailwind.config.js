const eth = require("@pie-dao/eth-tailwind");
const cep = require("@pie-dao/tailwind");

module.exports = {
  purge: ["./src/**/*.svelte", "./public/*.html"],
  theme: {},
  variants: {},
  plugins: [cep, eth],
};
