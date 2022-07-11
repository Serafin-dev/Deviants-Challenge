// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Denoms{
    event StockChanged(uint256[5] spent);

    address private admin;
    uint256[5] public denoms = [100, 50, 20, 5, 1];
    
    mapping (uint256 => uint256) _stock;
    
    // 0x75FCE093358474B56cfDeBA7FF798B6Bc014fCda,[20, 2, 2, 5, 50]
    constructor(address admin_, uint256[5] memory denomsStock_){
        admin = admin_;
        for (uint256 i=0; i < denoms.length; i++){
            _stock[denoms[i]] = denomsStock_[i];
        }
    }
    modifier onlyAdmin(){
        require(msg.sender == admin,"You are not the admin and you know it.");
        _;
    }
    function capitalization() public view returns(uint256){
        uint256 cap;
        for (uint256 i=0; i < denoms.length; i++){
            cap += (denoms[i] * _stock[denoms[i]]);
        }
        return cap;
    }
    function changeStock(uint256[5] memory spent_) external onlyAdmin{
        for (uint256 i=0;i < spent_.length; i++){
                require(spent_[i] <= denoms[i], "One number was bigger than available stock. Reverted.");
                _stock[denoms[i]] -= spent_[i];
        }
        emit StockChanged(spent_);
    }
    function convertDenom(uint256 value) public view returns(uint256[] memory){
        require(value > 0, "Value should be bigger than 0");
        require(value <= capitalization(), "Value is bigger than the capitalization");
        
        // compute results
        uint256 n = numberOfDenoms(value);
        uint256[] memory convertion = new uint256[](n);
        uint256 c;
        for (uint256 i = 0; i < denoms.length; i++){
            // check if enough of this denom
            if (_stock[denoms[i]] > 0){
                while (value >= denoms[i]){
                    value -= denoms[i];
                    convertion[c] = denoms[i];
                    c += 1;
                }
            }
        }
        return convertion;
    }
    function numberOfDenoms(uint256 value) public view returns(uint256){
        uint256 count;
        for (uint256 i = 0; i < denoms.length; i++){
            if (_stock[denoms[i]] > 0){
                while (value >= denoms[i]){
                    value -= denoms[i];
                    count += 1;
                }
            }
        }
        return count;
    }
    function stock(uint256 denom) public view returns(uint256){
        return _stock[denom];
    }
}