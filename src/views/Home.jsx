import React, { useEffect } from 'react';
import { getData } from '../functions/functions';

const Home = () => {
  useEffect(() => {
    // postData()
    getData()


  }, [])

  return (
    <div>home</div>
  )
}

export default Home;