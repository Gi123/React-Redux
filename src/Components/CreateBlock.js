import React, {useCallback, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import {RangeDatePicker} from "@y0c/react-datepicker";
import moment from "moment";
var connect = require("react-redux").connect;
var actions = require("../actions/actions");

function timestampdata(ar) {
    moment.locale('ru')
    if (ar) return(moment(ar).format("DD.MM.YYYY"))
}

class FormItemCreate extends React.Component{
    constructor(props) {
        super(props);
        this.state={

        };
        this.saveElement=this.saveElement.bind(this)
    }
    saveElement() {
        if (this.refs.nameItem.value !== "") {
            var item =[];
             item['id']= 3;
             item['name']=this.refs.nameItem.value;
             console.log(this.refs.period);
            if(this.refs.period.state.startValue && this.refs.period.state.endValue) {
                item['status'] = true;
                item['statusdate'] = timestampdata(this.refs.period.state.endValue);
            }
            else
                item['status']=false;
            item['datecreate']=timestampdata(new Date());
            this.props.addItem(item);
            this.props.onHide();
            console.log(item);
        }else
            alert("Введите название рекламного блока!");
    }
    render() {
        return( <Modal
                {...this.props}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    {console.log(this.props)}
                    <Modal.Title id="contained-modal-title-vcenter">
                        Новый рекламный блок
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="recipient-name" className="col-form-label">Псевдоним блока:</label>
                            <input type="text" ref="nameItem" className="form-control" id="recipient-name" placeholder="Псевдоним"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="calendar" className="col-form-label">Срок размещения:</label>
                            <RangeDatePicker ref="period" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cost"  className="col-form-label">Размер блока</label>
                            <p><input type="radio" readOnly value="0"  name="cost"/> Маленький (5 руб.)</p>
                            <p><input type="radio" readOnly value="1"  name="cost"/> Средний (10 руб.)</p>
                            <p><input type="radio" readOnly value="2" checked name="cost"/> Большой (15 руб.)</p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="recipient-name" className="col-form-label">Изображение блока</label>
                            <p><input type="file" name="photo" multiple accept="image/*,image/jpeg">
                            </input>
                            </p>
                        </div>
                        <div className="form-group">
                            <h2>Итого 100 руб.</h2>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={()=>this.saveElement()}>Подвердить</Button>
                    <Button variant="secondary" onClick={this.props.onHide}>Отмена</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
function mapStateToProps(state) {
    return {
        items: state.get("items")
    };
}

export default connect(mapStateToProps, actions)(FormItemCreate);