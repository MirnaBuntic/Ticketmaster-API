import { Link } from "react-router-dom";

//Tar emot props från home.jsx
export default function EventCard({ attraction, event, showButtons = true, addToCart, removeFromCart, cart = [] }) {
 
    //If test för att skilja på attraction del och event del
    //Här hade jag lite svårt att skilja på delarana när denna komponent skulle hålla på såpass mycket info.
    //Attraction delen står för hela "förstasidan" på eventpage dvs sommarens festivaler och hva skjer i verdens storbyer
    if (attraction) {

        //Variabel som håller bildens url från attractions objektet
        const imageUrl = attraction.images?.[0]?.url;

        //slug making
        const slug = attraction.name.toLowerCase().replace(/\s+/g, '-');
      
        //Variabler som håller datum, tid och platsinformation
        const eventDate = attraction.dates?.start?.localDate;
        const eventTime = attraction.dates?.start?.localTime;
        const venue = attraction._embedded?.venues?.[0];
        const city = venue?.city?.name;
        const country = venue?.country?.name;
        const venueName = venue?.name;
    
        //Checkar om det är ett event. Denna boolean har jag använt för att skiljer på den översta delen av "förstasidan" på eventpage som innehåller festivalkort,
        //och den nedre delen av sidan som innehåller sektionen med världens events
        const isEvent = Boolean(eventDate && eventTime && city && country);
    
        return (
            <>
                {!isEvent && (
                    <Link to={`/event/${slug}`} aria-label={`Les mer om ${attraction.name}`}>
                        <article className="attractions" aria-label={`Informasjon om attraksjon med navn: ${attraction.name}`} tabIndex="0">
                            {imageUrl && <img src={imageUrl} alt={`Bilde av ${attraction.name}`} />}
                            <h3 tabIndex="0">{attraction.name}</h3>
                            <p>Les mer om {attraction.name}</p>
                        </article>
                    </Link>
                )}
    
                {isEvent && (
                    <article
                        className="events" 
                        aria-label={`Arrangement: ${attraction.name} i ${city}, ${country} på ${venueName}`} 
                        tabIndex="0">
                        {imageUrl && <img src={imageUrl} alt={`Bilde av ${attraction.name}`} />}
                        <h3 tabIndex="0">{attraction.name}</h3> 
                        <p>{eventDate}</p>
                        <p>{eventTime}</p>
                        <p>{country}</p>
                        <p>{city}</p>
                        <p>{venueName ? venueName : "Stedinformasjon vil bli tilgjengelig snart"}</p>
                    </article>       
                )}
            </>
        )
    }

    const itemInCart = event 
      ? cart.find((item) => item.id === event.id)
      : null;
      
    //Denna del visar festivalpassen
    if (event) {

        const itemInCart = cart.find((item) => item.id === event.id)

        return (
            <article className="eventcard" aria-label={`Informasjon om arrangement: ${event.name}`} tabIndex="0">
                {event.image && <img src={event.image} alt={`Bilde av ${event.name}`} />}
                <h3 tabIndex="0">{event.name}</h3>
                <div className="div1">
                    <p>{event.venue}</p>
                    <p>{event.date}</p>
                </div>

                {showButtons && (
                    <div className="buy">
                        {/* Om inte i handlekurven → Kjøp-knapp */}
                        {!itemInCart && (
                            <button
                                onClick={() => addToCart(event)}
                                type="button"
                                aria-label={`Kjøp billetter til ${event.name}`}
                                tabIndex="0"
                            >
                                Kjøp
                            </button>
                        )}

                        {/* Om i handlekurven → + / - och antall */}
                        {itemInCart && (
                            <div className="quantity">
                                <button onClick={() => removeFromCart(event.id)}>-</button>
                                <p>Antall: {itemInCart.quantity}</p>
                                <button onClick={() => addToCart(event)}>+</button>
                            </div>
                        )}
                    </div>
                )}
            </article>
        )
    }

}