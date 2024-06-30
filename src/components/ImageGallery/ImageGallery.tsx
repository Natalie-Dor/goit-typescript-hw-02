import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { Image } from "../../apiService/images";
interface ImageGalleryProps {
  items: Image[];
  onClickImage: (item: Image) => void;
}
export default function ImageGallery({
  items,
  onClickImage,
}: ImageGalleryProps) {
  return (
    <ul className={css.list}>
      {items.map((item) => (
        <li key={item.id}>
          <ImageCard onClickImage={onClickImage} item={item} />
        </li>
      ))}
    </ul>
  );
}
