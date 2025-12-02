import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import Layout from './components/Layout';
import Home from './components/Home';
import EventPage from './components/EventPage';

export default function App() {
  //Variabel för att hämta attractions
  const [attractions, setAttractions] = useState([]);

  const getAttractions = async () => {

  const apiKey = '4P5afjX98PHm5yhdSLbee6G9PVKAQGB7'; //api nyckel

  //Variabeln som håller de id:erna jag vill hämta från api:et
  const attractionId = [
    "K8vZ917_YJf", // Neon
    "K8vZ917bJC7", // Skeikampenfestivalen
    "K8vZ917oWOV" // Tons of Rock
  ]

  try {
    const url = `https://app.ticketmaster.com/discovery/v2/attractions?apikey=${apiKey}&locale=*&id=${attractionId}`;

    //Hämtar data och omvandlar till json format
    const response = await fetch(url);
    const data = await response.json();

    //Om data finns så uppdateras attractions staten med dessa uppgifter.
    //Använder embedded då ticketmaster lägger vissa detaljer innanför detta objekt
    if (data._embedded) {
      setAttractions(data._embedded.attractions)
    }
    
    //Catch för att fånga eventuella fel och meddela detta i konsollen
    } catch (error) {
      console.error("Skjedde noe feil ved fetch")
    }
  }

  useEffect(() => {
    getAttractions();
  }, []);

  return (
    <>
      <Layout>
        <Routes>
          <Route path='/' element={<Home attractions={attractions} />}></Route>
          <Route path='/event/:slug' element={<EventPage attractions={attractions} />}></Route>
        </Routes>
      </Layout>
    </>
  )
}


