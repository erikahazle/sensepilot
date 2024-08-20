"use client";

import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { useDotPosition } from "@/context/DotPositionContext";

const AboutPage = () => {
  const { dotPosition } = useDotPosition();

  return (
    <>
      <Breadcrumb
        pageName="About Page"
        description="SensePilot is reshaping interaction with technology through eye tracking, head movements, and voice commands, ensuring accessibility for all. Our mission is to provide intuitive and inclusive computing solutions that make digital navigation effortless. Join us in making technology accessible to everyone."
      />
      <AboutSectionOne />
      <AboutSectionTwo />
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
    </>
  );
};

export default AboutPage;
