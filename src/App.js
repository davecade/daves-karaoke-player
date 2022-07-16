import "./App.css";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

function App() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [playing, setPlaying] = useState(false);
    const [videos, setVideos] = useState([]);
    const [videoToPlay, setVideoToPlay] = useState(0);

    useEffect(() => {
        if (selectedFiles?.length > 0) {
            const convertedVideos = [];
            for (let i = 0; i < selectedFiles.length; i++) {
                convertedVideos.push(URL.createObjectURL(selectedFiles[i]));
            }
            setVideos(convertedVideos);
            setPlaying(true);
        } else {
            setPlaying(false);
        }
    }, [selectedFiles]);

    return (
        <div className="App">
            <ReactPlayer
                controls
                playing={playing}
                url={videos[videoToPlay]}
                onEnded={() => setVideoToPlay(videoToPlay + 1)}
            />
            <input
                type="file"
                multiple
                onChange={(e) => {
                    setSelectedFiles(e.target.files);
                }}
            />
        </div>
    );
}

export default App;
