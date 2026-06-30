import React, { useState } from 'react'
import  './Addproduct.css'
import upload_area from '../../assets/upload_area.svg'

const initialDetails = {
  name: '',
  image: '',
  category: "Women",
  new_price: '',
  old_price: '',
};

const Addproduct = () => {

  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState(initialDetails);
  const [statusMsg, setStatusMsg] = useState('');
  const [isError, setIsError] = useState(false);

  const imageHandler = (e) => {
    setImage(e.target.files[0])
  }

  const changeHandler = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value
    })
  }

  const resetForm = () => {
    setProductDetails(initialDetails);
    setImage(null);
    // clear the file input visually
    const fileInput = document.getElementById('file-input');
    if (fileInput) fileInput.value = '';
  };

  const Add_product = async () => {
    setStatusMsg('');
    if (!image) {
      setIsError(true);
      setStatusMsg('Please select a product image.');
      return;
    }

    let responseData;
    let product = { ...productDetails };
    let formData = new FormData();
    formData.append('product', image);

    await fetch('http://localhost:4000/upload', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: formData,
    }).then((response) => response.json()).then((data) => {
      responseData = data;
    });

    if (responseData.success) {
      product.image = responseData.image_url;
      await fetch('http://localhost:4000/addproduct', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      }).then((response) => response.json()).then((data) => {
        if (data.success) {
          setIsError(false);
          setStatusMsg('Product added successfully!');
          resetForm();
        } else {
          setIsError(true);
          setStatusMsg('Failed to add product. Please try again.');
        }
      });
    } else {
      setIsError(true);
      setStatusMsg('Image upload failed. Please try again.');
    }
  }

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder="Enter product title" />

      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Product Price</p>
          <input value={productDetails.new_price} onChange={changeHandler} type="number" name="new_price" placeholder="Enter product price" />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer price</p>
          <input value={productDetails.old_price} onChange={changeHandler} type="number" name="old_price" placeholder="Enter offer price" />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product category</p>
        <select value={productDetails.category} onChange={changeHandler} name="category" className="add-product-selector">
          <option value="Women">Women</option>
          <option value="Men">Men</option>
          <option value="Kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
          <label htmlFor="file-input">
          <img src={image ? URL.createObjectURL(image) : upload_area} className="addproduct_thumbnail-img" alt="Product Image" />
          </label>
          <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
      </div>
      <button onClick={Add_product} className="addproduct-btn">Add Product</button>
      {statusMsg && (
        <p style={{ marginTop: '12px', fontWeight: '600', color: isError ? '#e74c3c' : '#27ae60' }}>
          {statusMsg}
        </p>
      )}
    </div>
  )
}

export default Addproduct

