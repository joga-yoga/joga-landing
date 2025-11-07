import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/favicons/favicon.ico" },
      { url: "/favicons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicons/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/android-chrome-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicons/android-chrome-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/favicons/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      {
        rel: "mask-icon",
        url: "/favicons/maskable-512.png",
        color: "#050505",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
