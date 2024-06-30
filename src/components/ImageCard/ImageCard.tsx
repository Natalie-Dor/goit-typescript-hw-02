import css from './ImageCard.module.css';
export default function ImageCard({ item, onClickImage }) {
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
