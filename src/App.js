import "./App.css";
import React from "react";
import ReactPlayer from "react-player";

function App() {
    return (
        <div className="App">
            <ReactPlayer
                controls
                playing
                url="https://www.youtube.com/watch?v=rjPg9JqTxkY"
            />
        </div>
    );
}

export default App;
