import styles from "@/module/customeDatePicker/CustomDatePicker.module.css";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const CustomDatePicker = ({ profileData, setProfileData }) => {
  const changeHandler = (e) => {
    const data = new Date(e);
    setProfileData({ ...profileData, constructionDate: data });
  };
  return (
    <div className={styles.container}>
      <p>تاریخ تولید</p>
      <DatePicker
        calendar={persian}
        locale={persian_fa}
        value={profileData.constructionDate}
        onChange={(e) => changeHandler(e)}
      />
    </div>
  );
};

export default CustomDatePicker;
