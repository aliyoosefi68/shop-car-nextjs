import styles from "@/module/categoryCard/CategoryCard.module.css";
import Image from "next/image";
import Link from "next/link";

const CategoryCard = ({ name, title }) => {
  return (
    <div className={styles.card}>
      <Link href={`/buy-residential?cat=${name}`}>
        <Image
          src={`/images/${name}.jpg`}
          width={240}
          height={144}
          alt={title}
        />
        <p>{title}</p>
      </Link>
    </div>
  );
};

export default CategoryCard;
