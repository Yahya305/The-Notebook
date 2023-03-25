import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import SearchSuggestions from "./SearchSuggestions";

function SearchBar() {
  const [clicked, toggleClick] = useState(false);
  const [searchItem, setSearchItem] = useState([]);

  let filterHandle = async (event) => {
    toggleClick(true);
    if (event.target.value) {
      let res = await fetch(
        `http://localhost:5000/api/notes/searchnotes/${event.target.value}`,
        {}
      );
      if (res.status===201) {
        setSearchItem(201);
        setTimeout(()=>{
          toggleClick(false)
        },1000)
      } else {
        res = await res.json();
        setSearchItem(res);
        console.log(res);
      }
    }
  };
  return (
    <div className="searchbox">
      <input
        type="text"
        placeholder="Search Blogs..."
        onChange={filterHandle}
      ></input>
      <SearchIcon
        className="searchicn"
        sx={{ width: 42, height: 49 }}
      ></SearchIcon>
      {clicked ? <SearchSuggestions searchItem={searchItem} /> : null}
    </div>
  );
}

export default SearchBar;
