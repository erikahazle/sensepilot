import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'SensePilot - assistive technology',
  description: 'Assistive software to control your PC with your head and facial expressions',
}

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="About Us"
        description="SensePilot is reshaping interaction with technology through eye tracking, head movements, and voice commands, ensuring accessibility for all. Our mission is to provide intuitive and inclusive computing solutions that make digital navigation effortless. Join us in making technology accessible to everyone."
      />
      <AboutSectionOne />
      <AboutSectionTwo />
    </>
  );
};

export default AboutPage;
