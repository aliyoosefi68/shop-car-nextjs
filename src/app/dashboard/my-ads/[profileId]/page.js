import Profile from "@/models/Profile";
import AddCarPage from "@/template/AddCarPage/AddCarPage";
import connectDB from "@/utils/connectDB";
import { getAllPhotos } from "@/utils/uploadActions";
import React from "react";

const EditAds = async ({ params: { profileId } }) => {
  const photos = await getAllPhotos();
  await connectDB();
  const profile = await Profile.findOne({ _id: profileId });
  if (!profile) return <h3>مشکلی پیش آمده است لطفا دوباره امتحان کنید</h3>;
  return (
    <div>
      <AddCarPage
        allphotos={photos || []}
        data={JSON.parse(JSON.stringify(profile))}
      />
    </div>
  );
};

export default EditAds;
