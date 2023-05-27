# Chainlink-bootcamp-day2

This the sample codes for Chainlink 2-day bootcamp day2. In day 2 of the bootcamp, you will use Chainlink Functions to feed data from external API to NFT smart contract you finished in day 1.

# Prerequisite
The NFT smart contract is different from day 1. Redploy the NFT smart contract and make it work with VRFv2Consumer.

# Instructions
- Clone the repository using command `git clone https://github.com/QingyangKong/Chainlink-bootcamp-day2.git`
- Head to directory in your environment
- Install all depedencies using command `npm install`
- Set environment variable for
  - `npx env-enc set-pw` and enter a password
  - `npx env-enc set` add `POLYGONSCAN_API_KEY`, `PRIVATE_KEY` and `POLYGON_MUMBAI_RPC_URL`.
- Get free Apikey from [ACCUWeather](https://developer.accuweather.com/), and then upadte the key in the file `API-request-example.js`.
- Run `npx hardhat functions-deploy-client --network polygonMumbai --verify true` to deploy smart contract `FunctionsConsumer.sol` and get address of smart contract `FunctionsConsumer`.
- Go to remix and deploy the contracts `NFTDogs.sol` and `VRFv2Consumer.sol` which is saved in the `/contracts` in the repo and mint. 
- Add consumer in vrf subscription and mint an NFT like what we did in day 1. 
- Go to polygonscan and find the smart contract just deployed, and call function `setNft` to set NFT address.
- Run `npx hardhat functions-sub-create --network polygonMumbai --amount 5 --contract <FunctionsConsumer address>` get a subId. (Please note you have to apply for whitelist at https://chainlinkcommunity.typeform.com/requestaccess and the process only takes about 45 seconds)
- Run `npx hardhat functions-request --network polygonMumbai --contract <Functiosn Consumer address> --subid <Functions subId from last step> --gaslimit 300000`

# Tips
This repository is a fork from [starter-kit](https://github.com/smartcontractkit/functions-hardhat-starter-kit/tree/main). Please check the official starter kit to learn more.