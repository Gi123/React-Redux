import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Button, Modal} from "react-bootstrap";
import TableDate from './Components/Table.js'
import CreateBlock from  './Components/CreateBlock.js'
var connect = require("react-redux").connect;
var actions = require("./actions/actions");

//import { AddItem,RemoveItem,DeleteItem } from './actions/actions'



class App extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      modalShow:false,
    };
  }
  render() {
    return (
        <>
          <div className="m-2">
            <div className="row">
              <div className="col-3">
                <h3>Рекламные блоки</h3>
              </div>
              <div className="col-9">
                <Button variant="primary" onClick={() => this.setState({modalShow:true})}>
                  Добавить новый
                </Button>
              </div>
            </div>
            <form>
              <fieldset className="mt-5">
                <div className="row">
                  <div className="col-3">
                    <select className="form-control" id="action">
                      <option value="">Действия</option>
                    </select>
                  </div>
                  <div className="col-7">
                    <Button variant="primary">Выполнить</Button>
                  </div>
                  <div className="col-2">
                    <select className="form-control" id="all">
                      <option value="">Все</option>
                    </select>
                  </div>
                </div>
                <div className="mt-5">
                  <React.Fragment>
                    <TableDate id="table"
                    />
                  </React.Fragment>
                </div>
              </fieldset>
            </form>
          </div>
          <CreateBlock
              show={this.state.modalShow}
              onHide={() => this.setState({modalShow:false})}
          />
        </>
    );
  }
}

function mapStateToProps(state) {
  return {
    items: state.get("items")
  };
}

export default connect(mapStateToProps, actions) (App);
