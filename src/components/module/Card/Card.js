import styles from "@/module/Card/Card.module.css";
import { e2p, sp } from "@/utils/replaceNumber";
import Image from "next/image";

//icons
import { RiPinDistanceLine } from "react-icons/ri";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { LuBadgeDollarSign } from "react-icons/lu";
import { HiOutlineChevronLeft } from "react-icons/hi";
import Link from "next/link";

const Card = ({ data: { category, title, image, milage, price, _id } }) => {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image width={200} height={200} src={image} alt={title} />
      </div>
      <p className={styles.title}>{title}</p>

      <div className={styles.details}>
        <div className={styles.icon}>
          <RiPinDistanceLine />
        </div>
        <span>
          {e2p(milage)}
          کیلومتر
        </span>
      </div>
      <div className={styles.details}>
        <div className={styles.icon}>
          <BiSolidCategoryAlt />
        </div>
        <span>{category}</span>
      </div>
      <div className={styles.details}>
        <div className={styles.icon}>
          <LuBadgeDollarSign />
        </div>
        <span>{sp(price)} تومان</span>
      </div>
      <Link href={`/buy-residential/${_id}`}>
        مشاهده آگهی
        <HiOutlineChevronLeft />
      </Link>
    </div>
  );
};

export default Card;
