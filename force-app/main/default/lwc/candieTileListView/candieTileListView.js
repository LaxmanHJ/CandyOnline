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
}
