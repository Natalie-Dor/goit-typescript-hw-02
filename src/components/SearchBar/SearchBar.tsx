import toast from "react-hot-toast";
import css from "./SearchBar.module.css";
import { FormEvent } from "react";
type SearchBarProps = {
  onSubmit: (value: string) => void;
};
export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const value = form.query.value.trim();
    if (!value) {
      toast.error("Enter your query!");
      return;
    }
    onSubmit(value);
    form.reset();
  };
  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          name="query"
          type="text"
          //   autocomplete="off"
          //   autofocus
          placeholder="Search images and photos"
        />
        <button className={css.btn} type="submit">
          Search
        </button>
      </form>
    </header>
  );
}
