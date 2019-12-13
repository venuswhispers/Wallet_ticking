import React, { Component } from "react";
import { Button, Typography, Grid, TextField } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

// Import json file for artifact
import TicketFactory from "./contracts/TicketFactory.json";
import TicketMarket from "./contracts/TicketMarket.json";
import OceanToken from "./contracts/OceanToken.json";


import getWeb3 from "./utils/getWeb3";

import { theme } from './utils/theme';
import Header from './components/Header';

// WalletConnect
//import WalletConnectInitialize from './components/walletConnect/WalletConnectInitialize.js';

import "./App.css";


const GAS = 500000;
const GAS_PRICE = "20000000000";


class App extends Component {
    constructor(props) {    
        super(props);

        this.state = { 
            web3: null, 
            accounts: null,
            ticket_factory: null        
        };
    }

    componentDidMount = async () => {
        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3();

            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();

            // Get the contract instance.
            const networkId = await web3.eth.net.getId();
            // if (networkId !== 3) {
            //     throw new Error("Select the Ropsten network from your MetaMask plugin");
            // }
            if (networkId == 3) {
                console.log('=== Ropsten testnet ===');
            } else if (networkId == 4) {
                console.log('=== Rinkeby testnet ===');   
            }

            const deployedNetworkTicketFactory = TicketFactory.networks[networkId];

            const deployedNetworkTicketMarket = TicketMarket.networks[networkId];

            const deployedNetworkOceanToken = OceanToken.networks[networkId];


            const ticket_factory = new web3.eth.Contract(
                TicketFactory.abi,
                deployedNetworkTicketFactory && deployedNetworkTicketFactory.address,
            );

            const ticket_market = new web3.eth.Contract(
                TicketMarket.abi,
                deployedNetworkTicketMarket && deployedNetworkTicketMarket.address,
            );

            const ocean_token = new web3.eth.Contract(
                OceanToken.abi,
                deployedNetworkOceanToken && deployedNetworkOceanToken.address,
            );

            this.setState({ 
              web3,
              accounts,
              ticket_factory: ticket_factory,
              ticket_market: ticket_market,
              ocean_token: ocean_token,
              ticket_market_contractAddr: deployedNetworkTicketMarket.address
            });

            window.ethereum.on('accountsChanged', async (accounts) => {
                const newAccounts = await web3.eth.getAccounts();
                this.setState({ accounts: newAccounts });
            });

            // Refresh on-chain data every 1 second
            const component = this;
            async function loopRefresh() {
                await component.refreshState();
                setTimeout(loopRefresh, 1000);
            }
            loopRefresh();

        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
    };


    /***********************************************************************
     * WalletConnect Ticket dApp
     ***********************************************************************/
    refreshState = async () => {
        const { accounts, ticket_factory } = this.state;

        this.setState({});
    }

    handleUpdateFundForm = (name, value) => {
        this.setState({ [name]: value });
    }

    handleFund = async (fundResultString) => {
        const { accounts, ticket_factory } = this.state;
    }

    handleTestFunc = async () => {
        const { accounts, ticket_factory } = this.state;
        try {
            const response = await ticket_factory.methods.testFunc().send({ from: accounts[0] });
            console.log("=== testFunc() ===", response)

            await this.setState({ message: "Success to create beneficiary" });
        }
        catch (error) {
            console.error(error);
            this.setState({ message: "Failed withdrawing" });
        }
    }


    _registerTicketPrice = async() => {
        const { accounts, ticket_factory } = this.state;
        let _adminAddr = accounts[0];
        let _sellingPriceOfTicket = 10000000000000

        const response = await ticket_factory.methods.registerTicketPrice(_adminAddr, _sellingPriceOfTicket).send({ from: accounts[0] });
        console.log("=== registerTicketPrice() ===", response)
    }

    _getTicketPrice = async() => {
        const { accounts, ticket_factory } = this.state;
        let _adminAddr = accounts[0];

        const response = await ticket_factory.methods.getTicketPrice(_adminAddr).call();
        console.log("=== getTicketPrice() ===", response)
    }


    totalSupply = async() => {
        const { accounts, ticket_factory } = this.state;

        const response = await ticket_factory.methods._totalSupply().call();
        console.log("=== _totalSupply() ===", response)
    }

