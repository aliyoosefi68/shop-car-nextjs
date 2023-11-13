"use client";
//styles
import styles from "@/template/signupPage/SignupPage.module.css";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePasword, setRePassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const submitHanler = async (e) => {
    e.preventDefault();
    if (password !== rePasword) {
      toast.error("رمز و تکرار آن برابر نیست!");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    console.log(data);
    if (data.message) {
      toast.success(`${data.message}`);
      router.push("/signin");
      setLoading(false);
    } else {
      toast.error(`${data.error}`);
      setLoading(false);
    }
  };
  return (
    <div className={styles.form}>
      <h4>فرم ثبت نام</h4>
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
        <label>تکرار رمز عبور:</label>
        <input
          type="password"
          value={rePasword}
          onChange={(e) => setRePassword(e.target.value)}
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
          <button type="submit" onClick={submitHanler}>
            ثبت نام
          </button>
        )}
      </form>

      <p>
        {" "}
        حساب کاربری دارید؟
        <Link href="/signin">ورود</Link>
      </p>
      <Toaster />
    </div>
  );
};

export default SignupPage;
