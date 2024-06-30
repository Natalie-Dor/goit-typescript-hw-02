import { useEffect, useState } from "react";
import { getImages } from "../../apiService/images";
import toast, { Toaster } from "react-hot-toast";
import ImageGallery from "../../../src copy/components/ImageGallery/ImageGallery";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

// import
export default function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //   const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [total, setTotal] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState();
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
      } catch (error) {
        // setIsError(true);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchImages();
  }, [page, searchQuery]);

  const handleSearch = async (topic) => {
    setSearchQuery(topic);
    setPage(1);
    setImages([]);
  };
  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const openModal = (image) => {
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
