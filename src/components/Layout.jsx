import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

export default function Layout({ children, cart }) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <>
            <div className="gradient"/>

            <div className="layout">
                <header>
                    <div>
                        <Link to="/" id="logo">Tickets</Link>

                        <Link to="/shoppingcart">
                            <FontAwesomeIcon icon={faCartShopping} className="icon" />
                            {totalItems > 0 && <span>{totalItems}</span>}
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
            </div>
        </>
    )
}