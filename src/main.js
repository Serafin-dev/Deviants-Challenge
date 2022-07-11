const { ethers } = require("ethers");
const { abi } = require('../config/web3');
const { contract } = require('../config/web3');
const { contractAddress } = require('../config/web3');
const { provider } = require('../config/web3');

// set the config of the DOM
const startDOM = function () {
    document.addEventListener('DOMContentLoaded', function () {
        let connectMetamaskButton = document.querySelector('#connectMetamask');
        connectMetamaskButton.addEventListener('click', function(){
             window.currentAccount = loadAcc();
        });
        // ConvertDenom UI config
        let h3Text = document.querySelector('h3');
        document.querySelector('#convertDenom').onsubmit = function() {  
            let amount = document.querySelector('#amount').value;

            // convert amount 
            convert(amount)
            .then((convertion) => {
                h3Text.innerHTML = convertion;
            })
            .catch((error) => {
                h3Text.innerHTML = error.message;
            })
            return false
        }
        // ChangeStock UI config
        document.querySelector('#changeStock').onsubmit = function() {
            let spentDenoms = document.querySelector('#updates').value;
            spentDenoms = spentDenoms.split(',');
            { 
                // suscribe to event
                contract.once("StockChanged", (spent) => {
                    h3Text.innerHTML = "Stock updated succesfully :" + spent;
                });
                // update stock
                console.log("Updating Stock...")
                try{ 
                    updateStock(spentDenoms)
                    .then(() => {
                        h3Text.innerHTML = "Updating Stock...";
                    })
                    console.log(r);
                } catch(error) {
                    h3Text.innerHTML = error.message;
                }
                return false;
            }
        }
    });  
}
startDOM()
// connect wallet
const loadAcc = async () => {
    //access the user's Ethereum account(s)".
    let connectButton = document.querySelector('#connectMetamask');
    connectButton.disabled = true;
    try{
        const signer = provider.getSigner();
        let currentAccount = await signer.getAddress();
        document.querySelector('h3').innerHTML = "Acc connected :" + currentAccount;
        connectButton.remove();
        // add to
        return currentAccount;
    } catch (error) {
        document.querySelector('h3').innerHtml = "Something went wrong : ", error.message;
        connectButton.disabled = false;
        return "";
    }
}
// convert denom (read the blockchain)
const convert = async (amount) => {
    try {
        let convertion = await contract.convertDenom(amount);
        console.log(convertion)
        return convertion
    } catch (error) {
        console.log(error.message)
        document.querySelector('h3').innerHTML = "Something went wrong :" + error.message;
    }
}
// change stock of nft in the contract (write the blockchain)
const updateStock = async (spentDenoms) => {
    const iface = new ethers.utils.Interface(abi);
    const signer = provider.getSigner();
    try{
        let actualAccount = await signer.getAddress();
        console.log("Current Acc :" + actualAccount)
        const tx = await signer.sendTransaction({
            from: actualAccount,
            to: contractAddress,
            data: iface.encodeFunctionData("changeStock", [spentDenoms]),
        })
        return tx
    } catch (error) {
        console.log(error.message)
        document.querySelector('h3').innerHTML = "Something went wrong with the tx...try again...";
    }
}