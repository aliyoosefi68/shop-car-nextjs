"use client";
import styles from "@/module/shareButton/ShareButton.module.css";

//icons
import { LuShare2 } from "react-icons/lu";

//copy clipboard
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useEffect, useState } from "react";

const ShareButton = () => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);
  return (
    <CopyToClipboard text={url}>
      <div className={styles.container}>
        <LuShare2 />
        <button>اشتراک گذاری</button>
      </div>
    </CopyToClipboard>
  );
};

export default ShareButton;
