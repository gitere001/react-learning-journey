import React from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function BookCard({ cover, title, author }) {
  const navigate = useNavigate()
  return (

    <div className="book-card">
      <img src={cover} alt={title} />

      <article className="book-card-info">
        <p className="book-card-title">{title}</p>
        <p className="book-card-author">by {author}</p>
        <button onClick={() => navigate(`/dashboard/bookDetails/${title}`)} className="book-card-btn">View Details
          <ChevronRight/>
        </button>
      </article>
    </div>
  );
}

export default BookCard;
