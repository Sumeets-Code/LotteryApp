import React, { useEffect, useState } from "react";
import abi from './contractJson/Lottery.json';
import {ethers} from 'ethers';

function LotteryApp() {
  // const [participants, setParticipants] = useState([]); // List of participants
  // const [name, setName] = useState(""); // Name of the participant
  // const [winner, setWinner] = useState(""); // Winner of the lottery
  const [state, setState] = useState({
    provider: null,
    signer: null,
    lotteryContract: null
  })
/*
  // Add a participant to the list
  const addParticipant = () => {
    if (name.trim() === "") {
      alert("Name cannot be empty!");
      return;
    }
    setParticipants([...participants, name]);
    setName(""); // Clear the input field
  };

  // Pick a random winner
  const pickWinner = () => {
    if (participants.length === 0) {
      alert("No participants in the lottery!");
      return;
    }
    const randomIndex = Math.floor(Math.random() * participants.length);
    setWinner(participants[randomIndex]);
  };
  */

  const [account, setAccount] = useState("Not Connected");

  useEffect (() => {
    const template = async() => {
      const contractAddress = "0x4f4Db9a161403ad88815E451522336Afc87152eb";
      const contractAbi = abi.abi;

      
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

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        
        const lotteryContract = new ethers.Contract(
          contractAddress, 
          contractAbi, 
          signer
        );

        console.log(lotteryContract);

        useState({provider, signer, lotteryContract});
      } catch (error) {
        alert(error);
      }
    }

    // Use the template function
    template();

  },[]);



  return (
    <div
      style={{
        display: "flex", // Enables Flexbox
        justifyContent: "center", // Centers horizontally
        alignItems: "center", // Centers vertically
        height: "100vh", // Full viewport height
        width: "100vw", // Full viewport width
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
        <p>Enter your name to participate in the lottery!</p>

        {/* Input for participant name */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          style={{ padding: "10px", fontSize: "16px", marginRight: "10px" }}
        />
        <button
          // onClick={con}
          style={{ padding: "10px 20px", fontSize: "16px" }}
        >
          Add Participant
        </button>

        {/* Button to pick a winner */}
        <button
          // onClick={pickWinner}
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
        </button>

      </div>
    </div>
  );
}

export default LotteryApp;
