import React, { Component } from "react";
import getWeb3, { getGanacheWeb3, Web3 } from "./utils/getWeb3";
import Header from "./components/Header/index.js";
import Footer from "./components/Footer/index.js";
import Hero from "./components/Hero/index.js";
import Web3Info from "./components/Web3Info/index.js";

import { Loader, Button, Card, Input, Heading, Table, Form, Flex, Box, Image } from 'rimble-ui';
import { zeppelinSolidityHotLoaderOptions } from '../config/webpack';

import styles from './App.module.scss';
//import './App.css';


class App extends Component {
  constructor(props) {    
    super(props);

    this.state = {
      /////// Default state
      storageValue: 0,
      web3: null,
      accounts: null,
      route: window.location.pathname.replace("/", ""),
    };

    this.getTestData = this.getTestData.bind(this);
  }



  ///////--------------------- Functions of testFunc ---------------------------  
  getTestData = async () => {
    const { accounts, ticket_registry, web3 } = this.state;

    const response_1 = await ticket_registry.methods.testFunc().send({ from: accounts[0] })
    console.log('=== response of testFunc() function ===', response_1);
  }



  //////////////////////////////////// 
  ///// Ganache
  ////////////////////////////////////
  getGanacheAddresses = async () => {
    if (!this.ganacheProvider) {
      this.ganacheProvider = getGanacheWeb3();
    }
    if (this.ganacheProvider) {
      return await this.ganacheProvider.eth.getAccounts();
    }
    return [];
  }

  componentDidMount = async () => {
    const hotLoaderDisabled = zeppelinSolidityHotLoaderOptions.disabled;
 
    let TicketRegistry = {};
    try {
      TicketRegistry = require("../../build/contracts/TicketRegistry.json"); // Load ABI of contract of TicketRegistry
    } catch (e) {
      console.log(e);
    }

    try {
      const isProd = process.env.NODE_ENV === 'production';
      if (!isProd) {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();
        let ganacheAccounts = [];

        try {
          ganacheAccounts = await this.getGanacheAddresses();
        } catch (e) {
          console.log('Ganache is not running');
        }

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const networkType = await web3.eth.net.getNetworkType();
        const isMetaMask = web3.currentProvider.isMetaMask;
        let balance = accounts.length > 0 ? await web3.eth.getBalance(accounts[0]): web3.utils.toWei('0');
        balance = web3.utils.fromWei(balance, 'ether');

        let instanceTicketRegistry = null;
        let deployedNetwork = null;

        // Create instance of contracts
        if (TicketRegistry.networks) {
          deployedNetwork = TicketRegistry.networks[networkId.toString()];
          if (deployedNetwork) {
            instanceTicketRegistry = new web3.eth.Contract(
              TicketRegistry.abi,
              deployedNetwork && deployedNetwork.address,
            );
            console.log('=== instanceTicketRegistry ===', instanceTicketRegistry);
          }
        }

        if (TicketRegistry) {
          // Set web3, accounts, and contract to the state, and then proceed with an
          // example of interacting with the contract's methods.
          this.setState({ 
            web3, 
            ganacheAccounts, 
            accounts, 
            balance, 
            networkId, 
            networkType, 
            hotLoaderDisabled,
            isMetaMask, 
            ticket_registry: instanceTicketRegistry,
          }, () => {
            this.refreshValues(
              instanceTicketRegistry,
            );
            setInterval(() => {
              this.refreshValues(instanceTicketRegistry);
            }, 5000);
          });
        }
        else {
          this.setState({ web3, ganacheAccounts, accounts, balance, networkId, networkType, hotLoaderDisabled, isMetaMask });
        }
      }
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  refreshValues = (instanceTicketRegistry) => {
    if (instanceTicketRegistry) {
      console.log('refreshValues of instanceTicketRegistry');
    }
  }

  renderLoader() {
    return (
      <div className={styles.loader}>
        <Loader size="80px" color="red" />
        <h3> Loading Web3, accounts, and contract...</h3>
        <p> Unlock your metamask </p>
      </div>
    );
  }

  renderDeployCheck(instructionsKey) {
    return (
      <div className={styles.setup}>
        <div className={styles.notice}>
          Your <b> contracts are not deployed</b> in this network. Two potential reasons: <br />
          <p>
            Maybe you are in the wrong network? Point Metamask to localhost.<br />
            You contract is not deployed. Follow the instructions below.
          </p>
        </div>
      </div>
    );
  }

  renderInstructions() {
    return (
      <div className={styles.wrapper}>
        <Hero />
      </div>
    );
  }

  renderTrustlessPayment() {
    const { ticket_registry } = this.state;

    return (
      <div className={styles.wrapper}>
      {!this.state.web3 && this.renderLoader()}
      {this.state.web3 && 
        !this.state.ticket_registry &&
        this.renderDeployCheck('ticket_registry')
      }
      {this.state.web3 && 
       this.state.ticket_registry && (
        <div className={styles.contracts}>

          <h2>Ticket Registry</h2>

            <div className={styles.widgets}>
              <Card width={'30%'} bg="primary">

                <h4>Ticket Registry / Create Account</h4>

                <Image
                  alt="random unsplash image"
                  borderRadius={8}
                  height="100%"
                  maxWidth='100%'
                />

                <span style={{ padding: "20px" }}></span>

                <br />

                <Button size={'small'} onClick={this.getTestData}> Ticket Registry </Button>
              </Card>
            </div>

        </div>
      )}
      </div>
    );
  }

  render() {
    return (
      <div className={styles.App}>
        <Header />
          {this.state.route === '' && this.renderInstructions()}
          {this.state.route === 'trustless_payment' && this.renderTrustlessPayment()}
        <Footer />
      </div>
    );
  }
}

export default App;
