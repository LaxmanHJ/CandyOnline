import { LightningElement,api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class CandieTile extends NavigationMixin(LightningElement) {
    @api pass_val;
    @api flagtile;
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
                ParentMessageName : this.pass_val.Name,
                ParentMessageImage: this.pass_val.Image__c,
                ParentMessagePrice: this.pass_val.Price__c,  
                ParentMessageQuantity: this.pass_val.Quantity__c,
                ParentMessageId: this.pass_val.Id
            }
        };
        // Base64 encode the compDefinition JS object
        let encodedCompDef = btoa(JSON.stringify(compDefinition));
        console.log('eventId:'+event.target.dataset.recordId);
        this[NavigationMixin.Navigate]({
        type: "standard__webPage",
        attributes: {
          url: "/one/one.app#" + encodedCompDef           
        },
    });
}
}