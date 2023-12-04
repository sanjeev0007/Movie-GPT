import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addnowPlayingMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/Constants";


const useNowPlayingMovies=()=>{
    const dispatch = useDispatch();
    const getNowPlaying= async ()=>{
    const data= await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', API_OPTIONS);
    const json= await data.json();
    console.log(json);
    dispatch(addnowPlayingMovies(json.results));

  }
  useEffect(()=>{
    getNowPlaying();
  },[])
}

export default useNowPlayingMovies;