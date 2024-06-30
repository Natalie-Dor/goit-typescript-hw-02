import css from "./ImageCard.module.css";
import { Image } from "../../apiService/images";

interface ImageCardProps {
  item: Image;
  onClickImage: (item: Image) => void;
}
export default function ImageCard({ item, onClickImage }: ImageCardProps) {
  return (
    <div className={css.item}>
      <img
        onClick={() => {
          onClickImage(item);
        }}
        src={item.urls.small}
        alt={item.alt_description}
      />
    </div>
  );
}
