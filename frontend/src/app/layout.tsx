import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import "./custom.css";
import "./dark.css";
import "./responsive.css";
import "./developer.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export const metadata: Metadata = {
  title: "MovieShare",
  description: "Welcome to your professional community",
  metadataBase: new URL("https://newfront.movieshare.co"), // Replace with your actual domain
  openGraph: {
    title: "MovieShare",
    description: "Welcome to your professional community",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MovieShare",
    description: "Welcome to your professional community",
    images: ["/opengraph-image.png"],
  },
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang='en'>
      <body>
        {/* <MainLayout>
          <Header /> */}
        {children}
        {/* </MainLayout> */}
      </body>
      <meta property='og:image' content='<generated>' />
      <meta property='og:image:type' content='<generated>' />
      <meta property='og:image:width' content='<generated>' />
      <meta property='og:image:height' content='<generated>' />
    </html>
  );
};
export default RootLayout;
