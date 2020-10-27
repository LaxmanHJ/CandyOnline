import { LightningElement,track,api} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class CandiesPopup extends LightningElement {
    @track isModalOpen = false;
    @api ParentMessage = '';
    @api ParentMessage1='';
    @api ParentMessage2='';
    @api count=1;
    

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
         this.count=this.count+1;
     }

     handledecrement(){
         if(this.count>1){
             this.count=this.count-1;
         }
     }


    navigateToRecordPage() {
      console.log("Checkout done!!!")
      let compDefinition2 = {
          componentDef2:"c:orderPage",
          attributes: {
              PMessages : this.ParentMessage,
              PMessages1: this.ParentMessage1,
              PMessages2: this.ParentMessage2,   
          }
      };
      // Base64 encode the compDefinition JS object
      let encodedCompDef = btoa(JSON.stringify(compDefinition2));
    //  console.log('eventId:'+event.target.dataset.recordId);
      this[NavigationMixin.Navigate]({
      type: "standard__webPage",
      attributes: {
        url: "/ones/ones.app#" + encodedCompDef           
      },
  });
}

}
