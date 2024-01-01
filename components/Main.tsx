'use client'
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import React from 'react'
import InfoModal from './InfoModal';
import Navbar from './Navbar';
import Billboard from './Billboard';
import MovieList from './MovieList';
import useInfoModalStore from '@/hooks/useInfoModalStore';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';


export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);
  
    if (!session) {
      return {
        redirect: {
          destination: '/auth',
          permanent: false,
        }
      }
    }
  
    return {
      props: {}
    }
  }


const Main = () => {
    const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const {isOpen, closeModal} = useInfoModalStore();

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favorites} />
      </div>
    </>
  )
}

export default Main