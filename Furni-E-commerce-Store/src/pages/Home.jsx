import HeroSection from "../components/HeroSection";
import ProductSection from "../components/ProductSection";
import WhyChooseSection from "../components/WhyChooseSection";
import WeHelpSection from "../components/WeHelpSection";
import PopularProduct from "../components/PopularProduct";
import Testimonial from "../components/Testimonial";
import BlogSection from "../components/BlogSection";

export default function Home({ addToCart }) {
  return (
    <>
      <HeroSection />
      <ProductSection addToCart={addToCart}/>
      <WhyChooseSection />
      <WeHelpSection />
      <PopularProduct />
      <Testimonial />
      <BlogSection />
    </>
  );
}