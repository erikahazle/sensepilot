import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Sign up for waitlist"
        description="If you want to be amongst the first people to try out SensePilot, pop your email below."
      />

      <Contact />
    </>
  );
};

export default ContactPage;
