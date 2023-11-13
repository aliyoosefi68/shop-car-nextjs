"use client";
import CustomDatePicker from "@/module/customeDatePicker/CustomDatePicker";
import ImageUploader from "@/module/imageUploader/ImageUploader";
import RadioList from "@/module/radioList/RadioList";
import TextInput from "@/module/textInput/TextInput";
import TextList from "@/module/textList/TextList";
import styles from "@/template/AddCarPage/AddCarPage.module.css";
import { Toaster, toast } from "react-hot-toast";
import Loader from "@/module/loader/Loader";

import { useEffect, useState } from "react";

const AddCarPage = ({ allphotos, data }) => {
  const [profileData, setProfileData] = useState({
    title: "",
    desc: "",
    milage: "",
    phone: "",
    price: "",
    Myseller: "",
    image: "",
    constructionDate: new Date(),
    category: "",
    rules: [],
    amenities: [],
  });

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (data) {
      setProfileData(data);
    }
  }, []);

  const submitHandler = async () => {
    setLoading(true);
    const res = await fetch("/api/profile", {
      method: "POST",
      body: JSON.stringify(profileData),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (data.error) {
      toast.error(data.error);
      setLoading(false);
    } else {
      toast.success(data.message);
      setLoading(false);
    }
  };

  const editHandler = async () => {
    setLoading(true);
    const res = await fetch("/api/profile", {
      method: "PATCH",
      body: JSON.stringify(profileData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setLoading(false);
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success(data.message);
    }
  };

  return (
    <div className={styles.container}>
      <h3>{data ? "ویرایش آگهی" : "ثبت آگهی"}</h3>
      <TextInput
        title="عنوان آگهی"
        name="title"
        profileData={profileData}
        setProfileData={setProfileData}
      />

      <TextInput
        title="توضیحات"
        name="desc"
        profileData={profileData}
        setProfileData={setProfileData}
        textarea={true}
      />
      <TextInput
        title="قیمت"
        name="price"
        profileData={profileData}
        setProfileData={setProfileData}
      />
      <TextInput
        title="کارکرد(کیلومتر)"
        name="milage"
        profileData={profileData}
        setProfileData={setProfileData}
      />
      <TextInput
        title="فروشنده"
        name="Myseller"
        profileData={profileData}
        setProfileData={setProfileData}
      />
      <TextInput
        title="شماره تماس فروشنده"
        name="phone"
        profileData={profileData}
        setProfileData={setProfileData}
      />
      <RadioList profileData={profileData} setProfileData={setProfileData} />
      <TextList
        profileData={profileData}
        setProfileData={setProfileData}
        title="امکانات رفاهی"
        type="amenities"
      />
      <TextList
        profileData={profileData}
        setProfileData={setProfileData}
        title="قوانین"
        type="rules"
      />
      <CustomDatePicker
        profileData={profileData}
        setProfileData={setProfileData}
      />
      <ImageUploader
        profileData={profileData}
        setProfileData={setProfileData}
        type="image"
        allphotos={allphotos}
        imageAcc={data ? true : false}
      />
      {loading ? (
        <Loader />
      ) : data ? (
        <button className={styles.submit} onClick={editHandler}>
          ثبت تغیرات
        </button>
      ) : (
        <button className={styles.submit} onClick={submitHandler}>
          ثبت آگهی
        </button>
      )}

      <Toaster />
    </div>
  );
};

export default AddCarPage;
