import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import {
  useGetArtistDetailsQuery,
  useGetTopSongsQuery,
} from '../redux/services/shazam';

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {
    data: artistData,
    isFetching: isFetchingArtistDetails,
    error: artistDataError,
  } = useGetArtistDetailsQuery(artistId);
  const {
    data: songData,
    isFetching: isFetchingTopSongs,
    error: topSongsError,
  } = useGetTopSongsQuery(artistId);

  if (isFetchingArtistDetails || isFetchingTopSongs)
    return <Loader title="Loading artist details..." />;

  if (artistDataError || topSongsError) return <Error />;

  console.log('songData:', songData, 'artistData:', artistData);

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistData?.data[0]} />

      <RelatedSongs
        data={songData.data}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  );
};

export default ArtistDetails;
