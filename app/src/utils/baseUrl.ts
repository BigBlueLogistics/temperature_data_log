function baseUrl() {
  const protocol =
    process.env.APP_PROTOCOL || process.env.NEXT_PUBLIC_APP_PROTOCOL;
  const domain = process.env.APP_DOMAIN || process.env.NEXT_PUBLIC_APP_DOMAIN;
  const port = process.env.PORT || process.env.NEXT_PUBLIC_APP_PORT;

  return `${protocol}://${domain}:${port}`;
}

export default baseUrl;
