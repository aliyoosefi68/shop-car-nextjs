import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Profile from "@/models/Profile";
import User from "@/models/User";
import AdminPage from "@/template/adminPage/AdminPage";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Admin = async () => {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session) redirect("/signin");

  const user = await User.findOne({ email: session.user.email });
  if (!user.role === "ADMIN") redirect("/dashboard");

  const profiles = await Profile.find({ published: false });

  return (
    <div>
      <AdminPage profiles={profiles} />
    </div>
  );
};

export default Admin;
