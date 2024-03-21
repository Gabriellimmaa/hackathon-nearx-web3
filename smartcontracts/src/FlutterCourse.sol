// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import "../lib/forge-std/src/utils/Counters.sol";
import "./ERC721.sol";


contract FlutterCourse is ERC721{

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    struct TokenData {
        uint256 expirationDate;
    }

    mapping(uint256 => TokenData) private _tokenData;
    mapping(uint256 => string) private _tokenURIs;
    mapping(address => uint256[]) private _userTokens;


    constructor() ERC721("FlutterCourse", "FLUT", 2000) {
    }

    function mint(address to, uint256 expirationDate, string memory uri) external returns (uint256) {
        uint256 _maxSupply = getMaxSupply();
        require(_maxSupply == 0 || _tokenIds.current() < _maxSupply, "Max supply reached");
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _mint(to, newTokenId);
        _tokenData[newTokenId].expirationDate = expirationDate;
        _tokenURIs[newTokenId] = uri;
        _userTokens[to].push(newTokenId);
        return newTokenId;
    }

    function getQtdAvailableTokens() public view returns (uint256) {
        uint256 _maxSupply = getMaxSupply();
        if(_maxSupply > 0){
            return (_maxSupply - _tokenIds.current());
        }
        return 0;
    }

    function getTokenId(address user) public view returns (uint256[] memory) {
        uint256[] memory tokens = _userTokens[user];
        require(tokens.length > 0, "O usuario nao possui nenhum token");
        return tokens;
    }

    function getExpirationDate(uint256 tokenId) public view returns (uint256) {
        address owner = ownerOf(tokenId);
        require(owner != address(0), "Token does not exist");
        return _tokenData[tokenId].expirationDate;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(bytes(_tokenURIs[tokenId]).length > 0, "Token URI not set");
        return _tokenURIs[tokenId];
    }
}
