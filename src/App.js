import "./App.scss";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import SearchBar from "./components/SearchBar/SearchBar";

function App() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [playing, setPlaying] = useState(false);
    const [videos, setVideos] = useState([]);
    const [videoToPlay, setVideoToPlay] = useState(0);

    const getSelectedFilesNames = () => {
        const result = selectedFiles.map((file) => {
            return file.name.split(".").join(" ").toLowerCase();
        });

        return result;
    };

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
            <SearchBar files={getSelectedFilesNames()} play={setVideoToPlay} />
            <div className="player-container">
                <div className="list-container">
                    {selectedFiles?.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className="list-item"
                                onClick={() => {
                                    setVideoToPlay(index);
                                }}
                                style={{
                                    backgroundColor:
                                        videoToPlay === index
                                            ? "greenyellow"
                                            : null,
                                    color:
                                        videoToPlay === index ? "black" : null,
                                }}
                            >
                                {item.name}
                            </div>
                        );
                    })}
                </div>
                <ReactPlayer
                    controls
                    playing={playing}
                    url={videos[videoToPlay]}
                    onEnded={() => setVideoToPlay(videoToPlay + 1)}
                    style={{ backgroundColor: playing ? null : "black" }}
                />
            </div>
            <input
                className="input-file"
                type="file"
                multiple
                onChange={(e) => {
                    setSelectedFiles([...e.target.files]);
                }}
            />
            <div className="buttons-container">
                <button
                    onClick={() => {
                        if (videoToPlay > 0) {
                            setVideoToPlay(videoToPlay - 1);
                        }
                    }}
                >
                    Prev
                </button>
                <button
                    onClick={() => {
                        if (videoToPlay < selectedFiles?.length - 1) {
                            setVideoToPlay(videoToPlay + 1);
                        }
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default App;
