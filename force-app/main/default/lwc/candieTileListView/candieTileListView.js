import { LightningElement,api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class CandieTileListView extends LightningElement {
    @api pass_val;
    redirectToContactPage(event) {
        // Navigate to the Account home page
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId : event.target.dataset.id,
                objectApiName: 'ProductStore__c',
                actionName: 'view'
            }
        });
    }
   
    navigateToTabPage(event) {
        let compDefinition = {
            componentDef: "c:candiesPopup",
            attributes: {
                ParentMessage : this.pass_val.Name,
                ParentMessage1: this.pass_val.image__c,
                ParentMessage2: this.pass_val.Price__c,   
            }
        };
        // Base64 encode the compDefinition JS object
        let encodedCompDef = btoa(JSON.stringify(compDefinition));
       // console.log('eventId:'+event.target.dataset.recordId);
        this[NavigationMixin.Navigate]({
        type: "standard__webPage",
        attributes: {
          url: "/one/one.app#" + encodedCompDef           
        },
    });
}
}
