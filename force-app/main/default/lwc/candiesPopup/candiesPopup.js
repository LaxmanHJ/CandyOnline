import { LightningElement,track,api} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class CandiesPopup extends NavigationMixin(LightningElement) {
    @track isModalOpen = false;
    @api ParentMessageName = '';
    @api ParentMessageImage='';
    @api ParentMessagePrice='';
    @api ParentMessageQuantity = '';
    @api count=1;
   // calsum=ParentMessagePrice;
    @track flagsold;
    @track flagcart;
    @track calsum;
    a;
    

  //sets the isModalOpen property to true, indicating that the Modal is Open
  showModal() {
    this.isModalOpen = true;
  }

  //sets the isModalOpen property to false, indicating that the Modal is Closed
  closeModal() {
    this.isModalOpen = false;
  }

  /* 
  can be used instead of the above two methods - showModal() & closeModal()
  just toggles the isModalOpen property - true if false, false if true 
  */
  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  //compute the CSS classes of the Modal(popup) based on the value of isModalOpen property
  get modalClass() {
    return `slds-modal ${this.isModalOpen ? "slds-fade-in-open" : ""}`;
  }

  //compute the CSS classes of the Modal Backdrop(grey overlay) based on the value of isModalOpen property
  get modalBackdropClass() {
    return `slds-backdrop ${this.isModalOpen ? "slds-backdrop_open" : ""}`;
  }

  

    areDetailsVisible = false;

    handleChange(event) {
        this.areDetailsVisible = event.target.checked;
    }

    //increment and decrement event
     handleincrement(){
       // amount of increments can upto availabe quantity -10
           if(this.count<this.ParentMessageQuantity-5){
               this.count=this.count+1;
           
           this.a = this.ParentMessagePrice; 
           this.calsum = this.calsum + this.a;
           console.log('val'+this.calsum);
           console.log('val'+this.a);
           }
        // this.ParentMessagePrice = this.ParentMessagePrice * this.count;
       //    this.ParentMessagePrice = this.calsum;
     }

     handledecrement(){
        /* if(this.count>1){
             this.count=this.count-1;
             this.ParentMessagePrice = this.ParentMessagePrice * this.count;
         }
         */
        if(this.count>1){
          this.count = this.count-1;
           this.a = this.ParentMessagePrice; 
           this.calsum = this.calsum - this.a;
        }
     }
/*
     handleSoldOut(){
       if(this.ParentMessageQuantity<10){
         console.log('Sold out');
       }
     }
  */

     connectedCallback(){
      setTimeout(()=>{
         if(this.ParentMessageQuantity<12){
          this.flagsold = false;
          this.flagcart = true;
         }
         this.calsum=this.ParentMessagePrice;
         console.log(this.calsum);
      },1500);
  }


    navigateToRecordPage(event) {
      console.log("Checkout done!!!")
      let compDefinition = {
          componentDef:"c:orderPage",
          attributes: {
              PMessagesName : this.ParentMessageName,
              PMessagesImage: this.ParentMessageImage,
             // PMessagesPrice: this.ParentMessagePrice,   
             PMessagesPrice: this.calsum,
             PMessagesQuantity: this.count
          }
      };
      // Base64 encode the compDefinition JS object
      let encodedCompDef = btoa(JSON.stringify(compDefinition));
    //  console.log('eventId:'+event.target.dataset.recordId);
      this[NavigationMixin.Navigate]({
      type: "standard__webPage",
      attributes: {
        url: "/one/one.app#" + encodedCompDef           
      },
  });
}

}