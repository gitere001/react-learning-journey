import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,

} from "lucide-react";
import './UserCard.css'

function UserCard({ image, email, name, userName, phone, location, birthday }) {
  return (
    <article className="userCard">
      <div className="image-name">
        <img src={image} alt={name} />
        <div className="name">
          <h3>{name}</h3>
          <p>@ {userName}</p>
        </div>
      </div>
      <main>
        <p>
          <Mail className="details-icon"/>
          {email}
        </p>
        <p>
          <Phone className="details-icon"/>
          {phone}
        </p>
        <p>
          <MapPin className="details-icon"/>
          {location}
        </p>
        <p>
          <Calendar className="details-icon"/>
		  Born {birthday}
        </p>
      </main>
    </article>
  );
}

export default UserCard;
