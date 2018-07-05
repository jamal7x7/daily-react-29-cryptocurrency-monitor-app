import React, { Component } from 'react'
import '../styles/App.css'

const Header = () => (
  <header className='App-header'>
    <h1 className='App-title'>Cryptocurrency Monitor App!</h1>
  </header>
)

const Items = (props) => (
  <div className=' statistics '>
    <div className="time-menu">
      <div className="time">H</div>
      <div className="time">D</div>
      <div className="time">Y</div>
      <div className="time">M</div>
      <div className="time">Y</div>
      <div className="time">ALL</div>
    </div>
    <div className='graph'>
      Graph
    </div>
    <div className="foot">
      <div className="price">
        <div className="price-main"> {props.currentPrice} </div>
        <div className="price-fraction">.48</div>
        <div className="currency">USD</div>
        <div className="delta">+ 101.21 (1.7%)</div>
      </div>
    </div>
  </div>
)

const Menu = () => (
  <div className='side-bar'>
    <div className='currency-menu'>

      Menu

    </div>
  </div>
)

class CryptoMonitorApp extends Component {
  
  state = {
    currentPrice: 6677
  }

  componentDidMount() {
     
    //const query = 'usd'
    const url = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD' 
    // const url = 'https://api.coinbase.com/v2/prices/spot?currency=' + query 
    // const url = 'https://api.binance.com/api/v1/ticker/24hr'
    
    console.log(url)
    // const url2 = "https://randomuser.me/api/";
    setInterval ( () => {
      
       fetch(url)
          .then(res =>  res.json())
          .then(data => {
            console.log(data.BTC.USD)
  
            this.setState((prevState) => ({
              currentPrice: Math.floor(data.BTC.USD)
            }))
            
          })
          .catch(error => { console.log('Something went wrong!!!', error) })

     } ,100000)
  }

 

  render () {
    return (
      <div 
      className='App-container'>

        <Menu />
        <Items 
          currentPrice={this.state.currentPrice}
        />

      </div>
    )
  }
}

const App = (props) => (
  <div className='App'>
    <Header />
    <CryptoMonitorApp />

  </div>
)

export default App

