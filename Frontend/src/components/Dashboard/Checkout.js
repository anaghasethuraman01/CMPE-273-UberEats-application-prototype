import React, {Component} from 'react';

// import cookie from 'react-cookies';
import { Button,Input} from 'reactstrap';
import {Modal, Form} from 'react-bootstrap';
import backendServer from "../../webConfig";
import axios from 'axios';
import { CountryDropdown } from 'react-country-region-selector';
class CheckOut extends Component {
    
    constructor(props){
        super(props);
  
        this.state = {
          status : null,
          addressstatus:null,
          dishes:[],
          customerid:localStorage.getItem("userid"),
          restaurantid:localStorage.getItem("restid"),
          restaurantname : localStorage.getItem("restname"),
          customername:localStorage.getItem("username"),
          dishid:null,
          deliveryaddress: [],
          orderadd:null,
          showDiv:false,
          street:null,
          state:null,
          city:null,
          country:null,
          dateandtime:Date().toLocaleString(),
          selectedAddr: null,
          errorMsg: null,
          ordertype: localStorage.getItem("DeliveryType"),
          totalorderquantity:null,
          totalorderprice:null,
          show: false,
          
        }

      }
      componentDidMount(){
        const data = {
          customerid:this.state.customerid,
          //restaurantid: this.state.restaurantid
        };
        axios.post(`${backendServer}/getorderaddress`,data)
                .then((response) => { 
                  console.log(response.data);

                 if(response.data.length > 0){
                   this.setState({ addressstatus : "datapresent"});
                 }
                 else {
                   this.setState({ addressstatus : "nodata"});
                 }
                this.setState({
                  deliveryaddress : this.state.deliveryaddress.concat(response.data) 
                });
            });
         axios.post(`${backendServer}/getcartitem`,data)
                .then((response) => { 
                 // console.log(response.data);
                 if(response.data.length > 0){
                   this.setState({ status : "datapresent"});
                 }
                 else {
                   this.setState({ status : "nodata"});
                 }
                this.setState({
                  dishes : this.state.dishes.concat(response.data) 
                });
                this.state.dishes.forEach((element) => {
                  this.state.totalorderquantity = this.state.totalorderquantity + element.quantity;
                  this.state.totalorderprice = this.state.totalorderprice + element.quantityprice;
                });
                this.setState({
                  totalorderquantity : this.state.totalorderquantity 
                });
                this.setState({
                  totalorderprice : this.state.totalorderprice 
                });
                });
      }
     
      goback = (e) =>{
        e.preventDefault();
        const {history} = this.props;
        history.push('/restauranthome'); 
      }


