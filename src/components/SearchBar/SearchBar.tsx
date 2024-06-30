import toast from 'react-hot-toast';
import css from './SearchBar.module.css';
export default function SearchBar({ onSubmit }) {
  const handleSubmit = e => {
    e.preventDefault();
    const value = e.target.query.value.trim();
    if (!value) {
      toast.error('Enter your query!');
      return;
    }
    onSubmit(value);
    e.target.reset();
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
