import styles from "@/module/sidebar/SideBar.module.css";
import Link from "next/link";
import { HiFilter } from "react-icons/hi";

const SideBar = () => {
  const queries = [
    { sport: "اسپورت" },
    { sedan: "سواری" },
    { Hatchback: "هاچبک" },
    { suv: "شاسی بلند" },
  ];
  return (
    <div className={styles.container}>
      <p>
        <HiFilter />
        دسته بندی
      </p>
      <Link href="/buy-residential">همه</Link>

      {queries.map((item) => (
        <Link
          href={{
            pathname: "/buy-residential",
            query: { cat: Object.keys(item) },
          }}
        >
          {Object.values(item)}
        </Link>
      ))}
    </div>
  );
};

export default SideBar;
