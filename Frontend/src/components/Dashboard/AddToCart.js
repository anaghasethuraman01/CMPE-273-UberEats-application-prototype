
import Button from '@restart/ui/esm/Button';
import React, {Component} from 'react'
import {FaShoppingCart} from 'react-icons/fa';
import {Modal} from 'react-bootstrap';


class AddToCart extends Component {
  constructor() {
    super();
     this.state = {
      show: false
    }
  }
  handleModal(){
  this.setState({show:!this.state.show})  
  }
    render(){
     
    return (
        <div >
           <Button className="cartleft" onClick = {()=>{this.handleModal()}}><FaShoppingCart/>Cart</Button>
           <Modal size="md-down"
          aria-labelledby="contained-modal-title-vcenter"
          centered
           show={this.state.show} onHide={()=>this.handleModal()}>
             <Modal.Header closeButton>Your Cart</Modal.Header>
             <Modal.Body>
              
             </Modal.Body>
             <Modal.Footer>
               <Button  onClick = {()=>{this.handleModal()}}>CheckOut</Button>
             </Modal.Footer>
           </Modal>
       </div>
    )
    }
}

export default AddToCart
