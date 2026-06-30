import { useState, useEffect } from 'react'
import './SeeOrders.css'

const SeeOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:4000/allorders')
            .then(res => res.json())
            .then(data => {
                if (data.success) setOrders(data.orders);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <div className="see-orders"><p className="so-loading">Loading orders...</p></div>;

    return (
        <div className="see-orders">
            <h1>Customer Orders</h1>
            {orders.length === 0 ? (
                <p className="so-empty">No orders found.</p>
            ) : (
                orders.map((order, index) => (
                    <div key={index} className="so-order-card">
                        <div className="so-user-info">
                            <div className="so-user-avatar">{order.user.name.charAt(0).toUpperCase()}</div>
                            <div>
                                <p className="so-user-name">{order.user.name}</p>
                                <p className="so-user-email">{order.user.email}</p>
                            </div>
                        </div>

                        <div className="so-items-header">
                            <p>Product</p>
                            <p>Title</p>
                            <p>Category</p>
                            <p>Price</p>
                            <p>Qty</p>
                            <p>Subtotal</p>
                        </div>
                        <hr />

                        {order.items.map((item, i) => (
                            <div key={i} className="so-item-row">
                                <img src={item.product.image} alt={item.product.name} className="so-product-img" />
                                <p className="so-product-name">{item.product.name}</p>
                                <p className="so-product-category">{item.product.category}</p>
                                <p>${item.product.new_price}</p>
                                <p>{item.quantity}</p>
                                <p className="so-subtotal">${item.product.new_price * item.quantity}</p>
                            </div>
                        ))}

                        <div className="so-total">
                            <p>Total: <span>${order.totalCost}</span></p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default SeeOrders;
