import { Link } from "react-router-dom"

export default function Layout({ children }) {
    return (
        <>
            <header>
                <Link to="/">Tickets</Link>
            </header>

            <main>
                {children}
            </main>

            <footer>
                <p>Alt av eventer, attraksjoner og spillesteder er tilgjengeliggjort og levert av {" "}
                    <a 
                    href= "https://developer.ticketmaster.com/"
                    target="_blank"
                    >Ticketmaster Discovery API</a>
                </p>
            </footer>
        </>
    )
}