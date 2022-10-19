// Before deploy:
// -Fill whitelist addresses with correct data!
// -Team Wallet mainnet: 0x61603b8A09C2Aa8f663B43c22C9ceBeC00FC6FeC
// -Team Wallet rinkeby: 0xA8095a8AB93D7cad255248D1D685D4a9F9eF2621
// -Team Wallet goerli: 

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Fill with correct data and uncomment the correct network before deploy!
  // const teamWallet = "0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc"; // localhost
  // const teamWallet = "0xA8095a8AB93D7cad255248D1D685D4a9F9eF2621"; // rinkeby
  const teamWallet = "0xA8095a8AB93D7cad255248D1D685D4a9F9eF2621"; // goerli
  // const teamWallet = "0x61603b8A09C2Aa8f663B43c22C9ceBeC00FC6FeC"; // mainnet
  
  // Fill with correct data and uncomment the correct network before deploy!
  // const whitelistAddresses = [teamWallet, "0x70997970c51812dc3a010c7d01b50e0d17dc79c8"] // localhost
  // const whitelistAddresses = [teamWallet, "0x1e85F8DAd89e993A2c290B846F48B62B151da8af", "0xCdb34512BD8123110D20852ebEF947275f7fD1Ce", "0x1354075Cd28774e7D952F3Bb786F17959d8C6B61"] // rinkeby
  // const whitelistAddresses = [teamWallet] // goerli
  // const whitelistAddresses = [teamWallet, "0x91bE05C1Ff3D57Ec4683543dbA3cD9507d2e4120", "0x63041d7A90b5C10B80270Ce5D661af0031A5628d", "0x1354075Cd28774e7D952F3Bb786F17959d8C6B61", "0x9447D31a3D6E040e9Ff2b7C848B76431C3EB732E"] // mainnet
  
  const subscriptionId = 4072; // goerli

  const NFT = await ethers.getContractFactory("NFT");
  // const Token = await ethers.getContractFactory("Token");
  // const Dispenser = await ethers.getContractFactory("Dispenser");
  const nft = await NFT.deploy(teamWallet, subscriptionId);
  console.log("NFT contract address", nft.address)
  await nft.initializeArrays();
  console.log("initializeArrays done")
  // const dispenser = await Dispenser.deploy(nft.address);
  // console.log("Dispenser contract address", dispenser.address)
  // const token = await Token.deploy([dispenser.address, teamWallet], [73000000, 149000000]);
  // console.log("Token contract address", token.address)
  // await dispenser.setOwnerAndTokenAddress(teamWallet, token.address);
  // console.log("setOwnerAndTokenAddress call done")
  
  saveFrontendFiles(nft, "NFT");
  // saveFrontendFiles(token, "Token");
  // saveFrontendFiles(dispenser, "Dispenser");

  console.log("Frontend files saved")
}

function saveFrontendFiles(contract, name) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../../frontend/contractsData";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contract.address }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
