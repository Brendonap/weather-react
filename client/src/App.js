import React, { Component } from 'react';

import { 
  Container, 
  Navbar, 
  Row, 
  NavbarBrand, 
  Col, 
  Jumbotron, 
  InputGroup,
  InputGroupAddon, 
  Button,
  FormGroup,
  Input } from 'reactstrap';
import Weather from './weather'
import './index.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weather: null,
      newCityName: '',
      cityList: [],
      cityName: ''
    };
  }

  getCityList = () => {
    fetch('/api/cities')
    .then(res => res.json())
    .then(res => {
      let cityList = res.map(r => r.city_name);
      this.setState({ cityList });
    })
  }

  handleInputchange = (e) => {
      this.setState({
        newCityName: e.target.value
      })
  }

  handleAddCity = () => {
      fetch('api/cities', {
        method: "post",
        headers: {'Content-Type': 'application/Json'},
        body: JSON.stringify({ city: this.state.newCityName })
      })
      .then(res => res.json())
      .then(res => {
        this.getCityList();
        this.setState({ cityName: '' });
      })
  }
  
  getWeather = (city) => {
      fetch(`/api/weather/${city}`)
      .then(res => res.json())
      .then(weather => {
        console.log(weather)
        this.setState({ weather })
      })
  }

  handleChangeCity = (e) => {
      this.getWeather(e.target.value);
  }

  componentDidMount () {
      this.getCityList();
  }

  render() {
    return (
        <Container fluid className="centered">
          <Navbar dark color="dark">
            <NavbarBrand href="/">MyWeather</NavbarBrand>
          </Navbar>
          <Row>
            <Col>
            <Jumbotron>
                <h1 className="display-3">My Weather</h1>
                <p className="lead">Current Weather For Your favourite City</p>
                <InputGroup>
                  <Input 
                    placeholder="New City Name"
                    value={this.state.newCityName}
                    onChange={this.handleInputchange}
                  />
                  <InputGroupAddon addonType="append">
                    <Button colour="primary" onClick={this.handleAddCity}>Add City</Button>
                  </InputGroupAddon>
              </InputGroup>
            </Jumbotron>
            </Col>
          </Row>
          <Row>
            <Col>
              <h1 className="display-5">Current Weather</h1>
              <FormGroup>
                  <Input type="select" onChange={this.handleChangeCity}>
                    { this.state.cityList.length === 0 && <option>No cities added yet.</option> }
                    { this.state.cityList.Length > 0 && <option>select a city</option> }
                    { this.state.cityList.map((city, i) => <option key={i}>{city}</option>)}
                  </Input>
              </FormGroup>
            </Col>
          </Row>
          <Weather data={this.state.weather}/>
        </Container>        
    );
  }
}

export default App;
