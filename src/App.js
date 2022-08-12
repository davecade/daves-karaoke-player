import "./App.scss";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import SearchBarMiu from "./components/SearchBarMui/SearchBarMiu";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

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
            <SearchBarMiu
                fileNames={getSelectedFilesNames()}
                selectedFiles={selectedFiles}
                handleQueue={handleQueue}
            />
            <div className="input-container">
                <Button variant="contained" component="label">
                    Upload File
                    <input
                        hidden
                        className="input-file"
                        type="file"
                        multiple
                        onChange={(e) => {
                            if (e?.target?.files?.length > 0) {
                                setQueue([]);
                                setSelectedFiles([...e.target.files]);
                            }
                        }}
                    />
                </Button>
            </div>
            <div className="buttons-container">
                <Stack spacing={2} direction="row">
                    <Button
                        variant="contained"
                        onClick={() => {
                            if (videoToPlay > 0) {
                                setVideoToPlay(videoToPlay - 1);
                            }
                        }}
                    >
                        Prev
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            if (videoToPlay < selectedFiles?.length - 1) {
                                setVideoToPlay(videoToPlay + 1);
                            }
                        }}
                    >
                        Next
                    </Button>
                </Stack>
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
            </div>
        </div>
    );
}

export default App;
