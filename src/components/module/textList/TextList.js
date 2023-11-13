import styles from "@/module/textList/TextList.module.css";

//icons
import { MdOutlineLibraryAdd } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";

const TextList = ({ title, profileData, setProfileData, type }) => {
  const addHandler = () => {
    setProfileData({ ...profileData, [type]: [...profileData[type], ""] });
  };

  const changeHandler = (e, index) => {
    const { value } = e.target;
    const list = [...profileData[type]];
    list[index] = value;
    setProfileData({ ...profileData, [type]: list });
  };

  const deletHandler = (index) => {
    const list = [...profileData[type]];
    list.splice(index, 1);
    setProfileData({ ...profileData, [type]: list });
  };

  return (
    <div className={styles.container}>
      <p>{title}</p>
      {profileData[type].map((item, index) => (
        <div className={styles.card} key={index}>
          <input
            type="text"
            onChange={(e) => changeHandler(e, index)}
            value={item}
          />
          <button onClick={() => deletHandler(index)}>
            حذف
            <AiOutlineDelete />{" "}
          </button>
        </div>
      ))}
      <button onClick={addHandler}>
        افزودن
        <MdOutlineLibraryAdd />
      </button>
    </div>
  );
};

export default TextList;
