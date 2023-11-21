import AdminCard from "@/module/AdminCard/AdminCard";
import styles from "@/template/adminPage/AdminPage.module.css";

const AdminPage = ({ profiles }) => {
  console.log(profiles);
  return (
    <div>
      {profiles.length ? null : (
        <p className={styles.text}>هیچ آگهی در انتظار تاییدی وجود ندارد</p>
      )}
      {profiles.map((profile) => (
        <AdminCard
          key={profile._id}
          data={JSON.parse(JSON.stringify(profile))}
        />
      ))}
    </div>
  );
};

export default AdminPage;
