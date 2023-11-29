function baseUrl() {
  const protocol = process.env.NEXT_PUBLIC_APP_PROTOCOL;
  const domain = process.env.NEXT_PUBLIC_APP_DOMAIN;
  const port = process.env.NEXT_PUBLIC_APP_PORT;

  return `${protocol}://${domain}:${port}`;
}

export default baseUrl;
