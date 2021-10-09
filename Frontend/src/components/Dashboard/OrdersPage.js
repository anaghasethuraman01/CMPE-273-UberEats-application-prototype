
import Button from '@restart/ui/esm/Button';
import React, {Component} from 'react'
import {FaShoppingCart} from 'react-icons/fa';
import {Modal, Container,Row,Col,Table} from 'react-bootstrap';
import axios from 'axios';
import backendServer from "../../webConfig";
import PropTypes from 'prop-types';

class OrdersPage extends Component {
  
  constructor(props) {
    super(props);
    
     this.state = {
      
      show: false,
      customerid: localStorage.getItem("userid"),
      restaurantid : localStorage.getItem("restaurantid"),
      dishes : [],
      dishprice : null,
      dishname:null,
      status :null,
      restaurantorders : [],
      orderstatusmsg:null,
      updatestatus:false,
      orderstatus:null,
      orderid:null
      
  
    }
     //this.handleCheckout = this.handleCheckout.bind(this);
  }
    handleModalClose(){
      this.setState({show:!this.state.show}) 
        }
    goback = (e) =>{
        e.preventDefault();
        const {history} = this.props;
        history.push('/restauranthome'); 
      }
 
 componentDidMount() {
      
        const restaurantid = this.state.restaurantid;
	    if(restaurantid){
            const val = {
                restaurantid:restaurantid
            }

           
          axios.post(`${backendServer}/getrestaurantorders`,val).then((response) => {
              
                if(response.data.length > 0){
                    this.setState({ orderstatusmsg: "found" });
                }
                // //update the state with the response data
                this.setState({
                restaurantorders: this.state.restaurantorders.concat(response.data),
                });
                console.log(this.state.restaurantorders)
                
            });

        }
       
	}
handleChangeOrderType = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        }

 updatestatusfn = (valid,otype) =>{
   
   const ordertypedata = {
     orderid : valid,
     ordertype : otype
   }
   console.log(ordertypedata)
  this.updateOrderStatus(ordertypedata);
   
 }


handleChange = (e, orderid) => {
    const { restaurantorders } = this.state;
    const index = restaurantorders.findIndex((order) => order.orderid === orderid);
    const orders = [...restaurantorders];
    orders[index].orderstatus = e.target.value;
    this.setState({ restaurantorders: orders });
  }


 
 updateOrderStatus = (ordertypedata)=>{
   console.log(ordertypedata)
    axios.post(`${backendServer}/updateordertype`, ordertypedata)
            .then(res => {

            })
            
 }
  
    render(){
      
       	var orderlist = null;
              if(this.state.orderstatusmsg == "found") {
                orderlist = ( 
                <div>
                    <h1>  Orders Received </h1>
                    <br/>
                <div>
                
                    {this.state.restaurantorders.map((customerorder) => (
                      // this.setState({
                      //   orderstatus : customerorder.orderstatus
                      // })
                    <div>
                    
                      <Table>
                        <thead>
                        <tr className="form-control-order">
                          <th>Customer Name : {customerorder.customername} </th>
        
                          <th>Date : {customerorder.datetime} . <br/> Total Items : {customerorder.totalorderquantity} item(s).<br/> Total Price : ${customerorder.totalorderprice}</th>
                         
                          <th>Order Status : {customerorder.orderstatus} </th>


                          <th>{
                            customerorder.ordertype == "Pick Up" && (
                              <form >
                              Status Type :
                                <select  name="orderstatus"  value={this.state.orderstatus} onChange={(e) => { this.handleChange(e, customerorder.orderid)}} >
                                  <option value="Order Received" >Order Received</option>
                                  <option value="Preparing">Preparing</option>
                                  <option value="Pick up Ready" >Pick up Ready</option>
                                  <option value="Picked up" >Picked up</option>
                                </select>
                              <Button 
                               type="submit" 
                                onClick={() => {
                                this.updatestatusfn(customerorder.orderid,customerorder.orderstatus);
                                }}>
                                Update
                              </Button>
                            </form>
                            )
                            }  
                            {
                            customerorder.ordertype == "Delivery" && (
                              <form >
                              Status Type :
                                <select  name="orderstatus"   value={this.state.orderstatus} onChange={(e) => { this.handleChange(e, customerorder.orderid)}} >
                                  <option value="Order Received" >Order Received</option>
                                  <option value="Preparing"  >Preparing</option>
                                  <option value="On the way" >On the way</option>
                                  <option value="Delivered" >Delivered</option>
                                 
                                </select>
                                 <Button 
                               type="submit" 
                                onClick={() => {
                                this.updatestatusfn(customerorder.orderid,customerorder.orderstatus);
                                }}>
                                Update
                              </Button>
                            </form>
                            )
                            }  
                          </th>
                         
                         
                        </tr>
                      </thead>
                      </Table>
                       
                      
                    </div>
                    ))}
                </div>
                </div>
                );
            }
     
    return (
        <div className="container" >
          <div>
           <form >
						 Order Type :
            	<select  name="ordertype"   value={this.state.ordertype} onChange={this.handleChangeOrderType} >
              	<option value="">All</option> 
              	<option value="New Order" >New Order</option>
              	<option value="Delivered Order"  >Delivered Order</option>
            	</select>
						<Button onClick={this.handleordersearch} type="submit">
							Search
						</Button>
					</form>
          </div>

          <br/><br/><br/>
          <div> {orderlist} </div> 
           <Button onClick={this.goback}>Home Page</Button>
            <div>
         <Modal size="md-down"
          aria-labelledby="contained-modal-title-vcenter"
          centered
           show={this.state.show} onHide={()=>this.handleModalClose()}>
             <Modal.Header closeButton></Modal.Header>
             <Modal.Body>
              <h1>Receipt</h1>
             </Modal.Body>
             <Modal.Footer>
              
             </Modal.Footer>
           </Modal>
      </div>
       </div>
    )
    }
}

export default OrdersPage
