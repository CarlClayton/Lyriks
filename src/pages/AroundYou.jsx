import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { useGetSongsByCountryQuery } from '../redux/services/shazam';

const AroundYou = () => {
  const [location, setLocation] = useState('');

  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByCountryQuery(
    location.country,
  );

  useEffect(() => {
    axios
      .get(
        `https://geo.ipify.org/api/v2/country?apiKey=${
          import.meta.env.VITE_GEO_API_KEY
        }`,
      )
      .then((res) => setLocation(res?.data?.location))
      //   .then((res) => setCountry(res?.data?.location.country))
      //   .then((res) => setRegion(res?.data?.location.region))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [location]);

  if (isFetching && loading)
    return <Loader title="Loading Songs around you..." />;

  if (error && location !== '') return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around you{' '}
        <span className="font-black">
          {location?.region ? location?.region : location?.country}
        </span>
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.tracks?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default AroundYou;
