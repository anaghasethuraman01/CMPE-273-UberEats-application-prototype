
import Button from '@restart/ui/esm/Button';
import React, {Component} from 'react'
import {FaShoppingCart} from 'react-icons/fa';
import {Modal, Container,Row,Col,Table} from 'react-bootstrap';
import axios from 'axios';
import backendServer from "../../webConfig";
import PropTypes from 'prop-types';

class CustomerOrder extends Component {
  
  constructor(props) {
    super(props);
    
     this.state = {
      
      show: false,
      customerid: localStorage.getItem("userid"),
      restaurantid : localStorage.getItem("restid"),
      dishes : [],
      dishprice : null,
      dishname:null,
      status :null,
      customerorders : [],
      customerordersearch : [],
      orderstatusmsg:null,
      receiptdetails:[],
      orderstatus:null,
      ordermsg:null
  
    }
     //this.handleCheckout = this.handleCheckout.bind(this);
  }
    goback = (e) =>{
        e.preventDefault();
        const {history} = this.props;
        history.push('/customerhome'); 
      }
  handleModalClose(){
      this.setState({show:!this.state.show}) 
        }
    viewreceipt= (val) =>{
      this.setState({show:true});
       this.setState({
            receiptdetails : [] 
          });
      const receiptval = {
                orderid:val
            }
       axios.post(`${backendServer}/getorderreceipt`,receiptval).then((response) => {
         this.setState({
            receiptdetails : this.state.receiptdetails.concat(response.data) 
          });
       });

    }
       
 componentDidMount() {
     
      const customerid = this.state.customerid;
	    if(customerid){
            const val = {
                customerid:customerid
            }
           
          axios.post(`${backendServer}/getitemsfromorders`,val).then((response) => {
              
                if(response.data.length > 0){
                    this.setState({ orderstatusmsg: "found" });
                }
                // //update the state with the response data
                this.setState({
                customerorders: this.state.customerorders.concat(response.data),
                });
                console.log(this.state.customerorders)
                console.log(this.state.orderstatusmsg)
            });

        }
       
	}
searchOrder = (ordersearch) => {
    axios.post(`${backendServer}/handleordersearch`,ordersearch).then((response) => {
                    if(response.data.length > 0){
                        this.setState({ ordermsg: "searchdone" });
                        this.setState({ orderstatusmsg: "notfound" });
                    }
                    // //update the state with the response data
                     this.setState({
                      customerorders: this.state.customerorders.concat(response.data),
                      });
                      console.log(this.state.customerorders)
                    
    });
}
handleordersearch = (e) =>{
  e.preventDefault();
   this.setState({
        customerorders: []
    });
  
  const ordersearch = {
    orderstatus : this.state.orderstatus,
    customerid : this.state.customerid
  }
 
 if(this.state.orderstatus === "All"){
   this.componentDidMount();
 }
  this.searchOrder(ordersearch);
}
handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
    render(){
        
       	var orderlist = null;
         var searchorderlist = null;
         
              if(this.state.orderstatusmsg == "found") {
                orderlist = ( 
                <div>
                    <h1> Your Orders </h1>
                <div>
                
                    {this.state.customerorders.map((customerorder) => (
                    <div>
                      <Table>
                        <thead>
                        <tr className="form-control-order">
                          <th>{customerorder.restaurantname}  <h4>{customerorder.orderstatus}</h4>  </th>
        
                          <th>{customerorder.totalorderquantity} items for ${customerorder.totalorderprice} . {customerorder.datetime}.</th>
                          <th><Button 
                           onClick={() => {
                                this.viewreceipt(customerorder.orderid);
                                }}>View Receipt</Button></th>   
                        </tr>
                      </thead>
                      </Table>
                    </div>
                    ))}
                </div>
                </div>
                );
            }
            if(this.state.ordermsg == "searchdone" ){
              console.log("here")
                orderlist = ( 
                <div>
                    <h1> Your Orders </h1>
                <div>
                
                    {this.state.customerorders.map((customerorder1) => (
                    <div>
                      <Table>
                        <thead>
                        <tr className="form-control-order">
                          <th>{customerorder1.restaurantname}  <h4>{customerorder1.orderstatus}</h4>  </th>
                          <th>{customerorder1.totalorderquantity} items for ${customerorder1.totalorderprice} . {customerorder1.datetime}.</th>
                          <th><Button 
                           onClick={() => {
                                this.viewreceipt(customerorder.orderid);
                                }}>View Receipt</Button></th>   
                        </tr>
                      </thead>
                      </Table>
                       </div>
                    ))}
                </div>
                </div>
                )
            }
            // else{
            //    orderlist = ( 
            //     <div>
            //         <h1> No Orders </h1>
            //     </div>
            //    )

            // }
     
    return (
        <div className="container" >
          <div>
           
           <form >
						 Order Type :
            	<select  name="orderstatus"   value={this.state.orderstatus}  onChange={this.handleChange}>
              	<option value="All">All</option> 
              	<option value="Order Received" >Order Received</option>
              	<option value="Preparing"  >Preparing</option>
              	<option value="On the way" >On the way</option>
                <option value="Delivered" >Delivered</option>
                <option value="Pick up Ready" >Pick up Ready</option>
                <option value="Picked up" >Picked up</option>
            	</select>
						<Button 
             onClick={
                  this.handleordersearch
              }>
            
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
             <Modal.Header closeButton> Receipt</Modal.Header>
             <Modal.Body>
               <div>
              {this.state.receiptdetails.map(receiptdetail=>
              <div>
                {receiptdetail.dishname}. ${receiptdetail.price}. Qty :{receiptdetail.quantity}
              </div>)}
              </div>

             </Modal.Body>

             <Modal.Footer>
              
             </Modal.Footer>
           </Modal>
          </div>
       </div>
    )
    }
}

export default CustomerOrder
