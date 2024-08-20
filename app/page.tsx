"use client";

import { useEffect, useRef, useState } from "react";
import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Blog from "@/components/Blog";
import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import { useDotPosition } from "@/context/DotPositionContext";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { dotPosition } = useDotPosition();
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollDirection = useRef(null);

  const scrollUpButtonRef = useRef(null);
  const scrollDownButtonRef = useRef(null);

  useEffect(() => {
    if (isScrolling) {
      const scrollInterval = setInterval(() => {
        if (scrollDirection.current === 'up') {
          window.scrollBy(0, -20);
        } else if (scrollDirection.current === 'down') {
          window.scrollBy(0, 20);
        }
      }, 10);

      return () => clearInterval(scrollInterval);
    }
  }, [isScrolling]);

  const checkHover = () => {
    const scrollUpButton = scrollUpButtonRef.current;
    const scrollDownButton = scrollDownButtonRef.current;

    if (scrollUpButton && scrollDownButton) {
      const rectUp = scrollUpButton.getBoundingClientRect();
      const rectDown = scrollDownButton.getBoundingClientRect();

      const isHoveringUp =
        dotPosition.x >= rectUp.left &&
        dotPosition.x <= rectUp.right &&
        dotPosition.y >= rectUp.top &&
        dotPosition.y <= rectUp.bottom;

      const isHoveringDown =
        dotPosition.x >= rectDown.left &&
        dotPosition.x <= rectDown.right &&
        dotPosition.y >= rectDown.top &&
        dotPosition.y <= rectDown.bottom;

      if (isHoveringUp) {
        scrollDirection.current = 'up';
        setIsScrolling(true);
      } else if (isHoveringDown) {
        scrollDirection.current = 'down';
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    }
  };

  useEffect(() => {
    checkHover();
  }, [dotPosition]);

  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      {/* <Video /> */}
      <Brands />
      <AboutSectionOne />
      <AboutSectionTwo />
      {/* <Testimonials /> */}
      {/* <Pricing /> */}
      {/* <Blog /> */}
      <Contact />
      <div
        style={{
          position: 'absolute',
          top: `${dotPosition.y}px`,
          left: `${dotPosition.x}px`,
          width: '30px',
          height: '30px',
          backgroundColor: 'grey',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none'
        }}
      />
      <button
        ref={scrollUpButtonRef}
        style={{
          position: 'fixed',
          right: '20px',
          top: '20px',
          width: '50px',
          height: '50px',
          backgroundColor: 'lightblue',
          borderRadius: '50%',
          cursor: 'pointer'
        }}
      >
        Up
      </button>
      <button
        ref={scrollDownButtonRef}
        style={{
          position: 'fixed',
          right: '20px',
          bottom: '20px',
          width: '50px',
          height: '50px',
          backgroundColor: 'lightcoral',
          borderRadius: '50%',
          cursor: 'pointer'
        }}
      >
        Down
      </button>
    </>
  );
}
