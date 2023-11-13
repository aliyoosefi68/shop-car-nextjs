import Card from "@/module/Card/Card";
import SideBar from "@/module/sidebar/SideBar";
import styles from "@/template/BuyResidentialPage/BuyResidential.module.css";

const BuyResidentialPage = ({ data }) => {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <SideBar />
      </div>
      <div className={styles.main}>
        {data.length ? null : (
          <p className={styles.text}>هیچ آگهی ثبت نشده است</p>
        )}
        {data.map((profile) => (
          <Card data={profile} key={profile._id} />
        ))}
      </div>
    </div>
  );
};

export default BuyResidentialPage;
