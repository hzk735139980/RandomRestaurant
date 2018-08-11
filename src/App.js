import React, { Component } from 'react';
import { Button, CellsTitle, Form, FormCell, CellBody, TextArea, CellHeader, Checkbox } from 'react-weui';
import logo from './logo.svg';
import './App.css';
import _ from 'lodash';

class App extends Component {

  constructor(props) {
    super(props);

    let localRestaurants = JSON.parse(localStorage.getItem('restaurants'));
    let checkedItems = new Map();
    if (!localRestaurants) {
      localRestaurants = [];
    } else {
      localRestaurants.map(res => {
        return checkedItems.set(res, false);
      })
    }

    this.state = {
      restaurantList: localRestaurants,
      value: '',
      result: '',
      checkedItems: checkedItems
    }
    this.renderList = this.renderList.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRandom = this.handleRandom.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleInput(e) {
    this.setState({ value: e.target.value });
  }

  handleAdd() {
    let input = this.state.value.split(/,|，/);
    let list = this.state.restaurantList;
    let tmp = _.compact(input);
    tmp.map(res => {
      if (!this.state.checkedItems.has(res)) {
        this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(res, false) }));
      }
      return list.push(res);
    });
    let uniqArray = _.uniq(list);
    this.setState({ restaurantList: uniqArray });
    localStorage.setItem('restaurants', JSON.stringify(uniqArray));
  }

  handleDelete() {
    let list = this.state.restaurantList;
    this.state.checkedItems.forEach((value, key, map)=>{
      if(value){ 
        if (list.indexOf(key) !== -1) {
          list.splice(list.indexOf(key), 1);
        }
        this.state.checkedItems.delete(key);
      }
    });
    // let list = this.state.restaurantList;
    // const index = list.indexOf(res);
    // if (index !== -1) {
    //   list.splice(index, 1);
    // }
    // console.log(this.state);
    this.setState({ restaurantList: list });
    localStorage.setItem('restaurants', JSON.stringify(list));
  }

  handleRandom() {
    let list = this.state.restaurantList;
    let rand = list[Math.floor(Math.random() * list.length)];
    this.setState({ result: rand });
  }

  handleChange(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
  }

  renderList() {
    return this.state.restaurantList.map((res, index) =>
      <FormCell checkbox style={{ margin: '0' }} key={index}>
        <CellHeader>
          <Checkbox name={res} checked={this.state.checkedItems.get(res)} onChange={this.handleChange} />
        </CellHeader>
        <CellBody>{res}</CellBody>
      </FormCell>
    )
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Random Restaurant Picker</h1>
        </header>
        <main className="main-body">
          <CellsTitle>Add restaurants that you want:</CellsTitle>
          <Form>
            <FormCell>
              <CellBody>
                <TextArea placeholder="Example: pho, fengming" rows="2" showCounter={false} value={this.state.value} onChange={this.handleInput}></TextArea>
              </CellBody>
            </FormCell>
          </Form>
          <Button type='default' plain style={{ width: '90%', marginTop: '2vw' }} onClick={this.handleAdd}>Add</Button>
          {this.state.restaurantList.length > 0 ?
            <div>
              <CellsTitle>Restaurant:</CellsTitle>
              <Form checkbox>
                {this.renderList()}
              </Form>
              <Button type='default' plain style={{ width: '90%', marginTop: '2vw' }} onClick={this.handleDelete}>Delete Selected Restaurants</Button>
              <Button type='default' plain style={{ width: '90%' }} onClick={this.handleRandom}>Random Pick</Button>
              <h2 style={{ textAlign: 'center' }}>Choice: {this.state.result ? this.state.result : '?'}</h2>
            </div> : ''}
        </main>
      </div>
    );
  }
}

export default App;
