"use client";

import styles from "@/template/signinPage/SigninPage.module.css";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";

import { signIn } from "next-auth/react";
const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const signinHanler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    console.log(data);
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success("ورود با موفقیت انجام شد");
      router.push("/");
    }

    if (data.message) {
      toast.success(`${data.message}`);
      router.push("/");
      setLoading(false);
    } else {
      toast.error(`${data.error}`);
      setLoading(false);
    }
  };
  return (
    <div>
      <div className={styles.form}>
        <h4>فرم ورود</h4>
        <form>
          <label>ایمیل:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>رمز عبور:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {loading ? (
            <ThreeDots
              color="#dfae76"
              height={45}
              ariaLabel="three-gots-loading"
              visible={true}
              wrapperStyle={{ margin: "0 auto" }}
            />
          ) : (
            <button type="submit" onClick={signinHanler}>
              ورود به حساب کاربری
            </button>
          )}
        </form>

        <p>
          {" "}
          قبلا ثبت نام نکرده ام! <Link href="/signup">ثبت نام</Link>
        </p>
        <Toaster />
      </div>
    </div>
  );
};

export default SigninPage;
