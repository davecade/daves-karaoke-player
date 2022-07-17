import React, {useState, useEffect, useCallback} from 'react'
import './SearchBar.scss'

const SearchBar = ({ fileNames, handleQueue, selectedFiles }) => {
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
    <div className="search-container">
        <input className='searchbar' type={"search"} onChange={(e) =>{
            setUserSearch(e.target.value.toLowerCase())
        }}/>
        <div>{notFound ? "Not Found" : ""}</div>
        <button onClick={playVideo}>Submit</button>
    </div>
  )
}

export default SearchBar