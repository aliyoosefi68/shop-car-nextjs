import styles from "@/module/radioList/RadioList.module.css";

const RadioList = ({ profileData, setProfileData }) => {
  const { category } = profileData;
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };
  return (
    <div className={styles.container}>
      <p>دسته بندی</p>
      <div className={styles.main}>
        <div>
          <label htmlFor="suv">SUV</label>
          <input
            type="radio"
            id="suv"
            name="category"
            value="suv"
            checked={category === "suv"}
            onChange={changeHandler}
          />
        </div>
        <div>
          <label htmlFor="sport">SPORT</label>
          <input
            type="radio"
            id="sport"
            name="category"
            value="sport"
            checked={category === "sport"}
            onChange={changeHandler}
          />
        </div>
        <div>
          <label htmlFor="Hatchback">Hatchback</label>
          <input
            type="radio"
            id="Hatchback"
            name="category"
            value="Hatchback"
            checked={category === "Hatchback"}
            onChange={changeHandler}
          />
        </div>
        <div>
          <label htmlFor="sedan">SEDAN</label>
          <input
            type="radio"
            id="sedan"
            name="category"
            value="sedan"
            checked={category === "sedan"}
            onChange={changeHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default RadioList;