    _mint = async () => {
        const { accounts, ticket_factory } = this.state;

        const response = await ticket_factory.methods.mint().send({ from: accounts[0] });
        console.log("=== mint() ===", response)
    }

    _ownerOfTicket = async () => {
        const { accounts, ticket_market } = this.state;
        let _ticketId = 8

        const response = await ticket_market.methods.ownerOfTicket(_ticketId).call();
        console.log("=== ownerOfTicket() ===", response)
    }

    _factoryMint = async () => {
        const { accounts, ticket_market } = this.state;
        let _callAddress = accounts[0]

        const response = await ticket_market.methods.factoryMint(_callAddress).send({ from: accounts[0] });
        console.log("=== factoryMint() ===", response)
    }

    _factoryTicketTransferFrom = async () => {
        const { accounts, ticket_market, ticket_factory, ticket_market_contractAddr } = this.state;
        let _from = accounts[0]                                               // From Address
        let _externalContract = ticket_market_contractAddr                    // External ContractAddress
        let _to = '0x8Fc9d07b1B9542A71C4ba1702Cd230E160af6EB3'                // To Address
        let _ticketId = 6

        // 2Step-Execution
        const response_1 = await ticket_factory.methods._transferTicketFrom(_from, _externalContract, _ticketId).send({ from: accounts[0] });
        const response_2 = await ticket_market.methods.factoryTransferFrom(_externalContract, _to, _ticketId).send({ from: accounts[0] });

        // Log
        console.log("=== _transferTicketFrom() ===", response_1)      
        console.log("=== factoryTransferFrom() ===", response_2)      
    }

    ticketTransferFrom = async () => {
        const { accounts, ticket_factory, ticket_market_contractAddr } = this.state;
        let _from = accounts[0]
        let _to = ticket_market_contractAddr
        let _ticketId = 4

        const response = await ticket_factory.methods._transferTicketFrom(_from, _to, _ticketId).send({ from: accounts[0] });
        console.log("=== _transferTicketFrom() ===", response)
    }



    totalSupplyERC20 = async () => {
        const { accounts, ticket_market } = this.state;
   
        const response = await ticket_market.methods.totalSupplyERC20().call()
        console.log("=== totalSupply() / ERC20 ===", response)
    }


    balanceOfERC20 = async () => {
        const { accounts, ticket_market } = this.state;
   
        const response = await ticket_market.methods.balanceOfERC20(accounts[0]).call()
        console.log("=== balanceOfERC20() ===", response)
    }


    _testTransferFrom = async () => {
        const { accounts, ticket_market, ocean_token, ticket_market_contractAddr } = this.state;
        let _from = accounts[0]                                               // From Address
        let _externalContract = ticket_market_contractAddr                    // External ContractAddress
        let _to = '0x8Fc9d07b1B9542A71C4ba1702Cd230E160af6EB3'                // To Address
        let _value = 10e12

        // 2Step-Execution
        const response_1 = await ocean_token.methods.transferFrom(_from, _externalContract, _value).send({ from: accounts[0] });
        const response_2 = await ticket_market.methods.testTransferFrom(_externalContract, _to, _value).send({ from: accounts[0] });

        // Log
        console.log("=== transferFrom() ===", response_1)
        console.log("=== testTransferFrom() ===", response_2)
    }

    _testTransfer = async () => {
        const { accounts, ticket_market, ocean_token, ticket_market_contractAddr } = this.state;  
        let _from = accounts[0]                                               // From Address
        let _externalContract = ticket_market_contractAddr                    // External ContractAddress
        let _to = '0x8Fc9d07b1B9542A71C4ba1702Cd230E160af6EB3'                // To Address
        let _value = 10e12

        // 2Step-Execution
        const response_1 = await ocean_token.methods.transfer(_externalContract, _value).send({ from: accounts[0] });
        const response_2 = await ticket_market.methods.testTransfer(_to, _value).send({ from: accounts[0] });

        // Log
        console.log("=== transfer() ===", response_1)
        console.log("=== testTransfer() ===", response_2)
    }


    _transferOceanToken = async () => {
        const { accounts, ocean_token } = this.state;
        let _to = '0x8Fc9d07b1B9542A71C4ba1702Cd230E160af6EB3'
        let _value = 10e12

        const response = await ocean_token.methods.transfer(_to, _value).send({ from: accounts[0] });
        console.log("=== transfer() ===", response)
    }


