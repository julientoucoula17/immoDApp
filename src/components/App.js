import React, { Component } from 'react';
import Web3 from 'web3';
import Identicon from 'identicon.js';
import './App.css';
import ImmoDApp from '../abis/ImmoDApp.json'
import Navbar from './Navbar'
import Main from './Main'
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io',port: 5001, protocol: 'https'})
// HTTPS://ipfs.infura.io/ipfs/QmQGnRzYDaQGGkbMCQ6zVdD49et8MX1upy6fL8yXmh8ueJ


class App extends Component {
  async componentWillMount(){
    await this.loadWeb3()
    await this.loadBlockchainData()
  }
  async loadWeb3(){
    if(window.ethereum){
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3){
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else{
      window.alert('Vous devriez installer MetaMAsk sur votre navigateur!')
    }
  }
  async loadBlockchainData(){
    const web3 = window.web3
    // Load account 
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0]})
    
    //Network id
    const networkId = await web3.eth.net.getId()
    const networkData = ImmoDApp.networks[networkId]
    if(networkData){
      const immodapp = web3.eth.Contract(ImmoDApp.abi, networkData.address)
      this.setState({immodapp})
      const imagesCount = await immodapp.methods.imageCount().call()
      this.setState({imagesCount})

      // Load images
      for(var i = 1; i<= imagesCount; i++){
        const image = await immodapp.methods.images(i).call()
        this.setState({
          images: [...this.state.images, image]
        })
      }
      this.setState({loading: false})

    }else{
      window.alert('Le Contrat ImmoDApp peut pas être déployer sur le réseau détecté.')
    }

  }

  captureFile = event => {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)

    reader.onloadend = () => {
      this.setState({buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }

  uploadImage = description => {
    console.log("Envoie fichier vers IPFS")
    ipfs.add(this.state.buffer, (error, result) => { 
      console.log('Resultat IPFS',result)
      if(error){
        console.log(error)
        return
      }
      this.setState({loading: true})
      this.state.immodapp.methods.uploadImage(result[0].hash, description).send({ from: this.state.account}).on('transactionHash', (hash) =>{
        this.setState({loading: false})
      })
      })
    //})

    }
  
  buyImmoOwner = (id, price) => {
    this.setState({loading: true})
    this.state.immodapp.methods.priceImmoOwner(id).send({ from: this.state.account, value: price}).on('transactionHash', (hash) =>{
      this.setState({loading: false})
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      immodapp: null,
      images: [],
      loading: true
    }
  }


  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Chargement de la Blockchain...</p></div>
          : <Main
            images={this.state.images}
            captureFile={this.captureFile}
            uploadImage={this.uploadImage}
            buyImmoOwner={this.buyImmoOwner}
            />
          }
      
      </div>
    );
  }
}

export default App;
