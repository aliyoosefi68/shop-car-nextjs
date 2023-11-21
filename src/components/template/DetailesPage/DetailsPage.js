import styles from "@/template/DetailesPage/DetailsPage.module.css";

//icons
import { GiPathDistance } from "react-icons/gi";
import { FaPhone } from "react-icons/fa6";
import { IoPricetagsSharp } from "react-icons/io5";
import { BsCalendarDate } from "react-icons/bs";

//function
import { e2p, sp } from "@/utils/replaceNumber";
import Image from "next/image";
import Title from "@/module/Title/Title";
import ItemList from "@/module/itemList/ItemList";
import ShareButton from "@/module/shareButton/ShareButton";

const DetailsPage = ({
  data: {
    title,
    image,
    milage,
    desc,
    amenities,
    rules,
    Myseller,
    phone,
    price,
    category,
    constructionDate,
  },
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1>{title}</h1>
        <div className={styles.imageContainer}>
          <Image src={image} width={600} height={600} alt={title} />
        </div>
        <span>
          <GiPathDistance />
          {sp(milage)}
          کیلومتر
        </span>
        <Title>توضیحات</Title>
        <p>{desc}</p>
        <Title>امکانات</Title>
        <ItemList data={amenities} />

        <Title>قوانین</Title>
        <ItemList data={rules} />
      </div>
      <div className={styles.sidebar}>
        <div className={styles.realState}>
          <p>فروشنده : {Myseller}</p>
          <span>
            {e2p(phone)}
            <FaPhone />
          </span>
        </div>

        <ShareButton />

        <div className={styles.price}>
          <p>
            دسته بندی:
            {category}
          </p>
          <p>
            {sp(price)}
            تومان
          </p>
          <p>
            <BsCalendarDate />
            {new Date(constructionDate).toLocaleDateString("fa-IR")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
