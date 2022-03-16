import axios from 'axios'
import React, { useEffect, useState } from 'react'


export default function Home() {
  const [trendingMovies, settrendingMovies] = useState([])
  const [trendingTv, settrendingTv] = useState([])
  const [trendingPeople, settrendingPeople] = useState([])

  async function getTrending(mediaType, callback) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=f1aca93e54807386df3f6972a5c33b50`)
    callback(data.results);
  }
  useEffect(() => {
    getTrending('movie', settrendingMovies);
    getTrending('tv', settrendingTv);
    getTrending('person', settrendingPeople);
  }, []);
  return (
    <>
    <div className="row mb-3">
      <div className="col-md-4 py-3">
        <div className="brdr my-3 w-25"></div>
        <h2 className='h3 my-2'>Trending <br /> Movies <br /> To Watch Now</h2>
        <p className="text-muted">most watched movies by days</p>
        <div className="brdr my-3"></div>
      </div>
      {trendingMovies.map((movie, index) => <div key={index} className="col-md-2">
        <div className="movie text-center">
          <img className='w-100' src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} alt="" />
          <h3 className='h5'>{movie.title}</h3>
        </div>
      </div>)}
    </div>


    <div className="brdr my-4"></div>


    <div className="row mb-3">
      <div className="col-md-4 py-3">
        <div className="brdr my-3 w-25"></div>
        <h2 className='h3 my-2'>Trending <br /> TV <br /> To Watch Now</h2>
        <p className="text-muted">most watched Tv by days</p>
        <div className="brdr my-3"></div>
      </div>
      {trendingTv.map((tv, index) => <div key={index} className="col-md-2">
        <div className="tv text-center">
          <img className='w-100' src={'https://image.tmdb.org/t/p/w500' + tv.poster_path} alt="" />
          <h3 className='h5'>{tv.name}</h3>
        </div>
      </div>)}
    </div>

    <div className="brdr my-4"></div>

    <div className="row mb-3">
      <div className="col-md-4 py-3">
        <div className="brdr my-3 w-25"></div>
        <h2 className='h3 my-2'>Trending <br /> Peple <br /> To Watch Now</h2>
        <p className="text-muted">most watched People by days</p>
        <div className="brdr my-3"></div>
      </div>
      {trendingPeople.map((person, index) => <div key={index} className="col-md-2">
        <div className="person text-center">
          <img className='w-100' src={'https://image.tmdb.org/t/p/w500' + person.profile_path} alt="" />
          <h3 className='h5'>{person.name}</h3>
        </div>
      </div>)}
    </div>
    </>
  )
}
