import React from 'react'
import Search from "../Search/Search";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import './NavBar.scss'

const NavBar = ({ selectedFiles, getSelectedFilesNames, setSelectedFiles, handleQueue, setQueue, setVideoToPlay, videoToPlay }) => {
  return (
    <div className='navbar-container'>
            <div className="input-container">
                <Button variant="contained" component="label">
                    Open Files
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
            <Search
                fileNames={getSelectedFilesNames()}
                selectedFiles={selectedFiles}
                handleQueue={handleQueue}
            />
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
    </div>
  )
}

export default NavBar