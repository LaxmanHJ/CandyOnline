import { LightningElement,track,api} from 'lwc';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import createContact from '@salesforce/apex/OrderClass.createContact';
import updateOrder from '@salesforce/apex/OrderClass.updateOrder';
import getContact from '@salesforce/apex/OrderClass.getContact';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class OrderPage extends LightningElement {
  flag1;
  city;
  reward;
  amount;
  paymentMode;
  conId;
  newConId
  @api Name ='';
  @api Image='';
  @api Price='';
  @api Count='';
  @api subtotal='';
  @api total='';
  @api prodId='';
  @api OrderId='';
  @track error;
  @track flag
  @track  rec = {
    FirstName : FIRSTNAME_FIELD,
    LastName :LASTNAME_FIELD,
    Email: EMAIL_FIELD
  }
    get options() {
        return [
            { label: 'Fruit & Nut', value: 'Fruit & Nut' },
            { label: 'Hard Candy', value: 'Hard Candy' },
            { label: '42% OFF', value: '42% OFF' },
        ];
    }
    get payment() {
        return [
            { label: 'Credit/Debit Card', value: 'Credit/Debit Card' },
            { label: 'Google Pay', value: 'Google Pay' },
            { label: 'Phone Pe', value: 'Phone Pe' }
        ];
    }

    handleChange(event) {
        this.flag=false;
        this.reward = event.target.value;
    }
    handleEmailChange(event){
        this.rec.Email=event.target.value;
    }
    handleFnameChange(event){
       this.rec.FirstName=event.target.value;
    }
    handleLnameChange(event){
    this.rec.LastName=event.target.value;
    }
    handleClick() {
        this.flag =true;
    }
    handlePayment(event){
       this.paymentMode=event.target.value;
    }
    handleAddress(event){
    this.Address=event.target.value;
    }
    handleCity(event){
    this.city=event.target.value;
    }
    get handleDisable(){
        return this.total<1000;
    }
    submitOrder(){
        this.flag1=false;
       getContact().then(result=>{
            this.contacts=result;
        })
        for(var i=0;i<this.contacts.length;i++){
            if(this.contacts[i].Email==this.rec.Email){
                console.log(this.contacts[i].Email);
                this.conId=this.contacts[i].Id;
                console.log(this.conId);
                this.flag1=true;
                break;
            }
        }
        if(this.flag1){
           this.flag1=false;
           console.log(this.OrderId,this.conId);
           updateOrder({orderId:this.OrderId,contactId:this.conId,address:this.Address,amount:this.total})
           .then(result=>{
               console.log(result);
               this.dispatchEvent(
               new ShowToastEvent({
               title: 'Success',
               message: 'Order Placed Successfully',
               variant: 'success',
           }),
       ); 
       })
      .catch(error => {
        this.error = error;
        console.log(this.error);
        const evt = new ShowToastEvent({
            title: "Error",
            message: "Error while Placing Order",
            variant: "error",
        });
        this.dispatchEvent(evt);
    });
        }
        else{
        this.createNewContact();
}
}
createNewContact(){
    createContact({con: this.rec})
        .then(result=>{
            this.rec={};
            this.contacts=result;
            this.newConId=this.contacts.Id;
            console.log(this.newConId);
            this.updateOrderContact();
            this.dispatchEvent(
            new ShowToastEvent({
            title: 'Success',
            message: 'Contact Created Successfully',
            variant: 'success',
        }),
    );  
    })
    .catch(error => {
        this.error = error;
        console.log(this.error);
        const evt = new ShowToastEvent({
            title: "Error",
            message: "Error while creating contact",
            variant: "error",
        });
        this.dispatchEvent(evt);
    }); 
   
    }
    updateOrderContact(){
        updateOrder({orderId:this.OrderId,contactId:this.newConId,address:this.Address,amount:this.total})
        .then(result=>{
            console.log(result);
            this.dispatchEvent(
            new ShowToastEvent({
            title: 'Success',
            message: 'Order Placed Successfully',
            variant: 'success',
        }),
    ); 
    })
.catch(error => {
 this.error = error;
 console.log(this.error);
 const evt = new ShowToastEvent({
     title: "Error",
     message: "Error while Placing Order",
     variant: "error",
 });
 this.dispatchEvent(evt);
});
    }
}
