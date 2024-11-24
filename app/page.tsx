import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Blog from "@/components/Blog";
import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Video from "@/components/Video";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'SensePilot - assistive technology',
  description: 'Assistive software to control your PC with your head and facial expressions',
}

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      {/* <Video /> */}
      <Features />
      {/* <Brands /> */}
      <AboutSectionOne />
      <AboutSectionTwo />
      {/* <Testimonials /> */}
      {/* <Pricing /> */}
      {/* <Blog /> */}
      <Contact />
    </>
  );
}
