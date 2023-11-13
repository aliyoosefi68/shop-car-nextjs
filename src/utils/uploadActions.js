"use server";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import os from "os";
import { revalidatePath } from "next/cache";
import cloudinary from "cloudinary";
import Photo from "@/models/Photo";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const savePhotosToLocal = async (formData) => {
  const files = formData.getAll("myFiles");

  const multipleBuffersPromise = files.map((file) =>
    file.arrayBuffer().then((data) => {
      const buffer = Buffer.from(data);

      const name = uuidv4();
      const ext = file.type.split("/")[1];

      //   dosent work in vercel

      //   const uploadDir = path.join(
      //     process.cwd(),
      //     "public/images",
      //     `${name}.${ext}`
      //   );

      const tempDir = os.tmpdir();
      const uploadDir = path.join(tempDir, `${name}.${ext}`); //work in vercell

      fs.writeFile(uploadDir, buffer);

      return { filePath: uploadDir, fileName: file.name };
    })
  );

  return await Promise.all(multipleBuffersPromise);
};

const uploadPhotoToCloudinary = async (newFiles) => {
  const multipleBuffersPromise = newFiles.map((file) =>
    cloudinary.v2.uploader.upload(file.filePath, { folder: "nextjs_upload" })
  );

  return await Promise.all(multipleBuffersPromise);
};

const delay = (delayInms) => {
  return new Promise((resolve) => setTimeout(resolve, delayInms));
};

//upload image
export const uploadPhoto = async (formData) => {
  try {
    const newFiles = await savePhotosToLocal(formData);

    //upload to cload after saving the photos to the temp folder
    const photos = await uploadPhotoToCloudinary(newFiles);
    console.log(photos);

    //Delet photo files in temp folder

    newFiles.map((file) => fs.unlink(file.filePath));

    // await delay(2000);

    //save photo files to mongoDB
    const newPhotos = photos.map((photo) => {
      const newPhoto = new Photo({
        public_id: photo.public_id,
        secure_url: photo.secure_url,
      });
      return newPhoto;
    });

    await Photo.insertMany(newPhotos);

    // revalidatePath("/");

    return { msg: "آپلود تصاویر با موفقیت انجام شد" };
  } catch (error) {
    return { errMsg: error.message };
  }
};

//get image
export const getAllPhotos = async (formData) => {
  try {
    //form cloudinary
    // const { resources } = await cloudinary.v2.search
    //   .expression("folder:nextjs_upload/*")
    //   .sort_by("created_at", "desc")
    //   .max_results(500)
    //   .execute();

    //from mongoDB

    const photos = await Photo.find().sort("-createdAt");
    const resources = photos.map((photo) => ({
      ...photo._doc,
      _id: photo._id.toString(),
    }));

    return resources;
  } catch (error) {
    return { errMsg: error.message };
  }
};

//delet photo
export const deletPhoto = async (public_id) => {
  try {
    await Promise.all([
      Photo.findOneAndDelete({ public_id }),
      cloudinary.v2.uploader.destroy(public_id),
    ]);

    revalidatePath("/");

    return { msg: "حذف موفقیت آمیز بود" };
  } catch (error) {
    return { errMsg: "حذف تصاویر نا موفق بود.لطفا دوباره امتحان کنید!" };
  }
};

export const revalidate = async (path) => {
  revalidatePath(path);
};
