// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./VRFv2Consumer.sol";

contract NFTDogs is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;

  Counters.Counter private _tokenIdCounter;
  string constant METADATA_SHIBAINU = "ipfs://QmXw7TEAJWKjKifvLE25Z9yjvowWk2NWY3WgnZPUto9XoA";
  string constant METADATA_HUSKY = "ipfs://QmTFXZBmmnSANGRGhRVoahTTVPJyGaWum8D3YicJQmG97m";
  string constant METADATA_BULLDOG = "ipfs://QmSM5h4WseQWATNhFWeCbqCTAGJCZc11Sa1P5gaXk38ybT";
  string constant METADATA_SHIBAINU_cold = "ipfs://QmdjVTLhkLgyDapCdytbrLqhyn35wDqJetcWxj2C2BAFoZ";
  string constant METADATA_SHIBAINU_hot = "ipfs://QmUKfjGZHtGVrRBQ1GMpdHX2USV6SW6LjC4veCngTUamca";

  mapping(uint256 => uint256) requestIdToTokenId;

  // VRF handle
  VRFv2Consumer vrf;

  constructor() ERC721("NFTDogs", "NGS") {}

  function setVrf(address vrfAddr) external onlyOwner {
    vrf = VRFv2Consumer(vrfAddr);
  }

  function safeMint() public {
    uint256 tokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();
    _safeMint(msg.sender, tokenId);
    //send vrf request to get a randomness
    uint256 requestId = vrf.requestRandomWords();
    requestIdToTokenId[requestId] = tokenId;
  }

  function randomnessFulfillment(uint256 requestId, uint256 randomeness) external {
    uint256 tokenId = requestIdToTokenId[requestId];
    if (randomeness % 3 == 0) {
      _setTokenURI(tokenId, METADATA_SHIBAINU);
    } else if (randomeness % 3 == 1) {
      _setTokenURI(tokenId, METADATA_HUSKY);
    } else {
      _setTokenURI(tokenId, METADATA_BULLDOG);
    }
  }

  // update the metadata for tokenId 0
  function updateMetadata(uint256 temp) external {
    if (temp > 15) {
      _setTokenURI(0, METADATA_SHIBAINU_hot);
    } else if (temp == 15) {
      _setTokenURI(0, METADATA_HUSKY);
    } else {
      _setTokenURI(0, METADATA_SHIBAINU_cold);
    }
  }

  // The following functions are overrides required by Solidity.

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId,
    uint256 batchSize
  ) internal override(ERC721, ERC721Enumerable) {
    super._beforeTokenTransfer(from, to, tokenId, batchSize);
  }

  function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
    super._burn(tokenId);
  }

  function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
    return super.tokenURI(tokenId);
  }

  function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
    return super.supportsInterface(interfaceId);
  }
}
