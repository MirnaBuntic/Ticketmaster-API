import { useState, useEffect } from "react"
import EventCard from "./EventCard"
import festivalVideo from "../video/Video uten navn – Laget med Clipchamp (1).mp4"


export default function Home({ attractions }) {
    
    //State-variabel för events som hämtas i ticketmaster api:et
    const [events, setEvents] = useState([]);
    //State-variabel för vald stad, med default Oslo
    const [city, setCity] = useState("Oslo");
    
    const apiKey = '4P5afjX98PHm5yhdSLbee6G9PVKAQGB7'; //Min api nyckel
    //Variabel med listan över städer som brukeren kan välja mellan
    const cities = [
        "Oslo",
        "Stockholm",
        "Berlin",
        "London",
        "Paris"
    ]

    //Asykron funktion för att hämta events från api:et baserat på stad
    const getEvents = async (cityName) => {
        //Chat gpt, samma metod som i app.jsx nr1
        try {
            const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&city=${cityName}&size=10`;
            //Hämtar data och omvandlar till json format
            const response = await fetch(url);
            const data = await response.json();

            //data finns så sparas det i events staten. Använder embedded då ticketmaster ibladn lägger events innanför detta objekt
            if (data._embedded && data._embedded.events) {
                setEvents(data._embedded.events);
            }
        //Catch för att fånga upp fel och meddela detta i konsollen
        } catch (error) {
            console.error("Skjedde noe feil ved fetch av events", error);
        }
    };

    //UseEffect som körs första komponenten renderas eller om city ändras.
    useEffect(() => {
        getEvents(city);
    }, [city]);

    return(
        <>
            <div className="videoContainer">
                        <video
                            className="festival-video"
                            src={festivalVideo}
                            autoPlay
                            loop
                            muted
                            playsInline
                            ref={(video) => {
                                if (video) {
                                    video.playbackRate = 0.7; 
                                }
                            }}
                        />

                    <h1>Opplev sommerens festivaler!</h1>
                </div>

            <div className="home">

                <section aria-label="Festivaler denne sommeren" tabIndex="0">
                    {/*Loopar igenom attractions arrayen och renderar ett eventcard för varje attraktion. prop med attraction skicaks till eventcard*/}
                    <div className="flexFestival">
                        {attractions?.map((attraction) => (
                            <EventCard key={attraction.id} attraction={attraction} />
                        ))}
                    </div>
                    
                </section>

                <section aria-label="Arrangementer i verdens storbyer" tabIndex="0" className="whatsUp"> 
                    <h2>Hva skjer i verdens storbyer?</h2>

                    <div className="buttons" aria-label="Velg en av storbyene for å vise arragementer">
                        {/*Loopar igenom cities arrayen och renderar en knapp för varje city*/}
                        {cities.map((cityName) => (
                            <button key={cityName} onClick={() => setCity(cityName)}>
                                {cityName}
                            </button>
                        ))}
                    </div>

                    <h2 tabIndex= "0" aria-live="polite">Hva skjer i {city}?</h2>
    
                    <div className="whatCity" aria-label={`Arrangementer i ${city}`}>
                        {/*Villkor om events finns så visas de här.*/}
                        {events.length > 0 ? (
                            //Loopar igenom events arrayen och renderar ett eventcard. prop med events skickas till eventcard
                            events.map((event) => (
                                <EventCard key={event.id} attraction={event} showMoreLink={false}/>
                            ))
                        ) : (
                            <div>
                                <p>Ingen events funnet i {city}.</p>
                        </div>
                        )}
                    </div>
                </section>
            </div>
        </>
    )
}