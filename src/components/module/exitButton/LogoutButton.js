"use client";

import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";

import styles from "@/module/exitButton/LogoutButton.module.css";

const LogoutButton = () => {
  return (
    <button className={styles.button} onClick={signOut}>
      <FiLogOut />
      خروج
    </button>
  );
};

export default LogoutButton;
