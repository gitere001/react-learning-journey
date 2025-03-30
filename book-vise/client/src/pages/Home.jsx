import { useEffect, useState } from "react";
import books from "../data/books";
import BookCard from "../components/BookCard";
import "../styles/dashboard.css";
import { Search } from "lucide-react";
import { filterSearch } from "../utils/searchSuggestion";
import { useNavigate } from "react-router-dom";

function DashBoard() {
  const navigate = useNavigate()
  const [booksTitles, setBooksTitles] = useState([]);
  const [suggestedTitles, setSuggestedTitles] = useState([]);
  const [searchStr, setSearchStr] = useState("");
  useEffect(() => {
    const bookTitles = books.map((book) => book.title);
    setBooksTitles(bookTitles);
  }, []);
  useEffect(() => {
    if (searchStr.trim()) {
      setSuggestedTitles(filterSearch(booksTitles, searchStr));
    }
  }, [searchStr]);
  const booksElements = books.map((book) => {
    return (
      <BookCard
        key={book.id}
        cover={book.cover}
        title={book.title}
        author={book.author}
      />
    );
  });

  return (
    <div className="dashboard">
      <div className="search-book-container">
        <input
          value={searchStr}
          onChange={(e) => setSearchStr(e.target.value)}
          type="text"
          placeholder="Enter book title"
        />
        <i className="search-icon">
          <Search />
        </i>
        <div
          className={`search-suggestion ${
            searchStr.trim() ? "show-suggestion" : ""
          }`}
        >
          {searchStr.trim() && suggestedTitles.length < 1 ? (
            <p className="no-result">
              No matches found. Try a different search term.
            </p>
          ) : (
            suggestedTitles.map((title, i) => <p onClick={()=> navigate(`/dashboard/bookDetails/${title}`)} className="search-item" key={i}>{title}</p>)
          )}
        </div>
      </div>
      <div className="books-container">
        {booksElements.length > 0 ? booksElements : <p>No books</p>}
      </div>
    </div>
  );
}

export default DashBoard;
