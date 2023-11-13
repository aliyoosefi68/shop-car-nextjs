import styles from "@/module/photoList/PhotoList.module.css";
import PhotoCard from "../PhotoCard/PhotoCard";
import { deletPhoto } from "@/utils/uploadActions";

const PhotoList = ({
  allphotos,
  profileData,
  setProfileData,
  type,
  imageAcc,
}) => {
  const handlerDeletPhoto = async (id) => {
    await deletPhoto(id);
  };
  return (
    <div className={styles.container}>
      {allphotos.map((photo) => (
        <PhotoCard
          key={photo?.public_id}
          url={photo?.secure_url}
          deletHandler={() => handlerDeletPhoto(photo?.public_id)}
          profileData={profileData}
          setProfileData={setProfileData}
          type={type}
          imageAcc={imageAcc}
        />
      ))}
    </div>
  );
};

export default PhotoList;