   addToOrders = (data) => {
        axios.post(`${backendServer}/placeorder`, data)
            .then(res => {
                
            }).catch(
                (error) => {
                  console.log(error);
                }
            );
    }
      goback = (e) =>{
        e.preventDefault();
        const {history} = this.props;
        history.push('/customerhome'); 
      }
      placeOrder = (e) => {
        e.preventDefault();
        let restaurantid; let street; let city ; let customerid; let state; let country; let dishid;
        if (this.state.selectedAddr == null || this.state.selectedAddr == undefined) {
          alert( 'Please select a delivery address option!')
        }else{
        
        //console.log(this.state.selectedAddr)
        if(this.state.selectedAddr!="new"){
          const addrObj = JSON.parse(this.state.selectedAddr);
          street = addrObj.address;
          city = addrObj.city;
          state =addrObj.state;
          country = addrObj.country;
        }else{
          street = this.state.street;
          city = this.state.city;
          state =this.state.state;
          country = this.state.country;
          if(city == null || state == null || country == null || street == null){
            alert("Address fields cannot be empty");
            return;
          }

        }
        const orderDetails = []; 
        this.state.dishes.forEach((element) => {
          orderDetails.push({ dishid: element.dishid, quantity: element.quantity });
         
        });
        
       
        // console.log(this.state.totalorderquantity);
        // console.log(this.state.totalorderprice);
        const orderData = {
          customerid:this.state.customerid,
          restaurantid:this.state.restaurantid,
          restaurantname:this.state.restaurantname,
          customername:this.state.customername,
          street:street,
          city:city,
          state:state,
          country:country,
          ordertype:this.state.ordertype,
          totalorderquantity:this.state.totalorderquantity,
          totalorderprice:this.state.totalorderprice,
          datetime:this.state.dateandtime.substring(0,24),
          orderDetails
        }
        console.log("****");
        console.log(orderData);
        this.addToOrders(orderData); 
        this.setState({
          show : true 
        });
       
      }
      }
       handleModalClose(){
      this.setState({show:!this.state.show}) 
       const {history} = this.props;
        history.push('/customerhome'); 
        }
      handleChangeAddress = (e) => {
      this.setState({
        selectedAddr: e.target.value,
      }); 

        
      if (e.target.value === 'new') {
        this.setState({ showDiv: true });
      } else {
        this.setState({ showDiv: false });
      }
  }
  handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        }
        selectCountry (val) {
      this.setState({ country: val });
    }
      render(){
        var addresses = null;
        var addnewaddress = null;
        var cartitems = null;
       

       if(this.state.showDiv){
         addnewaddress = (
           <div>
             <div className="form-group">
              Apt and Street No: <Input type="text" className="form-control" name="street" defaultValue={this.state.street} onChange={this.handleChange} ></Input>
              </div>
             <div className="form-group">
              State: <Input type="text" className="form-control" name="state" defaultValue={this.state.state} onChange={this.handleChange} ></Input>
              </div>
              <div className="form-group">
              City: <Input type="text" className="form-control" name="city" defaultValue={this.state.city} onChange={this.handleChange} ></Input>
              </div>
              <div className="form-group">

              <CountryDropdown className="form-control"
                    value={this.state.country}
                    onChange={(val) => this.selectCountry(val)} 
                  />

             
              </div>
           </div>
         )
       }
        if(this.state.addressstatus === "datapresent"){

          addresses = (
            <div>
              {this.state.deliveryaddress.map(deliveryadd=>
              <div>
              <Form.Group  >
              <Form.Check inline value={JSON.stringify(deliveryadd)} label={`${deliveryadd.address},${deliveryadd.city},${deliveryadd.state},${deliveryadd.country}`}  name="address" type="radio" id={deliveryadd} onChange={this.handleChangeAddress} />
              </Form.Group>

              </div>
              )}
            </div>
          )
        }
     
    return (
      

      <div className="container">
      <h4>Your items</h4>
         <div>
              {this.state.dishes.map(dish=>
              <div className="cartitems">
              <div >{dish.dishname}</div>
                <div className="cartitem">${dish.dishprice}</div>
                <div className="cartitem">Qty :{dish.quantity}</div>
              </div>
              )}
              
          </div>
       
        <br/>
        <h2>Total : ${this.state.totalorderprice}</h2>
        Total No of Items : {this.state.totalorderquantity}
        <br/>
        <br/>
        <h4>Select a delivery address</h4>
       {addresses}
       <Form.Group  >
          <Form.Check inline value="new" label="Add new delivery address"  name="address" type="radio" id="new" onChange={this.handleChangeAddress} />
        </Form.Group>

      {addnewaddress}
       
       <br/>
       <Button onClick={this.placeOrder}>Place Order</Button>
       <br/>
       <br/>
       <Button onClick={this.goback}>Home Page</Button>
     
      <div>
         <Modal size="md-down"
          aria-labelledby="contained-modal-title-vcenter"
          centered
           show={this.state.show} onHide={()=>this.handleModalClose()}>
             <Modal.Header closeButton></Modal.Header>
             <Modal.Body>
              <h1>Order Successfully Placed ! Thank you</h1>
             </Modal.Body>
             <Modal.Footer>
              
             </Modal.Footer>
           </Modal>
      </div>
      </div>
    )
    }
   
}
 
export default CheckOut;