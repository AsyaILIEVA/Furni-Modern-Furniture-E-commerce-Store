import HeroSection from "../../components/hero-section/HeroSection";
import WhyChooseSection from "../../components/why-choose-section/WhyChooseSection";
import WeHelpSection from "../../components/we-help-section/WeHelpSection";
import PopularProduct from "../../components/popular-product/PopularProduct";
import Testimonial from "../../components/testimonial/Testimonial";

export default function About() {
  return (
    <>
      <HeroSection
        title="The Story Behind Furni"
        description="At Furni, we believe a welcoming home begins with thoughtful choices. Explore our approach to furniture, comfort, and modern living."
      />

      <WhyChooseSection />
      <WeHelpSection />
      <PopularProduct />
      <Testimonial />
    </>
  );
}