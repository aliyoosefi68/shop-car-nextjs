import DashboardSidebar from "@/layout/dashboardSidebar/DashboardSidebar";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";

const DashboardLayout = async ({ children }) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/signin");

  await connectDB();
  const user = await User.findOne({ email: session.user.email });
  if (!user) return <h3>مشکلی پیش آمده است!</h3>;
  return (
    <DashboardSidebar session={session} role={user.role}>
      {children}
    </DashboardSidebar>
  );
};

export default DashboardLayout;
