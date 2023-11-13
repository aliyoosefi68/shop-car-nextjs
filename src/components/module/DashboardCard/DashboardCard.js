"use client";

import styles from "@/module/DashboardCard/DashboardCard.module.css";
import Card from "../Card/Card";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";

const DashboardCard = ({ data }) => {
  const router = useRouter();

  const editHandler = () => {
    router.push(`/dashboard/my-ads/${data._id}`);
  };
  const deletHandler = async () => {
    const res = await fetch(`/api/profile/delete/${data._id}`, {
      method: "DELETE",
    });
    const datas = await res.json();

    if (datas.error) {
      toast.error(datas.error);
    } else {
      toast.success(datas.message);
    }
    router.refresh();
  };
  return (
    <div className={styles.container}>
      <Card data={data} />
      <div className={styles.main}>
        <button onClick={editHandler}>
          <FiEdit />
          ویرایش
        </button>
        <button onClick={deletHandler}>
          <AiOutlineDelete />
          حذف
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export default DashboardCard;
