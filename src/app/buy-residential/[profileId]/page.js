import Profile from "@/models/Profile";
import connectDB from "@/utils/connectDB";
import React from "react";

const Detailes = async ({ params: { profileId } }) => {
  await connectDB();
  const profile = await Profile.findOne({ _id: profileId });
  console.log(profile);

  if (!profile) return <h3>مشکلی پیش آمده است</h3>;

  return <div>detailes</div>;
};

export default Detailes;
