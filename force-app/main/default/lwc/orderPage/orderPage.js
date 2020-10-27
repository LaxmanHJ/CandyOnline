import { LightningElement,track,api} from 'lwc';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class OrderPage extends LightningElement {
  flag1;
  city;
  reward;
  amount;
  paymentMode;
  @api PMessages ='';
  @api PMessages1='';
  @api PMessages2='';
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
    handleAmount(event){
      this.amount=event.target.value;
    }
    handleAddress(event){
    this.address=event.target.value;
    }
    handleCity(event){
    this.city=event.target.value;
    }
    submitOrder(){
        this.flag1=false;
        console.log("Order Submitted")
     /*   getContact().then(result=>{
            this.contacts=result;
        })
        for(var i=0;i<this.contacts.length;i++){
            if(this.contacts[i].Email==this.rec.Email){
                console.log(this.contacts[i].Email);
                this.flag1=true;
            }
        }
        if(this.flag1){
            this.flag=false;
            this.dispatchEvent(
                new ShowToastEvent({
                title: 'Warning',
                message: 'This email has already been taken ',
                variant: 'warning',
            }),
        );
        }
        else{
        createContact({con: this.rec})
        .then(result=>{
            this.rec={};
            this.dispatchEvent(
            new ShowToastEvent({
            title: 'Success',
            message: 'Account created',
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
}*/ 
}
   
 }
