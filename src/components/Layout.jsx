import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

export default function Layout({ children, cart }) {
    return (
        <>
            <header>
                <div>
                    <Link to="/" id="logo">Tickets</Link>

                    <Link to="/shoppingcart">
                        <FontAwesomeIcon icon={faCartShopping} className="icon" />
                        {cart.length > 0 && <span>{cart.length}</span>}
                    </Link>
                </div>
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