const environment = process.env.NODE_ENV;
const defaults = {
  productionBrowserSourceMaps: true, // enable source maps in production
  reactStrictMode: true,
  sassOptions: {
    includePaths: ["frontend/styles"],
  },
  images: {
    domains: ['img.pokemondb.net']
  }
};

const configs = {
  development: defaults,
  production: defaults,
};

module.exports =
  environment === "production" ? configs.production : configs.development;
