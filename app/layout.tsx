"use client";
import { GoogleAnalytics } from '@next/third-parties/google'
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
      <body className="dark:bg-black">
        <Script
          id="termly-consent"
          strategy="beforeInteractive"
          src="https://app.termly.io/resource-blocker/602dbb41-aff2-4ab6-b965-5149d49043b6?autoBlock=on"
        />
        <Providers>
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
        </Providers>
        <GoogleAnalytics gaId="G-1094LBFSMW" />
      </body>
    </html>
  );
}

import { Providers } from "./providers";import Head from "next/head";
import Script from "next/script";

