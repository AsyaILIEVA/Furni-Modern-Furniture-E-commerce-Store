
import HeroSection from "../../components/hero-section/HeroSection";
import WhyChooseSection from "../../components/why-choose-section/WhyChooseSection";
import WeHelpSection from "../../components/we-help-section/WeHelpSection";
import PopularProduct from "../../components/popular-product/PopularProduct";
import Testimonial from "../../components/testimonial/Testimonial";

export default function About() {
  return (
    <>
      <HeroSection
        title="About Us"
        description="We help you create a comfortable, beautiful home with thoughtfully designed furniture."
      />

      <WhyChooseSection />
      <WeHelpSection />
      <PopularProduct />
      <Testimonial />
    </>
  );
}