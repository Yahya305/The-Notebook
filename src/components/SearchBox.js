import React from 'react'
import { useState } from 'react'
import MyEmployee from './Ep'

function Profile() {
  const [text, setText] = useState("Search here...");
  // this.state = {
  //   articles: [],
  //   page: 1,
  //   loading: false,
  //   category: "general",
  // };
  
  const updateVal =(event)=>{
    if (text==='Search here...') {
      console.log("inside if")
      let x = event.target.value[14];
      event.target.value=x;
      setText(event.target.value);
    }
    else{
      console.log("inside else")
      setText(event.target.value);
    }
  }
  const toggleButton= ()=>{
    console.log("button pressed")
    // console.log(MyEmployee.salary)
    return "hello"

  }
  return (
    <>
    <div className="searchbox">
     {/* <textarea  value={text} onChange={updateVal} id="exampleFormControlTextarea1" rows="3"></textarea>
     <button onClick={toggleButton}>Search</button>  */}
     </div>
    </>
  )
}

export default Profile
