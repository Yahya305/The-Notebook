import React from "react";

function SearchSuggestions(props) {
  return (
    <div className="searchresults">
      {props.searchItem === 201 ? (
        <div>No Matched Results</div>
      ) : (
        <div>
          {props.searchItem.map((data) => (
            <div key={data._id} className="searchItem">
              <div className="searchItemTitle" href="/" target={"_blank"}>
                <div>
                {data.title}
                </div>
                <div id="tags">
                  {data.tags}
                </div>
              </div>
              <div className="searchItemDesc">
                <p>{data.description} </p>
                <span>
                  &nbsp;&nbsp;&nbsp;-By&nbsp;
                  {data.author ? data.author : "Unknown Author"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchSuggestions;
