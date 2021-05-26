import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemAdmin } from "../../actions/adminActions";
import FileUpload from "../../components/FileUpload";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";

export default function AddItemScreen() {
  const adminAddItem = useSelector((state) => state.adminAddItem);
  const { loading, error } = adminAddItem;

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [shouldUpload, setshouldUpload] = useState(false);

  const submitItem = (e) => {
    e.preventDefault();
    dispatch(
      addItemAdmin(name, category, brand, description, price, stock, image)
    );
    setshouldUpload(true);
  };

  return (
    <div className="admin_area">
      <div>
        <div>
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox variant="danger">{error}</MessageBox>}
        </div>
        <form className="form" onSubmit={submitItem}>
          <div>
            <h1>add item</h1>
          </div>
          <div>
            <label htmlFor="name">name</label>
            <input
              type="text"
              id="name"
              placeholder="enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="category">category</label>
            <input
              type="text"
              id="category"
              placeholder="enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="brand">brand</label>
            <input
              type="text"
              id="brand"
              placeholder="enter brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="description">description</label>
            <input
              type="text"
              id="description"
              placeholder="enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="price">price</label>
            <input
              type="text"
              id="price"
              placeholder="enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="stock">stock</label>
            <input
              type="text"
              id="stock"
              placeholder="enter stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="image">image</label>
            <FileUpload
              setImage={setImage}
              setshouldUpload={setshouldUpload}
              shouldUpload={shouldUpload}
            ></FileUpload>
          </div>
          <div>
            <label />
            <button className="primary" type="submit">
              add item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