    _transferFromOceanToken = async () => {
        const { accounts, ocean_token } = this.state;
        let _from = accounts[0]
        let _to = '0x8Fc9d07b1B9542A71C4ba1702Cd230E160af6EB3'
        let _value = 10e12

        const response = await ocean_token.methods.transferFrom(_from, _to, _value).send({ from: accounts[0] });
        console.log("=== transferFrom() ===", response)
    }



    _buyTicket = async () => {
        const { accounts, ticket_market, ticket_factory, ocean_token, ticket_market_contractAddr, web3 } = this.state;  
        let _from = accounts[0]                                               // From Address
        let _externalContract = ticket_market_contractAddr                    // External ContractAddress
        let _to = '0x8Fc9d07b1B9542A71C4ba1702Cd230E160af6EB3'                // To Address
        //let _purchasePrice = 10e12
        let _ticketId = 8
        let _adminAddr = accounts[0]

        // Get price of selling ticket
        const ticketPrice = await ticket_factory.methods.getTicketPrice(_adminAddr).call();
        console.log("=== ticketPrice ===", ticketPrice)      

        // Check balace of buyer
        const balanceOfBuyer = await web3.eth.getBalance(accounts[0]);
        balanceOfBuyer = await web3.utils.fromWei(balanceOfBuyer, 'ether');
        console.log("=== balanceOfBuyer ===", balanceOfBuyer)

        // 2Step-Execution
        const response_1 = await ocean_token.methods.transfer(_externalContract, ticketPrice).send({ from: accounts[0] });
        const response_2 = await ticket_market.methods.testTransfer(_to, ticketPrice).send({ from: accounts[0] });
        //const response_1 = await ocean_token.methods.transfer(_externalContract, _purchasePrice).send({ from: accounts[0] });
        //const response_2 = await ticket_market.methods.testTransfer(_to, _purchasePrice).send({ from: accounts[0] });

        // Log
        console.log("=== transfer() ===", response_1)
        console.log("=== testTransfer() ===", response_2)

        // 2Step-Execution
        const response_3 = await ticket_factory.methods._transferTicketFrom(_from, _externalContract, _ticketId).send({ from: accounts[0] });
        const response_4 = await ticket_market.methods.factoryTransferFrom(_externalContract, _to, _ticketId).send({ from: accounts[0] });

        // Log
        console.log("=== _transferTicketFrom() ===", response_3)      
        console.log("=== factoryTransferFrom() ===", response_4)  

        //const response = await ticket_market.methods.buyTicket(_ticketId).send({ from: accounts[0] });
        //console.log("=== buyTicket() ===", response)
    }

