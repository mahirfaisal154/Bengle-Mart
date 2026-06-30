import {React,useEffect,useState} from 'react'
import './popular.css'
import Item from '../items/Item'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000';

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  useEffect(() => {
    fetch(`${BACKEND_URL}/popularinwomen`)
      .then(response => response.json())
      .then(data => setPopularProducts(data));
  }, []);



  //creating endpointts for popular in cartdata






  return (
    <div className="popular">
      <h1>Popular In Women</h1>
      <hr/>
      <div className="popular-item">
        {popularProducts.map((item,i) => (
          <Item
            key={i}
            id={item.id}
            image={item.image}
            name={item.name}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  )
}

export default Popular
