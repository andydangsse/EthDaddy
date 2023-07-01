// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ETHDaddy is ERC721 {
    uint256 maxSupply;
    address public owner;

    struct Domain {
        string name;
        uint256 cost;
        bool isOwned;
    }

    mapping(uint256 => Domain) public domains;
    
    constructor(string memory _name, string memory _symbol) 
        ERC721 (_name, _symbol)
    {
        owner = msg.sender;
    }

    function list(string memory _name, uint256 _cost) public {
        require(msg.sender == owner, "must be owner");
        maxSupply++;
        domains[maxSupply] = Domain(_name, _cost, false);
    }


}