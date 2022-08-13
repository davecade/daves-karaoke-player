import "./App.scss";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import NavBar from "./components/NavBar/NavBar";

function App() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [playing, setPlaying] = useState(false);
    const [videoToPlay, setVideoToPlay] = useState(0);
    const [queue, setQueue] = useState([]);

    const getSelectedFilesNames = () => {
        const result = selectedFiles.map((file) => {
            return file.name.split(".").join(" ").toLowerCase();
        });

        return result;
    };

    useEffect(() => {
        if (queue?.length === 1) {
            setVideoToPlay(0);
        } else if (videoToPlay >= queue?.length) {
            setVideoToPlay(queue?.length - 1);
        }
    }, [queue, videoToPlay]);

    useEffect(() => {
        if (queue?.length > 0) {
            setPlaying(true);
        } else {
            setPlaying(false);
        }
    }, [queue]);

    const handleQueue = (item) => {
        if (queue?.length > 0) {
            // check if the item exists in the queue
            const index = queue.findIndex((itemInQ) => {
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
            <NavBar
                getSelectedFilesNames={getSelectedFilesNames}
                selectedFiles={selectedFiles}
                setSelectedFiles={setSelectedFiles}
                setQueue={setQueue}
                handleQueue={handleQueue}
                videoToPlay={videoToPlay}
                setVideoToPlay={setVideoToPlay}
            />
            <div className="content-container">
                <div className="player-queue">
                    <div className="react-player-container">
                        <ReactPlayer
                            className={"react-player"}
                            controls
                            playing={playing}
                            url={queue[videoToPlay]?.src}
                            onEnded={() => setVideoToPlay(videoToPlay + 1)}
                            style={{
                                backgroundColor: playing ? null : "black",
                            }}
                        />
                    </div>
                    <div className="list-container">
                        {queue.map((itemInQ, index) => (
                            <div
                                key={index}
                                className="list-item"
                                style={{
                                    backgroundColor:
                                        videoToPlay === index
                                            ? "#454561"
                                            : null,
                                    color:
                                        videoToPlay === index ? "white" : null,
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
                                <div
                                    key={index}
                                    className="list-item"
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
                                    <p
                                        style={{
                                            color: (() => {
                                                const index = queue.findIndex(
                                                    (itemInQ) => {
                                                        return (
                                                            itemInQ.name ===
                                                            item.name
                                                        );
                                                    }
                                                );

                                                return index >= 0
                                                    ? "black"
                                                    : "";
                                            })(),
                                        }}
                                    >
                                        {item.name}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
