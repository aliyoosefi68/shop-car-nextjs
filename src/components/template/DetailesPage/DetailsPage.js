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

const DetailsPage = ({ data: { title, image, milage, desc, amenities } }) => {
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
        {amenities.length ? (
          <ul>
            {amenities.map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>
        ) : (
          <p>هیچ موردی ذکر نشده است</p>
        )}
      </div>
      <div className={styles.sidebar}>side</div>
    </div>
  );
};

export default DetailsPage;
