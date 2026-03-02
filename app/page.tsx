import BannerProduct from "@/components/BannerProduct";
import Carousel from "@/components/CarouselBanner";
import ChooseCategories from "@/components/ChooseCategories";
import FeaturedProducts from "@/components/FeaturedProducts";
import HomeBanner from "@/components/HomeBanner";
import ProductList from "@/components/ProductsList";

export default function Home() {
  return (
    <main>
      <HomeBanner />
      <Carousel />
      <FeaturedProducts />
      <ChooseCategories />
      <BannerProduct />
      <ProductList />
    </main>
  );
}
