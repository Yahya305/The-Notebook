import React,{useContext} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

function SearchSuggestions(props) {
  const navigate  = useNavigate();
  const appContext = useContext(AuthContext);

  return (
    <div className="searchresults">
      {props.searchItem === 201 ? (
        <div>No Matched Results</div>
      ) : (
        <div>
          {props.searchItem.map((data) => {
            const plainTextContent = document.createElement("div");
            plainTextContent.innerHTML = data.description;
            const plainDesc = plainTextContent.innerText.substring(0,35);
            plainTextContent.innerHTML = data.title;
            const plainTitle = plainTextContent.innerText.substring(0,18);
              return(
            <div key={data._id} className="searchItem" onClick={(e) => {
              appContext.setReadBlog(data);
              navigate("/viewblog");
            }}>
              <div className="searchItem__title" href="/" target={"_blank"}>
                <div>
                {plainTitle}
                </div>
                <div id="tags">
                  {data.tags}
                </div>
              </div>
              <div className="searchItem__desc">
                <p>{plainDesc} </p>
                <span>
                  &nbsp;&nbsp;&nbsp;-By&nbsp;
                  {data.author ? data.author : "Unknown Author"}
                </span>
              </div>
            </div>
          )
})}
        </div>
      )}
    </div>
  );
}

export default SearchSuggestions;