    render() {
        if (!this.state.web3) {
            return (
                <ThemeProvider theme={theme}>
                    <div className="App">
                        <Header />
                        <Typography>
                            Loading Web3, accounts, and contract...
                        </Typography>
                    </div>
                </ThemeProvider>
            );
        }
        return (
            <ThemeProvider theme={theme}>
                <div className="App">
                    <Header />
                    <Typography variant="h5" style={{ marginTop: 32 }}>
                        Ticket Registry
                    </Typography>
                    <Typography variant="h5" style={{ marginTop: 32 }}>
                        {this.state.resultMessage}
                    </Typography>


                    <Grid container style={{ marginTop: 32 }}>
                        <Grid item xs={6}>
                            <Typography variant="h5">
                                Test
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h5">
                                Text
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container style={{ marginTop: 32 }}>
                        <Grid item xs={6}>
                            <Typography variant="h5">
                                {"Text"}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="h5">
                                {"test"}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item xs={6}>
                            <Typography variant="h5">
                                {"Text"}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="h5">
                                {"test"}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container style={{ marginTop: 32 }}>
                        <Grid item xs={6}>
                            <Typography variant="h5">
                                {"Text"}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="bet-amount"
                                className="input"
                                value={this.state.fundAmount}
                                onChange={e => this.handleUpdateFundForm('fundAmount', e.target.value)}
                            />
                        </Grid>
                    </Grid>

                    <hr />

                    <Grid container style={{ marginTop: 32 }}>
                        <Grid item xs={6}>
                           test
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={3}>
                            <Button variant="contained" color="primary" onClick={() => this._registerTicketPrice()}>
                               Register Ticket Price
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container style={{ marginTop: 32 }}>
                        <Grid item xs={6}>
                           test
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={3}>
                            <Button variant="contained" color="primary" onClick={() => this._getTicketPrice()}>
                                Get Ticket Price
                            </Button>
                        </Grid>
                    </Grid>

                    <hr />

                    <Grid container style={{ marginTop: 32 }}>
                        <Grid item xs={6}>
                           test
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={3}>
                            <Button variant="contained" color="primary" onClick={() => this.totalSupply()}>
                               Total Supply
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container style={{ marginTop: 32 }}>
                        <Grid item xs={6}>
                            test
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={3}>
                            <Button variant="contained" color="primary" onClick={() => this.handleTestFunc()}>
                                Test Func
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container style={{ marginTop: 32 }}>
                        <Grid item xs={6}>
                            test
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={3}>
                            <Button variant="contained" color="primary" onClick={() => this._mint()}>
                                Mint
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container style={{ marginTop: 32 }}>
                        <Grid item xs={6}>
                            test
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={3}>
                          <Button variant="contained" color="primary" onClick={() => this._ownerOfTicket()}>
                                Owner of ticketId
                          </Button>
                        </Grid>
                    </Grid>

                    <Grid container style={{ marginTop: 32 }}>
                        <Grid item xs={6}>
                            test
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={3}>
                          <Button variant="contained" color="primary" onClick={() => this._factoryMint()}>
                              Factory Mint (ERC721)
                          </Button>
                        </Grid>
                    </Grid>

                    <Grid container style={{ marginTop: 32 }}>
                        <Grid item xs={6}>
                            test
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={3}>
                          <Button variant="contained" color="primary" onClick={() => this._factoryTicketTransferFrom()}>
                              Factory TransferFrom (ERC721)
                          </Button>
                        </Grid>
                    </Grid>

                    <Grid container style={{ marginTop: 32 }}>
                        <Grid item xs={6}>
                            test
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={3}>
                          <Button variant="contained" color="primary" onClick={() => this.ticketTransferFrom()}>
                                Transfer TicketFrom（ERC721）
                          </Button>
                        </Grid>
                    </Grid>

                    <Grid container style={{ marginTop: 32 }}>
                        <Grid item xs={6}>
                            test
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={3}>
                          <Button variant="contained" color="primary" onClick={() => this.totalSupplyERC20()}>
                                Total Supply（ERC20）
                          </Button>
                        </Grid>
                    </Grid>

                    <Grid container style={{ marginTop: 32 }}>
                        <Grid item xs={6}>
                            test
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={3}>
                          <Button variant="contained" color="primary" onClick={() => this.balanceOfERC20()}>
                              Balance Of ERC20
                          </Button>
                        </Grid>
                    </Grid>

                    <Grid container style={{ marginTop: 32 }}>
                        <Grid item xs={6}>
                            test
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={3}>
                          <Button variant="contained" color="primary" onClick={() => this._testTransferFrom()}>
                                Test TransferFrom（ERC20）
                          </Button>
                        </Grid>
                    </Grid>

                    <Grid container style={{ marginTop: 32 }}>
                        <Grid item xs={6}>
                            test
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={3}>
                          <Button variant="contained" color="primary" onClick={() => this._testTransfer()}>
                                Test Transfer（ERC20）
                          </Button>
                        </Grid>
                    </Grid>

                    <Grid container style={{ marginTop: 32 }}>
                        <Grid item xs={6}>
                            test
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={3}>
                          <Button variant="contained" color="primary" onClick={() => this._transferOceanToken()}>
                               Transfer OceanToken（ERC20）
                          </Button>
                        </Grid>
                    </Grid>

                    <Grid container style={{ marginTop: 32 }}>
                        <Grid item xs={6}>
                            test
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={3}>
                          <Button variant="contained" color="primary" onClick={() => this._transferOceanToken()}>
                               TransferFrom OceanToken（ERC20）
                          </Button>
                        </Grid>
                    </Grid>

                    <Grid container style={{ marginTop: 32 }}>
                        <Grid item xs={6}>
                            test
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={3}>
                          <Button variant="contained" color="primary" onClick={() => this._buyTicket()}>
                                Buy Ticket
                          </Button>
                        </Grid>
                    </Grid>
                    <Typography variant="h5" style={{ marginTop: 32 }}>
                        {this.state.message}
                    </Typography>
                </div>
            </ThemeProvider>
        );
    }
}

export default App;
