import Profile from "@/models/Profile";
import DetailsPage from "@/template/DetailesPage/DetailsPage";
import connectDB from "@/utils/connectDB";

const Detailes = async ({ params: { profileId } }) => {
  await connectDB();
  const profile = await Profile.findOne({ _id: profileId });
  console.log(profile);

  if (!profile) return <h3>مشکلی پیش آمده است</h3>;

  return (
    <div style={{ maxWidth: "1200px", margin: "10px auto" }}>
      <DetailsPage data={profile} />
    </div>
  );
};

export default Detailes;
