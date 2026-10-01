import HeroSection from "../../components/hero-section/HeroSection";
import ProductSection from "../../components/product-section/ProductSection";
import WhyChooseSection from "../../components/why-choose-section/WhyChooseSection";
import WeHelpSection from "../../components/we-help-section/WeHelpSection";
import PopularProduct from "../../components/popular-product/PopularProduct";
import Testimonial from "../../components/testimonial/Testimonial";
import BlogSection from "../../components/blog-section/BlogSection";

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