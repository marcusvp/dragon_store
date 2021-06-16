import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsItem, updateItem } from "../../actions/itemActions";
import { ITEM_DETAILS_RESET } from "../../constants/itemConstants";

export default function EditItemScreen(props) {
  const dispatch = useDispatch();
  const itemId = props.match.params.id;

  const itemDetails = useSelector((state) => state.itemDetails);
  const { item } = itemDetails;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    if (!item || item.id !== itemId) {
      dispatch({ type: ITEM_DETAILS_RESET });
      dispatch(detailsItem(itemId));
    } else {
      setName(item.name);
      setImage(item.image);
      setCategory(item.category);
      setBrand(item.brand);
      setDescription(item.description);
      setPrice(item.price);
      setStock(item.countInStock);
    }
  }, [dispatch, item, itemId]);

  const editItem = (e) => {
    e.preventDefault();
    dispatch(
      updateItem(
        itemId,
        name,
        image,
        category,
        brand,
        description,
        price,
        stock
      )
    );
  };
  return (
    <div className="admin_area">
      <div className="col-1">
        <form className="form" onSubmit={editItem}>
          <div>
            <h1>edit item</h1>
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
            <input
              type="text"
              id="image"
              placeholder="enter image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></input>
          </div>
          <div>
            <label />
            <button className="primary" type="submit">
              update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
