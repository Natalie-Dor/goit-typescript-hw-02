import { useEffect, useState } from "react";
import { getImages } from "./apiService/images.js";
import toast, { Toaster } from "react-hot-toast";
import ImageGallery from "./components/ImageGallery/ImageGallery.js";
import SearchBar from "./components/SearchBar/SearchBar.js";
import Loader from "./components/Loader/Loader.js";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn.js";
import ImageModal from "./components/ImageModal/ImageModal.js";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage.js";
import { Image } from "./apiService/images.js";
// ResponseData  - for total_pages
// import
export default function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [isError, setIsError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [total, setTotal] = useState<number>(0);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<Image>();
  // ===============================
  useEffect(() => {
    if (searchQuery.trim() === "") {
      return;
    }
    async function fetchImages() {
      try {
        setIsLoading(true);
        // setIsError(false);
        const fetchedImages = await getImages(searchQuery, page);
        setImages((prevState) => [...prevState, ...fetchedImages]);
        setTotal(fetchedImages.total_pages);
      } catch (error: unknown) {
        // setIsError(true);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchImages();
  }, [page, searchQuery]);

  const handleSearch = async (topic: string) => {
    setSearchQuery(topic);
    setPage(1);
    setImages([]);
  };
  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const openModal = (image: Image) => {
    setCurrentImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />
      {searchQuery && total === 0 && <ErrorMessage />}
      {isLoading && <Loader />}
      {images.length > 0 && (
        <ImageGallery items={images} onClickImage={openModal} />
      )}
      {images.length > 0 && <LoadMoreBtn onClick={handleLoadMore} />}

      <ImageModal
        isOpen={modalIsOpen}
        isClose={closeModal}
        value={currentImage}
      />
    </>
  );
}
