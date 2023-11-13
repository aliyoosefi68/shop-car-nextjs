import CategoryCard from "@/module/categoryCard/CategoryCard";
import styles from "@/template/homePage/HomePage.module.css";
import { FiCircle } from "react-icons/fi";
import { FaCity } from "react-icons/fa";

const HomePage = () => {
  const services = ["نو", "دست دوم", "پیش فروش"];
  const companies = ["بنز", "پورشه", "ولوو", "بی ام و", "تویوتا"];
  const cities = [
    "اهواز",
    "آبادان",
    "دزفول",
    "بهبهان",
    "امیدیه",
    "ماهشهر",
    "خرمشهر",
    "سربندر",
  ];
  return (
    <div>
      <div className={styles.banner}>
        <div className={styles.desc}>
          <h1>سامانه خرید،فروش و معامله خودرو</h1>
          <ul>
            {services.map((i, index) => (
              <li key={index}>
                <FiCircle />
                {i}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.categories}>
        <CategoryCard title="هاچبک" name="Hatchback" />
        <CategoryCard title="شاسی بلند" name="suv" />
        <CategoryCard title="سواری" name="sedan" />
        <CategoryCard title="اسپورت" name="sport" />
      </div>
      <div className={styles.city}>
        <h3>شهرهای شامل نمایندگی</h3>
        <ul>
          {cities.map((city) => (
            <li key={city}>
              <FaCity />
              <span>{city}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
