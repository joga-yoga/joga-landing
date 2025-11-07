const i18n = {
  locales: ["en", "pl"],
  defaultLocale: "en",
};

const isProdBuild = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ...(isProdBuild ? {} : { i18n }),
};

export default nextConfig;
