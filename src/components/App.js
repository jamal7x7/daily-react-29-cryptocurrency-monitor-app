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

      <svg height= '300' width= '700'>
        <polygon points={'50,300 300,' + Number(props.fractionPrice) + ' 650,300'} />
      </svg>
      
    </div>
    <div className="foot">
      <div className="price">
        <div className="price-main"> {props.currentPrice} </div>
        <div className="price-fraction">.{props.fractionPrice} </div>
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
    
    currentPrice: 6677,
    points: []
  }

  updatePrice = (data) => {
    this.setState((prevState) => ({
      currentPrice: Math.trunc(data.BTC.USD),
      fractionPrice: (data.BTC.USD).toFixed(2).split('.')[1]
    }))
    
    console.log(this.state.fractionPrice)
    
  }
  
  addPoint = (data) => {
    this.setState((prevState) => ({
      points: [...prevState.points,(data.BTC.USD)]
    }))
    
    this.state.points.length > 10 && 
      this.setState((prevState) => ({
        points: []
      }))
    console.log(this.state.points)
    
  }

  componentDidMount() {
     
    //const query = 'usd'
    const url = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD' 
    // const url = 'https://api.coinbase.com/v2/prices/spot?currency=' + query 
    // const url = 'https://api.binance.com/api/v1/ticker/24hr'
    // const url = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2018-07-01'
    
    console.log(url)
    
    setInterval ( () => {
      fetch(url)
      .then(res =>  res.json())
      .then(data => {
        this.addPoint(data) 
        this.updatePrice(data)
      })
      .catch(error => { console.log('Something went wrong!!!', error) })

     } ,1000)
  }

 

  render () {
    return (
      <div 
      className='App-container'>

        <Menu />
        <Items 
          currentPrice={this.state.currentPrice}
          fractionPrice={this.state.fractionPrice}
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

