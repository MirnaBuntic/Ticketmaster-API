import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";


export default function ShoppingCart({ cart, removeFromCart, addToCart }) {
    return (
        <div className="shoppingcart">
            <h2>Handlekurv</h2>

            {cart.length === 0 && <p>Handlekurven er tom.</p>}

            {cart.map((item, i) => (
                <article className="cart-card" key={item.id}>
                    <h3>{item.name}</h3>
                    {item.image && <img src={item.image} alt={item.name} />}
                    <p>{item.venue}</p>
                    <p>{item.date}</p>

                    {/* quantity-knappar */}
                    <div className="quantity">
                        <button onClick={() => removeFromCart(item.id)}>-</button>
                        <p>Antall: {item.quantity}</p>
                        <button onClick={() => addToCart(item)}>+</button>
                    </div>

                    {/* ta bort helt */}
                    <button 
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Fjern varen"
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </article>
            ))}
        </div>
    )
}