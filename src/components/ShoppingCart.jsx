import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";


export default function ShoppingCart({ cart, removeFromCart, addToCart, removeCompletely }) {
    return (
        <div className="shoppingcart">
            <h2>Handlekurv</h2>

            {cart.length === 0 && <p>Handlekurven er tom.</p>}

            <section className="cartFlex">
                {cart.map((item, i) => (
                    <article className="cart-card" key={item.id}>
                        <h3>{item.name}</h3>
                        {item.image && <img src={item.image} alt={item.name} />}
                        <p>{item.venue}</p>
                        <p>{item.date}</p>

                        {/* quantity-knappar */}
                        <div className="quantity">
                            <button
                                onClick={() => {
                                    if (item.quantity === 1) {
                                        const ok = window.confirm(`Er du sikker på at du vil fjerne ${item.name} fra handlekurven?`);
                                        if (!ok) return; // avbryt om man trycker nei
                                    }
                                    removeFromCart(item.id); // kör som vanligt
                                }}
                                >
                                -
                                </button>
                            <p>Antall: {item.quantity}</p>
                            <button onClick={() => addToCart(item)}>+</button>
                        </div>

                        {/* ta bort helt */}
                        <button 
                            className="remove-btn"
                            onClick={() => {
                                const ok = window.confirm(`Er du sikker på at du vil fjerne ${item.name} fra handlekurven?`);
                                if (ok) {
                                removeCompletely(item.id);
                                }
                            }}
                            aria-label="Fjern varen"
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </article>
                ))}
            </section>
        </div>
    )
}