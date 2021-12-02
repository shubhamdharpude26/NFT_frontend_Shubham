import React from 'react'
import Hero from './Hero'
import Mint from './Mint'
import { useSelector } from "react-redux";

function Home() {
  const blockchain = useSelector((state) => state.blockchain);
  return (
    <div>
      {blockchain.account === "" || blockchain.smartContract === null ? (
           <Hero /> )
            : (
                <Mint />
              )}
        </div>
    )
}

export default Home