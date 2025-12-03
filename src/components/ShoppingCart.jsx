import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";


export default function ShoppingCart({ cart, removeFromCart }) {
    return (
        <div className="shoppingcart">
            <h2>Handlekurv</h2>

            {cart.length === 0 && <p>Handlekurven er tom.</p>}

            {cart.map((item, i) => (
                <article className="cart-card" key={i}>
                    <h3>{item.name}</h3>
                    {item.image && <img src={item.image} alt={item.name} />}
                    <p>{item.venue}</p>
                    <p>{item.date}</p>

                    <button 
                        className="remove-btn" 
                        onClick={() => removeFromCart(i)}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </article>
            ))}
        </div>
    )
}