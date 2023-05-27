# Chainlink-bootcamp-day2

This the sample codes for Chainlink 2-day bootcamp day2. In day 2 of the bootcamp, you will use Chainlink Functions to feed data from external API to NFT smart contract you finished in day 1.

# Prerequisite
The NFT smart contract is different from day 1. Redploy the NFT smart contract and make it work with VRFv2Consumer.

# Instructions
- Go to remix and deploy the contracts `NFTDogs.sol` and `VRFv2Consumer.sol` which is saved in the `/contracts` in this repo. 
- Add consumer in vrf subscription and mint an NFT like what we did in day 1. 
- Clone the repository using command `git clone https://github.com/QingyangKong/Chainlink-bootcamp-day2.git`
- Fetch all branches `cd Chainlink-bootcamp-day2` and `git fetch --all`
- Switch to this branch `git checkout advanced`
- Head to directory in your environment
- Install all depedencies using command `npm install`
- Set environment variable for
  - `npx env-enc set-pw` and enter a password
  - `npx env-enc set` add `POLYGONSCAN_API_KEY`, `PRIVATE_KEY` and `POLYGON_MUMBAI_RPC_URL`.
- 2 external data sources:
  - Get free Apikey from [ACCUWeather](https://developer.accuweather.com/), and then upadte the key in the file `API-request-example.js`.
  - The second way to fetch data is through Google big query. In order to use Google big query, you need to create a [google bigquery project](https://console.cloud.google.com/bigquery) on [GCP(google cloud protocol)](https://cloud.google.com/gcp?hl=en)
  - Then create a [google service account](https://console.cloud.google.com/iam-admin/iam) and generate a pair of keys for the account.
  - use `npx env-enc set` add `GOOGLE_PROJECT_ID`, `GOOGLE_ISS` and `GOOGLE_KEY`. 
  - The example for `GOOGLE_PROJECT_ID` is `projectname-id`
  - The example of `GOOGLE_ISS` is `serviceaccount@projectId.iam.gserviceaccount.com`
  - The example of `ISS_KEY` is `-----BEGIN PRIVATE KEY-----\n privkey\n-----END PRIVATE KEY-----\n`. 
  - Because secrets are used in js file executed by DON, we need add a new env variable GITHUB_API_TOKEN
  - use `npx env-enc set` add `GITHUB_API_TOKEN`. 
  - The example of `GITHUB_API_TOKEN` is `github_pat_xxx_xxx`

- Run `npx hardhat functions-deploy-client --network polygonMumbai --verify true` to deploy smart contract `FunctionsConsumer.sol` and get address of smart contract `FunctionsConsumer`.
- Go to polygonscan and find the smart contract just deployed, and call function `setNft` to set NFT address(the nft address we redeployed).
- Run `npx hardhat functions-sub-create --network polygonMumbai --amount 5 --contract <FunctionsConsumer address>` get a subId. (Please note you have to apply for whitelist at https://chainlinkcommunity.typeform.com/requestaccess and the process only takes about 45 seconds)
- Run `npx hardhat functions-request --network polygonMumbai --contract <Functiosn Consumer address> --subid <Functions subId from last step> --gaslimit 300000`

# Tips
This repository is a fork from [starter-kit](https://github.com/smartcontractkit/functions-hardhat-starter-kit/tree/main). Please check the official starter kit to learn more.