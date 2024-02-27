import axios from "axios";

export const useUploadImage = () => {
  const uploadSingleImageToCloudinary = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET as string
      );
      formData.append(
        "cloud_name",
        process.env.REACT_APP_CLOUDINARY_UPLOAD_CLOUD_NAME as string
      );
      formData.append(
        "folder",
        process.env.REACT_APP_CLOUDINARY_UPLOAD_FOLDER as string
      );
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_UPLOAD_CLOUD_NAME}/image/upload`,
        formData
      );

      return response.data.url;
    } catch (error) {
      console.log(error);
    }
  };

  const uploadMultipleImageToCloudinary = async (files: FileList) => {
    try {
      const promiseList = [];

      for (let i = 0; i < files.length; i++) {
        promiseList.push(() => uploadSingleImageToCloudinary(files[i]));
      }
      const urls = await Promise.all(promiseList.map((promise) => promise()));
      return urls;
    } catch (error) {
      console.log(error);
    }
  };

  return { uploadSingleImageToCloudinary, uploadMultipleImageToCloudinary };
};
