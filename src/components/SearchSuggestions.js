import React from 'react'

function SearchSuggestions(props) {
  return (
    <div className='searchresults'>{props.searchItem[0]===undefined ? <div> loading</div> : <div>{props.searchItem.map((data,key)=>(<div key={key} className='searchItem'><a className='searchItemTitle' href='/' target={"_blank"}>{data.title}</a><p className='searchItemDesc'>{data.desc}</p></div>))}</div>}</div> 
  )
}

export default SearchSuggestions
