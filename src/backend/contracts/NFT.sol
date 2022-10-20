// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

contract NFT is ERC721URIStorage, Ownable, VRFConsumerBaseV2 {
    ERC20 public token;
    string public baseUri = "ipfs://QmNPi93oynwoi7NmHmW7ABTgpMfaQtmxKJoxmpXsJHNgGK/";
    string public constant uriSuffix = '.json';
    uint256 public max_supply = 5000;
    uint256 public amountMintPerAccount = 0; // 0 for unlimited
    uint256 public price = 1 ether; // 1 $PORK to play
    uint256[] private availableTokens;
    address[] private redeemedTokens;
    
    //VRF Chainlink **************************************************************************************
    uint64 s_subscriptionId;
    VRFCoordinatorV2Interface COORDINATOR;
    address vrfCoordinator = 0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D; // goerli - Change this depending current blockchain!
    bytes32 keyHash = 0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15; // goerli - Change this depending current blockchain!
    uint32 callbackGasLimit = 200000;
    uint16 requestConfirmations = 3;
    uint32 numWords =  1;
    uint256[] public s_randomWords;
    uint256 public s_requestId;

    address[] private mintersQueue;
    
    event MintRequestSent(address user);
    event MintSuccessful(address user, uint256 tokenId);
    event Redeem(address user, uint256 tokenId);

    constructor(address tokenAddress, address ownerAddress, uint64 subscriptionId) ERC721("Old Farm Man", "PN") VRFConsumerBaseV2(vrfCoordinator) {
        token = ERC20(tokenAddress);

        // Initialize Chainlink Coordinator
        COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
        s_subscriptionId = subscriptionId;

        _transferOwnership(ownerAddress);
    }

    function expendArraysBySize(uint256 _bySize) external onlyOwner {
        uint256 _initialLength = availableTokens.length;
        require(_initialLength + _bySize <= max_supply, "Cannot expend the arrays more than the max_supply");
        
        for(uint i = 1; i <= _bySize; i++) {
            availableTokens.push(_initialLength + i);
            redeemedTokens.push(address(0));
        }
    }

    function tokenURI(uint256 _tokenId) public view virtual override returns (string memory) {
        require(_exists(_tokenId), 'ERC721Metadata: URI query for nonexistent token ');

        string memory currentBaseURI = _baseURI();
        return bytes(currentBaseURI).length > 0
            ? string(abi.encodePacked(currentBaseURI, Strings.toString(_tokenId), uriSuffix))
            : '';
    }

    function approveTokenSpending() external {
        token.approve(msg.sender, 2**256 - 1);
    }

    function mint() external {
        require(availableTokens.length > 0, 'No more tokens available!');
        require(amountMintPerAccount == 0 || balanceOf(msg.sender) < amountMintPerAccount, 'Each address may only mint x NFTs!');

        // Pay tokens
        token.transferFrom(msg.sender, address(this), getPrice());
        
        emit MintRequestSent(msg.sender);

        requestRandomNumberForTokenId(msg.sender);
    }

    function airdropRandom(address user, uint256 _random) public onlyOwner {
        mintRandom(user, _random);
    }

    function mintRandom(address minter, uint256 _random) private {
        uint256 randomIndex = _random % availableTokens.length;
        uint256 resultRandomTokenId = availableTokens[randomIndex];
        availableTokens[randomIndex] = availableTokens[availableTokens.length - 1];
        availableTokens.pop();
        
        _safeMint(minter, resultRandomTokenId);
        emit MintSuccessful(minter, resultRandomTokenId);
    }

    function redeemAndBurn(uint256 _tokenId) external {
        require(msg.sender == ownerOf(_tokenId), "You are not the owner of this token");

        redeemedTokens[_tokenId] = msg.sender;
        _burn(_tokenId);
        
        emit Redeem(msg.sender, _tokenId);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseUri;
    }

    function contractURI() public pure returns (string memory) {
        return "ipfs://QmaYebK3zEfHpfAmvRDvHB5b7MmgRYSecBY69pYfPcat22/";
    }

    function getPrice() view public returns(uint) {
        return price;
    }

    function setPrice(uint _price) public onlyOwner {
        price = _price;
    }

    function setBaseUri(string calldata _baseUri) public onlyOwner {
        baseUri = _baseUri;
    }

    function setAmountMintPerAccount(uint _amountMintPerAccount) public onlyOwner {
        amountMintPerAccount = _amountMintPerAccount;
    }

    function withdraw() public onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }
    
    function requestRandomNumberForTokenId(address _minter) private {
        s_requestId = COORDINATOR.requestRandomWords(
            keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );

        mintersQueue.push(_minter);
    }

    // Callback function when random number from Chainlink is generated
    function fulfillRandomWords(
        uint256, /* requestId */
        uint256[] memory randomWords
    ) internal override {
        require(mintersQueue.length > 0, "No minter in queue");
        s_randomWords = randomWords;
        mintRandom(mintersQueue[mintersQueue.length - 1], s_randomWords[0]);
        mintersQueue.pop();
    }
    
    function getRedeemedTokens() public view returns (address[] memory) {
        return redeemedTokens;
    }

    function getAvailableTokensCount() public view returns (uint256) {
        return availableTokens.length;
    }
}