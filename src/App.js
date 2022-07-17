import "./App.scss";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import SearchBar from "./components/SearchBar/SearchBar";

function App() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [playing, setPlaying] = useState(false);
    const [videos, setVideos] = useState([]);
    const [videoToPlay, setVideoToPlay] = useState(0);
    const [queue, setQueue] = useState([]);

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

    console.log("queue", queue);

    const handleQueue = (item) => {
        if (queue?.length > 0) {
            // check if the item exists in the queue
            const index = queue.findIndex((itemInQ) => {
                console.log("itemInQ.name === item.name", itemInQ.name);
                console.log("item.name", item.name);
                return itemInQ.name === item.name;
            });

            if (index >= 0) {
                const newQueue = queue.filter(
                    (itemInQ) => itemInQ.name !== item.name
                );
                setQueue(newQueue);
            } else {
                setQueue([
                    ...queue,
                    {
                        name: item.name,
                        src: URL.createObjectURL(item),
                    },
                ]);
            }
        } else {
            setQueue([
                {
                    name: item.name,
                    src: URL.createObjectURL(item),
                },
            ]);
        }
    };

    return (
        <div className="App">
            <SearchBar
                fileNames={getSelectedFilesNames()}
                selectedFiles={selectedFiles}
                handleQueue={handleQueue}
            />
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
            <div className="player-queue">
                <ReactPlayer
                    className={"react-player"}
                    controls
                    playing={playing}
                    url={queue[videoToPlay]?.src}
                    onEnded={() => setVideoToPlay(videoToPlay + 1)}
                    style={{ backgroundColor: playing ? null : "black" }}
                />
                <div className="list-container">
                    {queue.map((itemInQ, index) => (
                        <div
                            key={index}
                            className="list-item"
                            style={{
                                backgroundColor:
                                    videoToPlay === index
                                        ? "greenyellow"
                                        : null,
                                color: videoToPlay === index ? "black" : null,
                            }}
                            onClick={() => setVideoToPlay(index)}
                        >
                            {itemInQ.name}
                        </div>
                    ))}
                </div>
            </div>
            <div className="player-container">
                <div className="list-container">
                    {selectedFiles?.map((item, index) => {
                        return (
                            <div key={index} className="list-item">
                                <p>{item.name}</p>
                                <div
                                    className="queue-button"
                                    onClick={() => {
                                        handleQueue(item);
                                    }}
                                    style={{
                                        backgroundColor: (() => {
                                            const index = queue.findIndex(
                                                (itemInQ) => {
                                                    return (
                                                        itemInQ.name ===
                                                        item.name
                                                    );
                                                }
                                            );

                                            return index >= 0 ? "orange" : "";
                                        })(),
                                    }}
                                >
                                    Queue
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="blur"></div>
            </div>
        </div>
    );
}

export default App;
