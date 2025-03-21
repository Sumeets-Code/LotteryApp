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

        // Creatinga an instance of the contract
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

    const tx = await contract.method.play({ value: ethers.utils.parseEther('0.000000000000000001') }); // 1 wei
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
// Code for the Signing a document.
import { ethers } from "ethers";

function App() {
  // Replace with your Ethereum private key
  const privateKey = "a0ff4c327779b4e320476bd9c75fd734bddfd259109e4512dc41c8a0ad0ba166";
  const message = "This is the document to sign.";

  // Create a wallet instance
  const wallet = new ethers.Wallet(privateKey);

  // Sign the message
  async function signMessage() {
    const signature = await wallet.signMessage(message);
    console.log("Signature:", signature);
  }

  signMessage();
  
  return (
    <div>
      <button onClick={signMessage}>Sign Message</button>
    </div>
  );
}

export default App;
*/