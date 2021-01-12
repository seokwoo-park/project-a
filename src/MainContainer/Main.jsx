import React from "react";
import { withRouter } from "react-router-dom";

function Main({ history }) {

  function fileUpLoad(){
    
  }

  return (
    <div className="main">
      <h1>Main Page</h1>
      <form className="main_form">
        <div>
          <input type="text"placeholder="What's on your mind ?"/>
          <div className="main_form_files">
            <label for="files">Photo ➕</label>
            <input id="files" type="file" accept="image/*" style={{visibility:"hidden"}}/>
          </div>
          <button type="submit">Post</button>
        </div>
      </form>
    </div>
  );
}

export default withRouter(Main);
