# immoDApp

### Installation:
  - [NodeJS 9.10](https://nodejs.org/en/download/)
  
  - [Truffle](https://trufflesuite.com/docs/truffle/getting-started/installation/) (Framework for Ethereum Smarts Contracts)
      - ```$ npm install --g truffle@5.1.39```
      
  - [Ganache](https://trufflesuite.com/ganache/) (Ganache is used to set up a personal Ethereum BlockChain to test your Solidity contracts. It provides more functionality than Remix)
  
  - [Metamask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=fr) (browser extension)
  
  - Open Ganache (in QuickStart) and Configure Ganache on Metamask
      - You can import a Ganache account into your Metamask wallet and make transactions.
      - <img src="https://user-images.githubusercontent.com/42827342/163242456-3b878c60-624c-4f53-b2e1-deb1d529cfd6.png" width="350" height="350" />  
       <br />
         1. Give the name of your choice and indicate the Http URL of Ganache RPC. <br />
         2. This will connect your Metamask to Ganache. Initially your balance will be 0 ether. You must import your Ganache account. <br />
         3. Open your accounts by clicking in the upper right corner of your Metamask and select Import Account. <br />
       <br />
      - <img src="https://user-images.githubusercontent.com/42827342/163244827-d941a843-fcef-499e-9def-7bc625a11845.png" width="250" height="250" />  
      <br />
      - 4. You must provide your private key for your account in Ganache. Open Ganache and click on View Keys for any of your accounts, which will display your account address and your private key. Copy the private key and paste it into the metamask. <br />
      <br />
      - <img src="https://user-images.githubusercontent.com/42827342/163245590-5540a21b-c1e9-4493-9086-7af5267948e6.png" width="900" height="200" />  



  - Command to run: 
      - ```$ npm install ```
<br>

### Start the server:
  - Reset migrations: 
      - ```$ truffle migrate -reset ```
  - Start the server: 
      - ```$ npm run start```

To access the application, you will have to go to: http://localhost:3000/


---

### You are finally on the site!
<br />
<img src="https://user-images.githubusercontent.com/42827342/163246484-cccf794f-c8ea-4ccb-b187-6841669bc22d.png"  />  

<b>To start selling or buying goods, just click on "See our ads".</b>

  - To buy :
      - To buy nothing could be easier, just click on the buy button, a metamask page will open to proceed with the payment.
      - <img src="https://user-images.githubusercontent.com/42827342/163247316-ea9da84d-fb88-4f9b-a5f2-0a6a02f84a41.png"  />  


  - Sell :
      - To sell your property, simply fill in the various elements of the fields and publish by pressing "Upload!"
      - <img src="https://user-images.githubusercontent.com/42827342/163247508-dfd16197-e81a-45c5-bf50-ed5b17d1aa50.png"  />  





