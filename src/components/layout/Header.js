"use client";
import styles from "./Header.module.css";

//icon
import { AiOutlineLogin, AiOutlineUser } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

const Header = () => {
  const { data } = useSession();

  return (
    <div className={styles.container}>
      <div>
        <Link href="/">
          <Image src="/images/logo.png" width={60} height={60} alt="logo" />
        </Link>
      </div>
      <div>
        <ul className={styles.navBar}>
          <li>
            <Link href="/">صفحه اصلی</Link>
          </li>
          <li>
            <Link href="/buy-residential">آگهی ها</Link>
          </li>
          <li>
            <Link href="/">وبلاگ</Link>
          </li>
          <li>
            <Link href="/">درباره ما</Link>
          </li>
          <li>
            <Link href="/">تماس با ما</Link>
          </li>
        </ul>
      </div>
      {data ? (
        <div>
          <Link href="/dashboard">
            <div className={styles.signIn}>
              <AiOutlineUser />
            </div>
          </Link>
        </div>
      ) : (
        <div>
          <Link href="/signup">
            <div className={styles.signIn}>
              <AiOutlineLogin />
              <span>ورود</span>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
