"use client";

import styles from "@/module/imageUploader/ImageUploader.module.css";
import Image from "next/image";
import { useRef, useState } from "react";
import PhotoCard from "@/module/PhotoCard/PhotoCard";
import ButtonImageSubmit from "../buttonImageSubmit/ButtonImageSubmit";
import { revalidate, uploadPhoto } from "@/utils/uploadActions";
import PhotoList from "../photoList/PhotoList";

import { AiOutlineCloudUpload } from "react-icons/ai";

import { Toaster, toast } from "react-hot-toast";

const ImageUploader = ({
  profileData,
  setProfileData,
  type,
  allphotos,
  imageAcc,
}) => {
  const [myfiles, setFiles] = useState([]);
  const formRef = useRef();

  const handlerInputFile = async (e) => {
    const files = e.target.files;

    const newFiles = [...files].filter((file) => {
      if (file.size < 1024 * 1024 && file.type.startsWith("image/")) {
        return file;
      }
    });

    setFiles((prev) => [...newFiles, ...prev]);
    formRef.current.reset();
  };

  const deletHandler = async (index) => {
    const newFiles = myfiles.filter((_, i) => i !== index);
    setFiles(newFiles);
  };
  const handleUpload = async () => {
    if (!myfiles.length) return toast.error("هیچ تصویری انتخاب نشده است");
    if (myfiles.length > 3)
      return toast.error("تعداد تصاویر باید بیشتر از سه عدد نباشد");

    const formData = new FormData();
    myfiles.forEach((file) => {
      formData.append("myFiles", file);
    });
    const res = await uploadPhoto(formData);
    if (res?.msg) {
      toast.success(`${res?.msg}`);
    }
    if (res?.errMsg) {
      toast.error(`${res?.errMsg}`);
    }

    setFiles([]);
    formRef.current.reset();

    revalidate("/");
  };

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>تصاویر</h4>
      <span>
        فقط تصاویر با حجم حداکثر 1Mb قابل بارگذاریست.تعداد تصویر بیشتر از 3 عکس
        نباشد!
      </span>
      <form ref={formRef} action={handleUpload}>
        <div className={styles.uplodsessin}>
          <label htmlFor="inputImages">
            <AiOutlineCloudUpload />
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handlerInputFile}
            id="inputImages"
            multiple
          />

          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              margin: "10px 0",
            }}
          >
            {myfiles.map((file, index) => (
              <PhotoCard
                key={index}
                url={URL.createObjectURL(file)}
                deletHandler={() => deletHandler(index)}
                disUpload={true}
              />
            ))}
          </div>
        </div>
        <ButtonImageSubmit value="آپلود تصاویر" />
      </form>
      <div className={styles.devider}></div>
      <div className={styles.showImage}>
        <h4>لیست تصاویر</h4>
        {allphotos.length ? (
          <PhotoList
            allphotos={allphotos}
            profileData={profileData}
            setProfileData={setProfileData}
            type={type}
            imageAcc={imageAcc}
          />
        ) : (
          <span
            style={{
              display: "block",
              margin: "10px auto",
              textAlign: "center",
            }}
          >
            هیچ تصویری بار گذاری نشده است
          </span>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default ImageUploader;
