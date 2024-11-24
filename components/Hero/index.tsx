import Link from "next/link";
import SectionTitle from "../Common/SectionTitle";

const Hero = () => {
  return (
    <section id="home" className="pt-16 md:pt-20 lg:pt-28">
      <div className="container">
        <div className="border-b border-body-color/[.15] dark:border-white/[.15]">
          <div className="-mx-4 flex flex-wrap items-center mt-20 lg:mt-0">
            <div className="w-full px-4 lg:w-1/2">
              <SectionTitle
                title="Control your computer with head tracking and facial expressions"
                paragraph="Effortless Control, Infinite Possibilities."
                mb="44px"
              />
              <div className="flex items-center justify-start pr-16 lg:pr-0">
                <Link
                  href="/waitlist"
                  className="ease-in-up rounded-md bg-primary py-3 px-8 text-base font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9"
                >
                  Join our waitlist
                </Link>
              </div>
            </div>

            <div className="w-full px-4 lg:w-1/2">
              <div
                className="flex wow fadeInUp relative mx-auto aspect-[25/24] max-w-[550px] lg:mr-0"
                data-wow-delay=".2s"
              >
                <video className="mx-auto max-w-full lg:mr-0" preload="auto" autoPlay loop muted playsInline>
                  <source src="/videos/sensepilot_demo_shopping.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
