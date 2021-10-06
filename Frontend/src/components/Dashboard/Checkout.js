import React, {Component} from 'react';

// import cookie from 'react-cookies';
import { Button,Input} from 'reactstrap';
import { Form} from 'react-bootstrap';
import backendServer from "../../webConfig";
import axios from 'axios';
import { CountryDropdown } from 'react-country-region-selector';
class CheckOut extends Component {
    
    constructor(props){
        super(props);
  
        this.state = {
          status : null,
          address:null,
          dishes:[],
          customerid:localStorage.getItem("userid"),
          restaurantid:localStorage.getItem("restid"),
          dishid:null,
          deliveryaddress: [],
          orderadd:null,
          showDiv:false,
          state:null,
          city:null,
          country:null,
          dateandtime:Date().toLocaleString(),
          selectedAddr: null,
          errorMsg: null,
          
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
                   this.setState({ address : "datapresent"});
                 }
                 else {
                   this.setState({ address : "nodata"});
                 }
                this.setState({
                  deliveryaddress : this.state.deliveryaddress.concat(response.data) 
                });
                

            });
         axios.post(`${backendServer}/getcartitem`,data)
                .then((response) => { 
                  console.log(response.data);
                 if(response.data.length > 0){
                   this.setState({ status : "datapresent"});
                 }
                 else {
                   this.setState({ status : "nodata"});
                 }
                this.setState({
                  dishes : this.state.dishes.concat(response.data) 
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
                
              // console.log(res.data);
                // if(res.data.message){
                //     this.setState({message:res.data.message})

                // }else{

                 
                // }
                
            }).catch(
                (error) => {
                  console.log(error);
                }
            );
    }

      placeOrder = (e) => {
        e.preventDefault();
        let restaurantid; let city ; let customerid; let state; let country; let dishid;
        if (this.state.selectedAddr == null || this.state.selectedAddr == undefined) {
          alert( 'Please select a delivery address option!')
        }else{
        
        
        if(this.state.selectedAddr!="new"){
          const addrObj = JSON.parse(this.state.selectedAddr);

          city = addrObj.city;
          state =addrObj.state;
          country = addrObj.country;
        }else{
          
          city = this.state.city;
          state =this.state.state;
          country = this.state.country;
          if(city == null || state == null || country == null){
            alert("Address fields cannot be empty");
            return;
          }

        }
        const orderDetails = [];
        this.state.dishes.forEach((element) => {
          orderDetails.push({ dishid: element.dishid, quantity: element.quantity });
        });
        console.log(orderDetails);
        const orderData = {
          customerid:this.state.customerid,
          restaurantid:this.state.restaurantid,
          city:city,
          state:state,
          country:country,
          datetime:this.state.dateandtime.substring(0,24),
          orderDetails
        }
        this.addToOrders(orderData); 
        const {history} = this.props;
        history.push('/customerhome'); 
      }
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

       if(this.state.showDiv){
         addnewaddress = (
           <div>
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
        if(this.state.address === "datapresent"){

          addresses = (
            <div>
              {this.state.deliveryaddress.map(deliveryadd=>
              <div>
              <Form.Group  >
              <Form.Check inline value={JSON.stringify(deliveryadd)} label={`${deliveryadd.city},${deliveryadd.state},${deliveryadd.country}`}  name="address" type="radio" id={deliveryadd} onChange={this.handleChangeAddress} />
              </Form.Group>

              </div>
              )}
            </div>
          )
        }
     
    return (
      

      <div className="container">
      <h4>Your items</h4>
     
       {this.state.dishes.map(dish=>
       <div className="cartitems">
       <div >{dish.dishname}</div>
        <div className="cartitem">${dish.dishprice}{dish.quantity}</div>
        <div className="cartitem">Qty :{dish.quantity}</div>
        </div>
       )}
        <br/>
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
      </div>
    )
    }
   
}
 
export default CheckOut;