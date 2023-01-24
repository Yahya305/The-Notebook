import React,{useState} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import SearchSuggestions from './SearchSuggestions';

function SearchBar() {
  const[clicked,toggleClick]= useState(false);
  const[searchItem,setSearchItem]= useState([]);

  let abc= ()=>{
    toggleClick(true)
    fetch("http://127.0.0.1:5000/blogs",{
    }).then(
      res => res.json()
    ).then(
      f => setSearchItem(f)
    )
  }
  let filterHandle=(event)=>{
    let wordSearch = event.target.value;
    console.log(wordSearch)
    let newSuggestion = searchItem.filter((value)=>{
      return value.title.toLowerCase().includes(wordSearch.toLowerCase());
    });
    setSearchItem(newSuggestion);
    console.log(newSuggestion.length)
  }
  return (
      <div className='searchbox' onClick={abc}>
        <input type="text" placeholder="Search Blogs..." onChange={filterHandle}></input>
        <SearchIcon className='searchicn' sx={{width: 42,height:49}}></SearchIcon>
        { clicked ? <SearchSuggestions searchItem={searchItem}/> : null }
    </div>
  )
}

export default SearchBar
