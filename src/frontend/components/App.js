import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import './App.css';
import Navigation from './Navbar';
import Home from './Home';

import { useState } from 'react'
import { ethers } from 'ethers'
import { Spinner } from 'react-bootstrap'

import NFTAbi from '../contractsData/NFT.json'
import NFTAddress from '../contractsData/NFT-address.json'
import TokenAbi from '../contractsData/Token.json'
import TokenAddress from '../contractsData/Token-address.json'

function App() {
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState(null)
  const [nft, setNFT] = useState({})
  const [token, setToken] = useState({})

  // MetaMask Login/Connect
  const web3Handler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0])

    const provider = new ethers.providers.Web3Provider(window.ethereum)

    const signer = provider.getSigner()

    loadContracts(signer)
  }

  const loadContracts = async (signer) => {
    const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer)
    const token = new ethers.Contract(TokenAddress.address, TokenAbi.abi, signer)

    setNFT(nft)
    setToken(token)
    setLoading(false)
  }

  return (
    <BrowserRouter>
      <div className="App" id="wrapper">
        {/* <Navigation web3Handler={web3Handler} account={account} /> */}
        <Routes>
          <Route path="/" element={
            <Home web3Handler={web3Handler} account={account} nft={nft} token={token} />
          } />
        </Routes>
      </div>
      <div id="warning-message">
        Please use landscape mode!
    </div>
    </BrowserRouter>
  );
}

export default App;
