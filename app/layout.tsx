"use client";
import { GoogleTagManager } from '@next/third-parties/google'
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      {/* <GoogleTagManager gtmId="GTM-KH99RV2P" /> */}
      <body className="dark:bg-black">
        {/* <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KH99RV2P"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          >
          </iframe>
        </noscript> */}
        <Providers>
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}

import { Providers } from "./providers";
