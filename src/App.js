import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, ListGroup, ListGroupItem } from 'reactstrap';
import logo from './logo.svg';
import './App.css';
import _ from 'lodash';

class App extends Component {

  constructor(props) {
    super(props);

    let localRestaurants = JSON.parse(localStorage.getItem('restaurants'));
    if(!localRestaurants){
      localRestaurants = [];
    }
    this.state = {
      restaurantList: localRestaurants,
      value: '',
      result: ''
    }
    this.renderList = this.renderList.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRandom = this.handleRandom.bind(this);
  }

  handleInput(e) {
    this.setState({ value: e.target.value });
  }

  handleAdd() {
    let input = this.state.value.split(/,|，/);
    let list = this.state.restaurantList;
    let tmp = _.compact(input);
    tmp.map(res => list.push(res));
    this.setState({ restaurantList: list });
    localStorage.setItem('restaurants', JSON.stringify(list));
  }

  handleDelete(res) {
    let list = this.state.restaurantList;
    const index = list.indexOf(res);
    if (index !== -1) {
      list.splice(index, 1);
    }
    this.setState({ restaurantList: list });
    localStorage.setItem('restaurants', JSON.stringify(list));
  }

  handleRandom() {
    let list = this.state.restaurantList;
    let rand = list[Math.floor(Math.random() * list.length)];
    this.setState({ result: rand });
  }

  renderList() {
    return this.state.restaurantList.map((res, index) =>
      <ListGroupItem key={index} onClick={() => { this.handleDelete(res) }}>{res}</ListGroupItem>
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Random Restaurant Picker</h1>
        </header>
        <main className="main-body">
          <Form>
            <FormGroup>
              <Label for="exampleEmail" style={{ float: 'left', marginLeft: '20px' }}>add restaurants that you want:</Label>
              <Input style={{ width: '90%', margin: '0 auto' }} type="text" name="restaurants" placeholder="Example: pho, fengming"
                value={this.state.value} onChange={this.handleInput} />
            </FormGroup>
            <Button className="button" onClick={() => { this.handleAdd() }}>Add</Button>
          </Form>
          {this.state.restaurantList.length > 0 ?
            <div>
              <ListGroup className="list">
                {this.renderList()}
              </ListGroup>
              <Button className="button" onClick={() => { this.handleRandom() }}>Random Pick</Button>
            </div> : ''}
          {this.state.result ? <h2>Choice: {this.state.result}</h2> : ''}
        </main>
      </div>
    );
  }
}

export default App;
