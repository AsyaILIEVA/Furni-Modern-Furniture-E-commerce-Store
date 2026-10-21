import HeroSection from "../../components/hero-section/HeroSection";
import WhyChooseSection from "../../components/why-choose-section/WhyChooseSection";
import WeHelpSection from "../../components/we-help-section/WeHelpSection";
import PopularProduct from "../../components/popular-product/PopularProduct";
import BlogSection from "../../components/blog-section/BlogSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhyChooseSection />
      <WeHelpSection />
      <PopularProduct />
      <BlogSection />
    </>
  );
}