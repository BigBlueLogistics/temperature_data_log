module.exports = {
  apps: [
    {
      name: "next",
      script: "npm",
      args: "start",
      env_staging: {
        PORT: 5100,
      },
      env_prod: {
        PORT: 4100,
      },
    },
  ],
};
