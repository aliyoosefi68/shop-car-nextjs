import Profile from "@/models/Profile";
import BuyResidentialPage from "@/template/BuyResidentialPage/BuyResidentialPage";
import connectDB from "@/utils/connectDB";
import React from "react";

const BuyResidential = async ({ searchParams }) => {
  await connectDB();
  const profile = await Profile.find({ published: true }).select("-userId");

  let finalData = profile;
  if (searchParams.cat) {
    finalData = finalData.filter((i) => i.category === searchParams.cat);
  }
  return (
    <div style={{ maxWidth: "1200px", margin: "10px auto" }}>
      <BuyResidentialPage data={finalData} />
    </div>
  );
};

export default BuyResidential;
