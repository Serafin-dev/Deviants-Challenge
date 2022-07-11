const { ethers } = require("ethers");
// web3 config
const abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "admin_",
				"type": "address"
			},
			{
				"internalType": "uint256[5]",
				"name": "denomsStock_",
				"type": "uint256[5]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256[5]",
				"name": "spent",
				"type": "uint256[5]"
			}
		],
		"name": "StockChanged",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "capitalization",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[5]",
				"name": "spent_",
				"type": "uint256[5]"
			}
		],
		"name": "changeStock",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "convertDenom",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "denoms",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "numberOfDenoms",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "denom",
				"type": "uint256"
			}
		],
		"name": "stock",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
const contractAddress = "0xa4bF486Ae86EF91537BBeD5280D84262CAcF6b62";
const provider = new ethers.providers.Web3Provider(window.ethereum);
const contract = new ethers.Contract(contractAddress, abi, provider);

module.exports = { abi, contractAddress, provider, contract }