import DashboardCard from "@/module/DashboardCard/DashboardCard";
import styles from "@/template/myAdsPage/MyAdsPage.module.css";

const MyAdsPage = ({ profiles }) => {
  console.log(profiles);
  return (
    <div className={styles.container}>
      {profiles.length ? null : (
        <p className={styles.text}>هیچ آگهی ثبت نشده است</p>
      )}

      {profiles.map((profile) => (
        <DashboardCard
          key={profile._id}
          data={JSON.parse(JSON.stringify(profile))}
        />
      ))}
    </div>
  );
};

export default MyAdsPage;
