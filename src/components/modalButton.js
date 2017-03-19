import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { Row, Modal, Button, Col, FormControl, FormGroup } from 'react-bootstrap';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import Dropdown from 'react-dropdown';
import CardReactFormContainer from 'card-react';
import './card.css';

class ModalTest extends Component {
    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
        this.goNext = this.goNext.bind(this);
        this.open = this.open.bind(this);
        this.submit = this.submit.bind(this);
        this.state = { showModal: false, country: '', region: '', page: false };
    }

    submit() {        
        let userData = {
            name: this.name.value,
            cvc: this.cvc.value,
            number: this.number.value,
            expiry: this.expiry.value
        }
        {/* Use API to submit the UserData*/}
        this.setState({ showModal: false });
    }

    selectCountry(val) {
        this.setState({ country: val });
    }

    selectRegion(val) {
        this.setState({ region: val });
    }


    goNext() {
        this.setState({
            page: true
        });
    }

    close() {
        this.setState({ page: false, showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }
    render() {

        const creditCardForm = (
            <div>
                <CardReactFormContainer
                container="card-wrapper" // required  
                formInputsNames={
                    {
                    number: 'CCnumber', // optional — default "number"
                    expiry: 'CCexpiry',// optional — default "expiry"
                    cvc: 'CCcvc', // optional — default "cvc"
                    name: 'CCname' // optional - default "name"
                    }
                }   
                  formatting={true} // optional - default true
                >
                
                <form>
                    <FormControl inputRef={ref => this.name = ref} placeholder="Full name" type="text" name="CCname" />
                    <FormControl inputRef={ref => this.number = ref} placeholder="Card number" type="text" name="CCnumber" />
                    <FormControl inputRef={ref => this.expiry = ref} placeholder="MM/YY" type="text" name="CCexpiry"/>
                    <FormControl inputRef={ref => this.cvc = ref}  placeholder="CVC" type="text" name="CCcvc"/>
                </form>
                
                </CardReactFormContainer>
                <div id="card-wrapper"></div>
            </div>)
        const loginButtons = (
            <div>
                <hr />
                <div className="text-center">
                    <Col xs={6}>
                        <Button bsStyle="primary" bsSize="large" onClick={this.close}>Login</Button>
                    </Col>
                    <Col xs={6}>
                        <Button bsStyle="success" bsSize="large" onClick={this.close}>Sign Up!</Button>
                    </Col>
                    <p>
                        Powered by Kimchi Fried Rice
                    </p>
                </div>
            </div>
        );
        const { country, region } = this.state;

        const userInfoForm = (
            <form>
                <FormGroup>
                    <FormControl
                        type="text"
                        placeholder="Full Name"
                    />
                    <br />
                    <FormControl
                        type="email"
                        placeholder="Email"
                    />
                    <br />
                    <FormControl
                        type="text"
                        placeholder="Address Line 1" />
                    <br />
                    <FormControl
                        type="text"
                        placeholder="Address Line 2" />
                    <br />

                    <div className="col-sm-6">
                        <div className="col-sm-12">
                            <CountryDropdown
                                value={country}
                                onChange={(val) => this.selectCountry(val)} classes="form-control" />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="col-sm-12">
                            <RegionDropdown
                                country={country}
                                value={region}
                                onChange={(val) => this.selectRegion(val)} classes="form-control" />
                        </div>
                    </div>
                </FormGroup>
            </form>
        )
        let modalBody = null;
        let buttonName = null;
        if (this.state.page) {
            modalBody = creditCardForm;
            buttonName = (<Button onClick={this.submit}>Submit</Button>)
        }
        else {
            modalBody = userInfoForm;
            buttonName = (<Button onClick={this.goNext}>Next</Button>)
        }
        const {bName, cName, sName} = this.props;
        return (
            <div>
                <Button
                    bsStyle="primary"
                    bsSize="large"
                    onClick={this.open}
                >
                    {bName}
                </Button>

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton >
                        <Modal.Title>{cName} {sName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {modalBody} 
                    </Modal.Body>
                    <Modal.Footer>
                        {buttonName}
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

ModalTest.propTypes = {
    cName : React.PropTypes.string,
    sName : React.PropTypes.string,
    bName : React.PropTypes.string
}

export const runKimchi = (buttonName, domElement, companyName, subscriptionName)=>{
    ReactDOM.render(<ModalTest bName={buttonName} cName={companyName} sName={subscriptionName} />, 
    document.getElementById(domElement)
    );
}
