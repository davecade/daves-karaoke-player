import React, {useState, useEffect, useCallback} from 'react'
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';


const SearchBarMiu = ({ fileNames, handleQueue, selectedFiles }) => {

  const [ userSearch, setUserSearch ] = useState("")
  const [ notFound, setNotFound ] = useState(false)

  const playVideo = useCallback(() => {
      const index = fileNames.findIndex( file => file.includes(userSearch))

      if(index >= 0){
          setNotFound(false)
          handleQueue(selectedFiles[index])
      } else {
          setNotFound(true)
      }
  }, [handleQueue, fileNames, userSearch])

  const downHandler = useCallback((e) => {
      if(e.key === 'Enter'){
          playVideo()
      }
  }, [playVideo]);

  useEffect(() => {
      window.addEventListener("keydown", downHandler);
      return () => {
        window.removeEventListener("keydown", downHandler);
      };
    }, [userSearch, downHandler]);

  return (
    <>
      <Box
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Search" variant='outlined' style={{outlineColor: "green"}} onChange={(e) =>{
              setUserSearch(e.target.value.toLowerCase())
          }} />
      </Box>
      <div>{notFound ? "Not Found" : ""}</div>
       <button onClick={playVideo}>Submit</button>
    </>
  );
}

export default SearchBarMiu