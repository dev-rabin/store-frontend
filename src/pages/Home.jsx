import { faCheck, faPhone, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-regular-svg-icons";
import { fetchCategories } from "../services/api";
import BannerGrid from "../components/ui/BannerGrid";
import TodayDeal from "../components/ui/TodayDeal";
import Categories from "../components/ui/Categories";
import DiscoverProducts from "../components/ui/DiscoverSomething";
import FeaturedSection from "../components/ui/FeatureSection";
import Perks from "../components/ui/Perks";

function Home() {
  return (
    <>

      <div>
        <BannerGrid />
      </div>

      <div>
        <TodayDeal />
      </div>
      <hr />

      <div>
        <Categories />
      </div>
      <hr />

      <DiscoverProducts />
      <hr />
      <Perks />
    </>
  );
}

export default Home;
