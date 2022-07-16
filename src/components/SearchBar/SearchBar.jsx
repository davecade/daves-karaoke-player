import React, {useState, useEffect} from 'react'
import './SearchBar.scss'

const SearchBar = ({ files, play }) => {
    const [ userSearch, setUserSearch ] = useState("")

    useEffect(() => {
        window.addEventListener("keydown", downHandler);
        return () => {
          window.removeEventListener("keydown", downHandler);
        };
      }, [userSearch]);

    const downHandler = (e) => {
        if(e.key === 'Enter'){
            playVideo()
        }
    }

    const playVideo = () => {
        const index = files.findIndex( file => file.includes(userSearch))

        if(index >= 0){
            play(index)
        } else {
            console.log("not found")
        }
    }


  return (
    <div className="search-container">
        <input className='searchbar' type={"search"} onChange={(e) =>{
            setUserSearch(e.target.value.toLowerCase())
        }}/>
        <button onClick={playVideo}>Submit</button>
    </div>
  )
}

export default SearchBar