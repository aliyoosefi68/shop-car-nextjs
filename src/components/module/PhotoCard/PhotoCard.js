"use client";

import Image from "next/image";
import React, { useTransition, useState, useEffect } from "react";
import { AiOutlineDelete, AiFillCheckSquare } from "react-icons/ai";
import { TailSpin } from "react-loader-spinner";

import styles from "@/module/PhotoCard/PhotoCard.module.css";

const PhotoCard = ({
  url,
  deletHandler,
  profileData,
  setProfileData,
  type,
  disUpload,
  imageAcc,
}) => {
  const [check, setcheck] = useState(false);

  useEffect(() => {
    if (!disUpload) {
      if (profileData[type] === url) {
        setcheck(true);
      } else {
        setcheck(false);
      }
    }
  }, []);

  const setphoto = () => {
    if (profileData[type] !== url) {
      setProfileData({ ...profileData, [type]: url });
      setcheck(true);
    }

    if (profileData[type] === url) {
      setcheck(false);
      setProfileData({ ...profileData, [type]: "" });
    }
    if (imageAcc) {
      setProfileData({ ...profileData, [type]: url });
      setcheck(true);
    }
  };

  const [isPending, startTransition] = useTransition();
  return (
    <div className={styles.container}>
      {check && (
        <div className={styles.checked}>
          <AiFillCheckSquare />
        </div>
      )}
      <div className={styles.containerImage} onClick={setphoto}>
        <Image src={url} alt="image" width={150} height={150} priority />
      </div>

      <button
        type="button"
        onClick={() => startTransition(deletHandler)}
        className={styles.deleteBTN}
      >
        {!isPending ? (
          <>
            <AiOutlineDelete />
          </>
        ) : (
          <TailSpin
            color="#fff"
            height={15}
            ariaLabel="three-gots-loading"
            visible={true}
            wrapperStyle={{ margin: "0" }}
          />
        )}
      </button>
    </div>
  );
};

export default PhotoCard;
