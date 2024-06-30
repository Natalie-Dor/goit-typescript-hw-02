import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
export default function ImageGallery({ items, onClickImage }) {
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
