import React, { useState } from "react";

export default function SearchBox(props) {
  const [query, setQuery] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search?q=${query}`);
  };
  return (
    <div>
      <form className="search_bar" onSubmit={submitHandler}>
        <div className="row">
          <input
            type="text"
            name="query"
            id="query"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="primary" type="submit">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </form>
    </div>
  );
}
