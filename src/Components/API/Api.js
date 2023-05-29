import axios from "axios";

export const axiosRequest = axios.create({
  baseUrl: "http://18.135.45.221:8000/"
});

export const saveImage = async (selfie_image, id_card_image, type_of_id) => {
  return await axios
    .post("http://18.135.45.221:8000/id_verify/save_image/", {
      selfie_image,
      id_card_image,
      type_of_id,
    })
    .then((res) => res.data);
};

// Face matching API
export const verifyImage = async (selfie_image, id_image_path) => {
  return await axios
    .post("http://18.135.45.221:8000/id_verify/verify_image/", {
      selfie_image,
      id_image_path,
    })
    .then((res) => res.data);
};

// Name Matching API
export const verifyName = async (name, id_image_path) => {
  return await axios
    .post("http://18.135.45.221:8000/id_verify/verify_name", {
      name,
      id_image_path,
    })
    .then((res) => res.data);
};

// Name Matching API
export const verifyTemplate = async (type_of_id, id_image_path) => {
    return await axios
      .post("http://18.135.45.221:8000/id_verify/verify_template", {
        type_of_id,
        id_image_path,
      })
      .then((res) => res.data);
  };
  
  // 
