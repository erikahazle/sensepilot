"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";
import { useDotPosition } from "@/context/DotPositionContext";

const ContactPage = () => {
  const { dotPosition } = useDotPosition();

  return (
    <>
      <Breadcrumb
        pageName="Sign up for waitlist"
        description="If you want to be amongst the first people to try out SensePilot, pop your email below."
      />

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
          transform: 'translate(-50%, -50%)', // Center the custom cursor
          pointerEvents: 'none'
        }}
      />
    </>
  );
};

export default ContactPage;
