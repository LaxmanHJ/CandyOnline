import { LightningElement ,api} from 'lwc';

export default class Paginsfdc extends LightningElement {
    currentPage =1;
    @api recordSize = 9;
    totalRecords;
     totalPage=1;
     visibleRecords;
    get records(){
      // return this.visibleRecords; 
   }
      @api 
     set records(data){
       if(data){
          console.log('entered pagination method'+data);
          this.totalRecords = data;
          this.totalPage = Math.ceil(data.length/this.recordSize);
          this.updateRecords();   
       }   
    }

get disablePrev(){
      return this.currentPage<=1;
  }

 get disableNext(){
       return this.currentPage>=this.totalPage;
 }

    prevHandler(){
        if(this.currentPage>1){
          this.currentPage = this.currentPage-1;
           this.updateRecords();
        }
    }

    nextHandler(){
       if(this.currentPage<this.totalPage){
         this.currentPage = this.currentPage+1;
         this.updateRecords();
       }
    } 

    updateRecords(){
       const start = (this.currentPage-1)*this.recordSize;
       const end = this.recordSize*this.currentPage;
       this.visibleRecords = this.totalRecords.slice(start,end);
       this.dispatchEvent(new CustomEvent('passevent',{
          detail : {
            //    records : this.visibleRecords
            yy :   this.visibleRecords
          } 
       })); 
    } 
}