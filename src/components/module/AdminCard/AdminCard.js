"use client";
import styles from "@/module/AdminCard/AdminCard.module.css";
import { sp } from "@/utils/replaceNumber";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const AdminCard = ({ data }) => {
  const router = useRouter();
  const publishedHandler = async () => {
    const res = await fetch(`/api/profile/publish/${data._id}`, {
      method: "PATCH",
    });
    const result = await res.json();

    if (result.message) {
      toast.success(result.message);
      router.refresh();
    } else {
      toast.error(result.error);
    }
  };
  return (
    <div className={styles.container}>
      <h3>{data.title}</h3>
      <div className={styles.cardBody}>
        <Image width={200} height={200} alt={data.title} src={data.image} />
        <p>{data.desc}</p>
      </div>
      <div className={styles.properties}>
        <span>{sp(data.milage)} کیلومتر</span>
        <span>{sp(data.price)} تومان</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button onClick={publishedHandler}>انتشار</button>
        <Link
          href={`/buy-residential/${data._id}`}
          className={styles.detalesShow}
        >
          جزئیات آگهی
        </Link>
      </div>
      <Toaster />
    </div>
  );
};

export default AdminCard;
