import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';
import { ProductContext } from './contexts/ProductContext';
import { CartContext } from './contexts/CartContext';

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useState([]);

	const addItem = item => {
		// add the given item to the cart
		setCart([...cart, item])
	};

	const removeItem = item => {
		const itemToBeRemoved = cart.find(id => item === id.id)
		const cartCopy = [...cart]
		const newCart = cartCopy.indexOf(itemToBeRemoved) === 0 ? cartCopy.splice(cartCopy.indexOf(itemToBeRemoved), 1) : cartCopy.splice(cartCopy.indexOf(itemToBeRemoved), cartCopy.indexOf(itemToBeRemoved))
		setCart(cartCopy)
	}

	return (
		<div className="App">
			<Navigation cart={cart} />

			<ProductContext.Provider value={{ products, addItem }}>
				<CartContext.Provider value={{ cart, removeItem }}>
					{/* Routes */}
					<Route exact path="/">
						<Products />
					</Route>

					<Route path="/cart">
						<ShoppingCart />
					</Route>
				</CartContext.Provider>
			</ProductContext.Provider>
		</div>
	);
}

export default App;
