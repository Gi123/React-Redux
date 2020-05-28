import React from 'react';
import {Button, Modal} from "react-bootstrap";
import {RangeDatePicker} from "@y0c/react-datepicker";
import logo from './logo192.png'

function AboutBlock(props) {
    const onChange = title => (...args) => console.log(title, args);
    const changeName = () => (...args) => props.item.name=args
    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Рекламный блок
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="form-group">
                        <label htmlFor="recipient-name" className="col-form-label">Псевдоним блока:</label>
                        <input type="text" className="form-control" id="recipient-name" onChange={changeName()} placeholder="Псевдоним" value={props.item.name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="recipient-name" className="col-form-label">Срок размещения:</label>
                        <RangeDatePicker initialStartDate={props.item.status==true? props.item.datecreate: new Date()} initialEndDate={props.item.status==true? props.item.statusdate:RangeDatePicker.end} className="d-block" onChange={onChange("Range DatePicker")} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="logo" className="col-form-label">Изображение блока</label>
                        <img name="logo" src={logo} height="100" width="100" className="d-block"/>
                        <Button variant="primary">Предпросмотр</Button>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={props.onHide}>Подвердить</Button>
                <Button variant="secondary" onClick={props.onHide}>Отмена</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AboutBlock;