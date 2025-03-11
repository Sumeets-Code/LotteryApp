import React, { useEffect, useState } from "react";
import abi from './contractJson/Lottery.json'; // Import the ABI
import { ethers } from 'ethers';

function LotteryApp() {
  const [account, setAccount] = useState('Not Connected');
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState(0);
  const [winner, setWinner] = useState('');
  const [state, setState] = useState({
    provider: null,
    signer: null,
    lotteryContract: null
  })

  const contractAddress = "0x4f4Db9a161403ad88815E451522336Afc87152eb";
  const contractAbi = abi.abi;
  
  useEffect (() => {
    const template = async () => {

      
      try {
        // MetaMask API
        // const web3 = window.ethereum;
        // const accounts = await web3.eth.getAccounts();
        const {ethereum} = window;
        const account = await ethereum.request({
          method: 'eth_requestAccounts',
        });

        // Set the provider, signer and contract
        setAccount(account);

        const provider = new ethers.BrowserProvider(ethereum);
        const signer = provider.getSigner();
        
        const lotteryContract = new ethers.Contract(
          contractAddress, 
          contractAbi, 
          signer
        );

        setState({provider, signer, lotteryContract});

        const playersList = await lotteryContract._playersList();
        setPlayers(playersList);

        const contractBalance = await lotteryContract.getBalance();
        setBalance(ethers.utils.formatEther(contractBalance));

      } catch (error) {
        alert(error);
      }
    }

    // to get the players
    template();

  },[]);

  const play = async () => {
    const {ethereum} = window;
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    
    const tx = await contract.play({ value: ethers.utils.parseEther('0.000000000000000001') }); // 1 wei
    await tx.wait();
    window.location.reload();
  };

  const pickWinner = async () => {
    const {ethereum} = window;
    const provider = new ethers.BrowserProvider(ethereum);    
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    const tx = await contract.pickWinner();
    await tx.wait();
    const winnerAddress = await contract.Winner();
    setWinner(winnerAddress);
    window.location.reload();
  };


  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center", // Centers horizontally
        alignItems: "center", // Centers vertically
        height: "100vh", 
        width: "100vw"
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(255, 255, 255, 0.89)",
        }}
      >
        
        <h1>Lottery App</h1>
        <p>Connected account: {account}</p>
        <p>Players: {players.length}</p>

        {/* Input for participant name */}
        
        <button
          onClick={play}
          style={{ padding: "10px 20px", fontSize: "16px" }}
        >
          Play
        </button>

        {/* Button to pick a winner */}
        <button
          onClick={pickWinner}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            marginTop: "20px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Pick Winner
        </button> {winner && <p>Winner: {winner}</p>}

      </div>
    </div>
  );
}

export default LotteryApp;


/*
// src/Lottery.js
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import LotteryContract from './LotteryContract.json'; // Import the ABI

const lotteryAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your deployed contract address

const Lottery = () => {
    const [account, setAccount] = useState('');
    const [players, setPlayers] = useState([]);
    const [balance, setBalance] = useState(0);
    const [winner, setWinner] = useState('');

    useEffect(() => {
        const loadBlockchainData = async () => {
            
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            setAccount(address);

            const contract = new ethers.Contract(lotteryAddress, LotteryContract.abi, signer);
            const playersList = await contract._playersList();
            setPlayers(playersList);

            const contractBalance = await contract.getBalance();
            setBalance(ethers.utils.formatEther(contractBalance));
        };

        loadBlockchainData();
    }, []);

    const play = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(lotteryAddress, LotteryContract.abi, signer);
        const tx = await contract.play({ value: ethers.utils.parseEther('0.000000000000000001') }); // 1 wei
        await tx.wait();
        window.location.reload();
    };

    const pickWinner = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(lotteryAddress, LotteryContract.abi, signer);
        const tx = await contract.pickWinner();
        await tx.wait();
        const winnerAddress = await contract.Winner();
        setWinner(winnerAddress);
        window.location.reload();
    };

    return (
        <div>
            <h1>Lottery DApp</h1>
            <p>Account: {account}</p>
            <p>Players: {players.length}</p>
            <p>Contract Balance: {balance} ETH</p>
            <button onClick={play}>Play (1 wei)</button>
            <button onClick={pickWinner}>Pick Winner</button>
            {winner && <p>Winner: {winner}</p>}
        </div>
    );
};

export default Lottery;
*/