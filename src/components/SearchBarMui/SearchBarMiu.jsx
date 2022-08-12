import React, {useState, useEffect, useCallback} from 'react';
import TextField from '@material-ui/core/TextField';
import Stack from '@mui/material/Stack';
import { withStyles } from '@material-ui/core/styles';

const SearchBarMiu = ({ fileNames, handleQueue, selectedFiles }) => {

  const [ userSearch, setUserSearch ] = useState("")
  const [ notFound, setNotFound ] = useState(false)
  const [value, setValue] = useState(null);

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
    <Stack spacing={2} sx={{ width: 300 }} id={"searchbar"}>
        <CssTextField
          label="Search"
          id='searchBar'
          variant={"outlined"}
          InputLabelProps={{
            style: { color: "white"}
          }}
          InputProps={{
            style: { color: "white"},
            type: 'search',
          }}
        />
    </Stack>
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

export default SearchBarMiu