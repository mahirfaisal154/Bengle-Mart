import {React,useState,useEffect} from 'react'
import './NewCollections.css'
import Item from '../items/Item'

const NewCollections = () => {
  const [newCollections, setNew_Collection] = useState([]);

     useEffect(()=>{
       fetch('http://localhost:4000/newcollection')
         .then(response => response.json())
         .then(data => setNew_Collection(data));
     }, []);
  return (
    <div id="new-collections" className="new-collections">
     <h1>New Collections</h1>
     <hr/>
     <div className="collections">
    {newCollections.map((item,i)=>(
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

export default NewCollections
