var React = require("react");
var connect = require("react-redux").connect;
var actions = require("./actions.jsx");

class TableForm extends React.Component {
    constructor(props) {
        super(props);
    }
    onClick() {
        if (this.refs.itemInput.value !== "") {
            var itemText = this.refs.itemInput.value;
            this.refs.itemInput.value ="";
            return this.items.AddItem(itemText);
        }
    }
    render() {
        return <div>
            <input ref="itemInput" />
            <button onClick = {this.onClick}>Добавить</button>
        </div>
    }
};

class PhoneItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        return <div>
            <p>
                <b>{this.props.text}</b><br />
                <button onClick={() => this.props.deletePhone(this.props.text)}>Удалить</button>
            </p>
        </div>
    }
};

class PhonesList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div>
            {this.props.phones.map(item =>
                <PhoneItem key={item}
                           text={item}
                           deletePhone={this.props.deletePhone}/>
            )}
        </div>
    }
};

class AppView extends React.Component {

    render() {
        return <div>
            <PhoneForm addPhone={this.props.addPhone}/>
            <PhonesList {...this.props} />
        </div>
    }
};

function mapStateToProps(state) {
    return {
        phones: state.get("phones")
    };
}

module.exports = connect(mapStateToProps, actions)(AppView);