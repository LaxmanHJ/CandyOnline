import { LightningElement ,wire} from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import SAMPLEMC from '@salesforce/messageChannel/sfdcdemo__c';
import cattable from '@salesforce/apex/CatProd.getCategories';
import brandtable from '@salesforce/apex/CatProd.getBrands';
import makerstable from '@salesforce/apex/CatProd.getMakers';


export default class CandieFilter extends LightningElement {
    brandOptionList;
    makersOptionList;
    categoriesOptionList;
    selectedBrand;
    selectedCategory;
    selectedMaker;

    test1;

    searchKey = '';
  //  @wire (getContacts,{searchText:'$searchKey'}) cons;
    @wire(MessageContext)
    messageContext;

    @wire(cattable) 
    retrieveCats({error,data}){
        let tempArray = [];
        if(data){
            for(let key in data){
                //key->id , value->name
                //label->name , value->id
                tempArray.push({label:data[key],value:key});
            }
        }
        this.categoriesOptionList=tempArray;
    }

    @wire(brandtable) 
    retrieveBrands({error,data}){
        let tempArray = [];
        if(data){
            for(let key in data){
                tempArray.push({label:data[key],value:key});
            }
        }
        this.brandOptionList=tempArray;
    }

    @wire(makerstable) 
    retrieveMakers({error,data}){
        let tempArray = [];
        if(data){
            for(let key in data){
                tempArray.push({label:data[key],value:key});
            }
        }
        this.makersOptionList=tempArray;
    }



    handleTextChange(event){
     //   event.preventDefault();
        this.searchKey  = event.target.value;
        console.log('start '+this.searchKey);
    //  this.searchKey = event.target.value;
    const message = {
        conlist: this.searchKey
    };
    //    setTimeout(() => {
            publish(this.messageContext, SAMPLEMC, message);
            console.log('handletextchangepublished'+this.searchKey);
   //     },50);

 
    }
    resethandler(){
        this.searchKey = '';
       const message = {
        conlist: this.searchKey,
    };
  
            publish(this.messageContext, SAMPLEMC, message);
            
            console.log('resethandlerpublished'+this.searchKey);
    }

    // like init method
    connectedCallback(){
        setTimeout(()=>{
            this.resethandler();
            console.log('timeout over');
        },1000);
    }

    handleCategoryChange(event){
        this.selectedCategory = event.target.value;
        const message = {
            brandSelected : this.selectedBrand,
            makerSelected : this.selectedMaker,
            categorySelected : this.selectedCategory
        };
        //    setTimeout(() => {
        publish(this.messageContext, SAMPLEMC, message);
        console.log('handleCategoryChangepublished'+this.selectedCategory);
    }
    handleBrandChange(event){
        this.selectedBrand = event.target.value;
        const message = {
            brandSelected : this.selectedBrand,
            makerSelected : this.selectedMaker,
            categorySelected : this.selectedCategory
        };
        //    setTimeout(() => {
        publish(this.messageContext, SAMPLEMC, message);
        console.log('handlebrandchange '+this.selectedBrand);

    }
    handleMakerChange(event){
        this.selectedMaker = event.target.value;
        const message = {
            brandSelected : this.selectedBrand,
            makerSelected : this.selectedMaker,
            categorySelected : this.selectedCategory
        };
        //    setTimeout(() => {
        publish(this.messageContext, SAMPLEMC, message);
        console.log('handlemakerchange '+this.selectedMaker);
    }
}