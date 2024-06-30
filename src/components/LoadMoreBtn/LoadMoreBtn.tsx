import css from "./LoadMoreBtn.module.css";

type LoadMoreBtnProps = {
  onClick: () => void;
};
export default function LoadMoreBtn({ onClick }: LoadMoreBtnProps) {
  return (
    <button className={css.btn} type="button" onClick={onClick}>
      Load more
    </button>
  );
}
