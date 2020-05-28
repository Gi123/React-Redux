import React from 'react';
import {Table, Button, Modal} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@y0c/react-datepicker/assets/styles/calendar.scss';
import AboutBlock from  './AboutBlock.js'
import StartOrExtend from "./StartOrExtendBlock.js";
import ok from "./d863f5e26ea17ffb64a786669a9832b6.jpg"
import cross from "./icons-PNG-nisanboard (165).png"
import logo from "./logo192.png"
import Sort from './SortBy'
var connect = require("react-redux").connect;
var actions = require("../actions/actions");

class TableDate extends React.Component{
constructor(props) {
    super(props);
    this.state={
        colums:[
            {
                label: 'Псевдоним блока',
                sort: 'name',
            },{
                label: 'Дата активности',
                sort: 'statusdate',
            },{
                label: 'Дата создания',
                sort: 'datecreate',
            },
        ],
        modalAboutShow:false,
        modalStartShow:false,
        reserv:false,
        checkbox:false,
        editItem:[],
    };
    this.selectall=this.selectall.bind(this)
}
    selectall() {
        var temp = document.getElementsByName("tableckeckbox")
        var select = false;
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].checked == false)
                select = true;
        }
        for (let i = 0; i < temp.length; i++) {
            if (select == true) {
                temp[i].checked = true
                this.setState({checkbox:true})
            } else {
                temp[i].checked = false;
                this.setState({checkbox:false})
            }
        }
    }
     arraySort(condition) {
         var temp=!this.state.reserv
         this.setState({reserv:temp})
         var table=Sort(this.props.items,condition)
         if(!this.state.reserv) table.reverse();
         console.log(table);
         console.log(this.state.reserv)
         for (let i=0;i<this.props.items.length;i++)
         {
             this.props.items[i]=table[i];
         }
    }
    render() {
    return (
        <>
            <Table id="table" className="table" style={{ cursor: "pointer" }}>
                <thead>
                {
                    console.log(this.props)
                }
                <tr>
                    <th><input type="checkbox" defaultChecked={this.state.checkbox} onChange={this.selectall}/></th>
                    {this.state.colums.map((element,index) =>
                        <th
                            key={index}
                            onClick={()=> this.arraySort(element.sort)}
                        >
                            {element.label}
                        </th>
                    )}
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {this.props.items.map(item => (
                    <tr
                        key={item.id}
                    >
                        <td><input id={item.id} name="tableckeckbox" type="checkbox"/></td>
                        <td>{item.name}</td>
                        <td> <img src={item.status ==true? ok: cross} height="10px" width="10px"/> {item.status ==true? item.statusdate: 'Не активен'}</td>
                        <td>{item.datecreate}</td>
                        <td><a href="#" onClick={() => this.setState({modalAboutShow:true, editItem:item})}>Подробнее</a>&nbsp;
                            <a  href="#" onClick={() => this.setState({modalStartShow:true,editItem:item})}>{item.status==true? 'Продлить' : 'Запустить'}</a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <AboutBlock
                item={this.state.editItem}
                show={this.state.modalAboutShow}
                onHide={() => this.setState({modalAboutShow:false})}
            />
            <StartOrExtend
                item={this.state.editItem}
                show={this.state.modalStartShow}
                onHide={() => this.setState({modalStartShow:false})}
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

//module.exports = connect(mapStateToProps, actions)(TableDate);

export default connect(mapStateToProps, actions)(TableDate);