import AddCarPage from "@/template/AddCarPage/AddCarPage";
import { getAllPhotos } from "@/utils/uploadActions";

const AddPage = async () => {
  const photos = await getAllPhotos();
  console.log(photos);
  return (
    <>
      <AddCarPage allphotos={photos || []} />
    </>
  );
};

export default AddPage;
