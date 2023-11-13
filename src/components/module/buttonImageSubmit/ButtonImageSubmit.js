"use client";
import styles from "@/module/buttonImageSubmit/ButtonImageSubmit.module.css";
import { AiOutlineCloudUpload } from "react-icons/ai";

import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { ThreeDots } from "react-loader-spinner";

const ButtonImageSubmit = ({ value, ...props }) => {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} {...props} className={styles.submit}>
      {pending ? (
        <ThreeDots
          color="#fff"
          height={10}
          ariaLabel="three-gots-loading"
          visible={true}
          wrapperStyle={{ margin: "0 auto" }}
        />
      ) : (
        <div>
          <AiOutlineCloudUpload />
          {value}
        </div>
      )}
    </button>
  );
};

export default ButtonImageSubmit;
