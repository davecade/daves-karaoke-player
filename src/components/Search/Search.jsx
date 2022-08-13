import React, {useState, useEffect, useCallback} from 'react';
import TextField from '@material-ui/core/TextField';
import Stack from '@mui/material/Stack';
import { withStyles } from '@material-ui/core/styles';
import Button from "@mui/material/Button";
import "./Search.scss"

const Search = ({ fileNames, handleQueue, selectedFiles }) => {

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
        submit()
      }
  }, [playVideo]);

  useEffect(() => {
      window.addEventListener("keydown", downHandler);
      return () => {
        window.removeEventListener("keydown", downHandler);
      };
    }, [userSearch, downHandler]);

    const submit = () => {
      playVideo()
      setUserSearch("")
    }

  return (
      <div className="search-container">
          <CssTextField
            label="Search"
            id='searchBar'
            variant={"outlined"}
            value={userSearch}
            InputLabelProps={{
              style: { color: "white"}
            }}
            InputProps={{
              style: { color: "white"},
              type: 'search',
            }}
            onChange={(e) =>{
              setUserSearch(e.target.value.toLowerCase())
            }}
          />
          <Button className='button' variant="contained" component="label" onClick={submit}>Submit</Button>
      </div>
  );
}

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'yellow',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#1976d2',
      },
      '&:hover fieldset': {
        borderColor: '#1976d2',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#1976d2',
      },
    },
  },
})(TextField);

export default Search