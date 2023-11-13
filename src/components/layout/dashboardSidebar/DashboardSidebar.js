import styles from "@/layout/dashboardSidebar/DashboardSidebar.module.css";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { AiOutlineProfile, AiOutlineCar } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import { RiUserSettingsLine } from "react-icons/ri";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoutButton from "@/module/exitButton/LogoutButton";

const DashboardSidebar = async ({ children }) => {
  const session = await getServerSession(authOptions);
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <CgProfile />
        <p>{session?.user.email}</p>
        <span></span>
        <Link href="/dashboard">
          <AiOutlineProfile className={styles.sidebarLink} />
          حساب کاربری
        </Link>
        <Link href="/dashboard/personal">
          <RiUserSettingsLine className={styles.sidebarLink} />
          اطلاعات کاربری{" "}
        </Link>
        <Link href="/dashboard/my-ads">
          <AiOutlineCar className={styles.sidebarLink} />
          آگهی های من
        </Link>
        <Link href="/dashboard/add">
          <IoIosAddCircleOutline className={styles.sidebarLink} />
          افزودن آگهی
        </Link>

        <LogoutButton />
      </div>
      <div className={styles.main}>{children}</div>
    </div>
  );
};

export default DashboardSidebar;
