import { LightningElement,wire,track } from 'lwc';
import getProds from  '@salesforce/apex/CatProd.getProducts';
import getCategoryProducts from  '@salesforce/apex/CatProd.getCategorySelected';
import bselect from '@salesforce/apex/CatProd.getBrandSelected';
import mselect from '@salesforce/apex/CatProd.getMakerSelected';
import cb_select from '@salesforce/apex/CatProd.getComb_cat_brandSelected';  
import cm_select from '@salesforce/apex/CatProd.getComb_cat_makerSelected'; 
import bm_select from '@salesforce/apex/CatProd.getComb_brand_makerSelected'; 
import cmb_select from '@salesforce/apex/CatProd.getComb_cat_maker_brandSelected';
    

import getProdsasce from '@salesforce/apex/CatProd.getProductsinAsce';
import getProdsdesc from '@salesforce/apex/CatProd.getProductsinDesc';


import { subscribe, MessageContext } from 'lightning/messageService';
import SAMPLEMC from '@salesforce/messageChannel/sfdcdemo__c';

export default class CandieTileList extends LightningElement {

   testp = true;

    @wire(MessageContext)
    messageContext;

    visibleContacts;
   
    co;
    ctlCatid;
    ctlb;
    ctlm;
    @wire (getProds,{searchText:'$co'}) cons;
    @wire (getCategoryProducts,{categoryId:'$ctlCatid'}) uniCatProd;
    @wire (bselect,{brandName:'$ctlb'}) unibrand;
    @wire (mselect,{makerName:'$ctlm'}) unimaker;
    @wire (cb_select,{categoryId:'$ctlCatid',brandName:'$ctlb'}) unicatbrand;
    @wire (cm_select,{categoryId:'$ctlCatid',makerName:'$ctlm'}) unicatmaker; 
    @wire (bm_select,{brandName:'$ctlb',makerName:'$ctlm'}) unibrandmaker;
    @wire (cmb_select,{categoryId:'$ctlCatid',brandName:'$ctlb',makerName:'$ctlm'}) unicatbrandmaker;

    @wire (getProdsasce,{searchText:'$co'}) cons_asce;
    @wire (getProdsdesc,{searchText:'$co'}) cons_desc;

  isgridView = true;
  islistView = false;
  
  displayList(){
		this.isgridView = false;
		this.islistView = true;
		if(this.islistView){
			this.template.querySelector('[data-id="listView"]').classList.add('light-color');
			this.template.querySelector('[data-id="gridView"]').classList.remove('light-color');

		}
		console.log("button clicked")
  }
  
  displaygrid(){
		this.isgridView = true;
		this.islistView = false;
		if(this.isgridView) { 
			this.template.querySelector('[data-id="gridView"]').classList.add('light-color');
			this.template.querySelector('[data-id="listView"]').classList.remove('light-color');

		}
		console.log("another button clicked")

  }
  
@track selectedOption;
//flag = null;
  changeHandler(event) {
    const field = event.target.name;
    if (field === 'optionSelect') {
         this.selectedOption = event.target.value;
         console.log(this.selectedOption);
     } 
    if(this.selectedOption==="ZA"){
         //  this.con = this.condesc;
       //  flag = true;
       this.cons  = this.cons_desc;
    } 
    if(this.selectedOption==="AZ"){
       // this.con = this.conasc;
     //  flag = false;
     this.cons  = this.cons_asce;
     
    
    }
  }

    
    subscribeToMessageChannel() {

      /*     if (!this.subscription) {
                this.subscription = subscribe(
                this.messageContext,
                SAMPLEMC,
                (message) => this.handleMessage(message)
            );
        }
*/
            this.subscription = subscribe(
           this.messageContext,
          SAMPLEMC, 
          (message) => {
             this.handleMessage(message);
           }
           );
    }

    handleMessage(message) {
        this.co = message.conlist;
        this.ctlCatid = message.categorySelected;
        this.ctlb = message.brandSelected;
        this.ctlm = message.makerSelected;
        console.log('co'+this.co);
        console.log('cat id '+this.ctlCatid);
        console.log('brand '+ this.ctlb);
        console.log('maker '+this.ctlm);

      //  if(ctlCatname){this.cons}
    }

    connectedCallback() {
     
        this.subscribeToMessageChannel();
    }

         updateContactHandler(event){
           //this.visibleContacts = [...event.detail.records]
           this.visibleContacts = [...event.detail.yy];
           console.log(event.detail.yy);
        }

}