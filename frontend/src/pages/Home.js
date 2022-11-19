import React from 'react';
import HomeHeader from '../components/HomeHeader';
import ScrollToTopButton from '../components/ScrollToTopButton';
import PostFeed from '../components/PostFeed';

function Home() {
  
    return(
      <div>
        <HomeHeader />
        <main className='home-main'>
          <PostFeed />
          <ScrollToTopButton />
        </main>
      </div>
    );
}

export default Home;
