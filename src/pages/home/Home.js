import { React, useEffect } from 'react';
import Cards from '../../components/cards/Cards'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import Poster from '../../components/poster/Poster'

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div className='bg-white h-screen w-screen flex justify-center items-center'>
      {/* <div className='bg-black text-[white] font-[Quicksand] home'>
        <Navbar />
        <section id="home">
          <Poster />
        </section>
        <section id="events">
          <Cards />
        </section>
        <section id="footer">
          <Footer />
        </section> */}
        <p>Site under maintenance. We will be back soon...</p>
      </div>
    // </div>
  )
}

export default Home