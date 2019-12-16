# WalletConnect Ticket🎫🎟dApp

***
## 【Introduction of WalletConnect Ticket dApp】
- This dApp is walletConnetct based ticket system
- Attendence can buy Ticket by ERC20.
（This time use demo token od ERC20 only. Demo token is called OceanToken）
- Ticket which attendence bought is issued by signature of WalletConnect. 
（And also, that ticket is issued by timestamp and transaction-hash when attendence buy ticket）
- Attendence can show and display bought and validated ticket when they go through at gate of some events.


&nbsp;

***
## 【Specification of WalletConnect Ticket dApp】
- Number of be able to buy ticket is limited to 100.
- Ticket price is 0.0001 OCEAN which is demo token of ERC20
（And also, OceanToken is demo token of ERC20）
- Ticket which attendence bought is issued by signature of WalletConnect. 
  - However, it has been in progress yet. 
  - Currently, it use value of constant. In future, it replace value of variable of signature of WalletConnec.


&nbsp;

***

## 【Work flow】
1. Admin user publish ticket by pushing button of "Mint" ot "Factory Mint"
2. Attdence buy published ticket by pushing a button of "BuyTicket"
3. Attdence show bought and validated ticket by pushing a button of "ShowTicket"
  （Next time, I will implement to display bought and validated ticket by QR-code of walletConnect）

&nbsp;


***

## 【Setup】
### Setup wallet by using Metamask
1. Add MetaMask to browser (Chrome or FireFox or Opera or Brave)    
https://metamask.io/  


2. Adjust appropriate newwork below 
```
Kovan Test Network

```

&nbsp;


### Setup backend
1. Deploy contracts to Rinkeby Test Network
```
(root directory)

$ npm run migrate:rinkeby
```

&nbsp;


### Setup frontend
1. Execute command below in root directory.
```

$ npm run client
```

2. Access to browser by using link 
```
http://127.0.0.1:3000
```

&nbsp;

***


## 【References】
- Gitcoin    
https://gitcoin.co/issue/WalletConnect/walletconnect-monorepo/204/3767

- WalletConnect Document    
https://docs.walletconnect.org/quick-start/dapps

- WalletConnect Github  
https://github.com/WalletConnect
  - WalletConnect/walletconnect-example-dapp  
   https://github.com/WalletConnect/walletconnect-example-dapp

  - WalletConnect/walletconnect-monorepo  
   https://github.com/WalletConnect/walletconnect-monorepo
