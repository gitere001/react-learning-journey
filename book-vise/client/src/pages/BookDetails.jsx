import React from "react";
import books from "../data/books";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "../styles/BookDetails.css";

function BookDetails() {
  const navigate = useNavigate();
  const { bookTitle } = useParams();
  const book = books.find(
    (book) => book.title.toLowerCase() === bookTitle.toLowerCase()
  );

  const { title, cover, genre, author, description } = book;
  return (
    <article className="bookDetails-container">
      <ArrowLeft
        size={30}
        className="back-btn"
        onClick={() => navigate("/dashboard")}
      />

      <div className="book-detail-card">
        <div className="book-card__cover">
          <img src={cover} alt={title} />
        </div>
        <div className="book-card__content">
          <div className="book-card__genre">{genre}</div>
          <h2 className="book-card__title">{title}</h2>
          <p className="book-card__author">by {author}</p>
          <p className="book-card__description">{description}</p>
        </div>
      </div>
    </article>
  );
}

export default BookDetails;
