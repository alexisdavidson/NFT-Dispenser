const { expect } = require("chai")

const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)

describe("NFT", async function() {
    let deployer, addr1, addr2, nft, token
    let teamWallet = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    let whitelist = []

    beforeEach(async function() {
        // Get contract factories
        const NFT = await ethers.getContractFactory("NFT");
        const Token = await ethers.getContractFactory("Token");

        // Get signers
        [deployer, addr1, addr2] = await ethers.getSigners();
        whitelist = [addr1.address, addr2.address]

        const subscriptionId = 473; // mainnet

        // Deploy contracts
        token = await Token.deploy([teamWallet]);
        nft = await NFT.deploy(token.address, subscriptionId);
    });

    describe("Deployment", function() {
        it("Should track name and symbol of the nft collection", async function() {
            expect(await nft.name()).to.equal("Old Farm Man")
            expect(await nft.symbol()).to.equal("OFM")
        })
    })

    describe("Initialize arrays", function() {
        it("Should initialize arrays correctly", async function() {
            await nft.initializeTokens();
            expect(await nft.getAvailableTokensCount()).to.equal(5000);
            
        })
    })

    describe("Minting NFTs", function() {
        it("Should track each minted NFT", async function() {
            // addr1 mints an nft
            // await nft.connect(addr1).mint(1);
            // expect(await nft.totalSupply()).to.equal(1);
            // expect(await nft.balanceOf(addr1.address)).to.equal(1);
            // // addr2 mints 2 nfts
            // await nft.connect(addr2).mint(2);
            // expect(await nft.totalSupply()).to.equal(3);
            // expect(await nft.balanceOf(addr2.address)).to.equal(2);
        })
    })

    describe("URIs", function() {
        it("Should have correct URIs", async function() {
            // await nft.connect(addr2).mint(3);
            // expect(await nft.totalSupply()).to.equal(336);
            
            // //Unknown URIs. When not revealed, it stays the base URI
            // expect(await nft.tokenURI(0)).to.equal(URI + "0.json");
            // expect(await nft.tokenURI(19)).to.equal(URI + "19.json");
            // //Normal URIs
            // expect(await nft.tokenURI(20)).to.equal(URI + "20.json");
            // expect(await nft.tokenURI(334)).to.equal(URI + "334.json");
        })
    })
})