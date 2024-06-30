import axios from "axios";

export interface Image {
  urls: {
    small: string;
    large: string;
    full: string;
  };
  alt_description?: string;
}
export interface ResponseData {
  total: number;
  total_page: number;
  results: Image[];
}
const API_KEY = "UOc_d6jp3NCdXynwKBxBSLMKRbkFVOtcpsVagPnPaRg";
axios.defaults.baseURL = "https://api.unsplash.com/";

axios.defaults.params = {
  orientation: "landscape",
  per_page: 12,
  client_id: API_KEY,
};
export const getImages = async (
  topic: string,
  currentPage: number
): Promise<Image[]> => {
  const response = await axios.get<ResponseData>("search/photos", {
    params: {
      query: topic,
      page: currentPage,
    },
  });
  return response.data.results;
};
