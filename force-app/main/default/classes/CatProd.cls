public with sharing class CatProd {
    public CatProd() {
           
    }

    @AuraEnabled(cacheable=true)
    public static List<ProductStore__c> getProducts(String searchText){
     searchText = '%'+ searchText+'%';  
     List<ProductStore__c> prodlist=  [Select Name,Id,image__c,Price__c,Quantity__c,Brand__c from ProductStore__c where Name LIKE:searchText];
     return prodlist;
    }
    //getProducts

    @AuraEnabled(cacheable=true)
    public static List<ProductStore__c> getProductsinAsce(String searchText){
     searchText = '%'+ searchText+'%';  
     List<ProductStore__c> prodlist=  [Select Name,Id,image__c,Price__c,Quantity__c,Brand__c from ProductStore__c where Name LIKE:searchText ORDER BY Name];
     return prodlist;
    }

    @AuraEnabled(cacheable=true)
    public static List<ProductStore__c> getProductsinDesc(String searchText){
     searchText = '%'+ searchText+'%';  
     List<ProductStore__c> prodlist=  [Select Name,Id,image__c,Price__c,Quantity__c,Brand__c from ProductStore__c where Name LIKE:searchText ORDER BY Name DESC];
     return prodlist;
    }


    @AuraEnabled(cacheable=true)
    public static List<ProductStore__c> getCategorySelected(String categoryId){  
     List<ProductStore__c> prodlist= [Select Name,Id,image__c,Price__c,Quantity__c,Brand__c,Category__r.Id from ProductStore__c where Category__r.Id=:categoryId];
     return prodlist;
    }
// getCategorySelected
    @AuraEnabled(cacheable=true)
    public static List<ProductStore__c> getBrandSelected(String brandName){
        List<ProductStore__c> prodlist= [Select Name,Id,image__c,Price__c,Quantity__c,Brand__c from ProductStore__c where Brand__c=:brandName];
        return prodlist;
    }
    //getBrandSelected
    @AuraEnabled(cacheable=true)
    public static List<ProductStore__c> getMakerSelected(String makerName){
        List<ProductStore__c> prodlist= [Select Name,Id,image__c,Price__c,Quantity__c,Brand__c,Maker__c from ProductStore__c where Maker__c=:makerName];
        return prodlist;
    }
//getMakerSelected
    @AuraEnabled(cacheable=true)
    public static List<ProductStore__c> getComb_cat_brandSelected(String categoryId,String brandName){
        List<ProductStore__c> prodlist= [Select Name,Id,image__c,Price__c,Quantity__c,Brand__c,Maker__c,Category__r.Id from ProductStore__c where Category__r.Id=:categoryId AND Brand__c=:brandName];
        return prodlist;
    }
//getComb_cat_brandSelected
    @AuraEnabled(cacheable=true)
    public static List<ProductStore__c> getComb_cat_makerSelected(String categoryId,String makerName){
        List<ProductStore__c> prodlist= [Select Name,Id,image__c,Price__c,Quantity__c,Brand__c,Maker__c,Category__r.Id from ProductStore__c where Category__r.Id=:categoryId AND Maker__c=:makerName];
        return prodlist;
    }
//getComb_cat_makerSelected
    @AuraEnabled(cacheable=true)
    public static List<ProductStore__c> getComb_brand_makerSelected(String brandName,String makerName){
        List<ProductStore__c> prodlist= [Select Name,Id,image__c,Price__c,Quantity__c,Brand__c,Maker__c from ProductStore__c where Maker__c=:makerName AND Brand__c=:brandName];
        return prodlist;
    }
//getComb_brand_makerSelected
    @AuraEnabled(cacheable=true)
    public static List<ProductStore__c> getComb_cat_maker_brandSelected(String categoryId,String brandName,String makerName){
        List<ProductStore__c> prodlist= [Select Name,Id,image__c,Price__c,Quantity__c,Brand__c,Maker__c,Category__r.Id from ProductStore__c where Category__r.Id=:categoryId AND Maker__c=:makerName AND Brand__c=:brandName];
        return prodlist;
    }
   //getComb_cat_maker_brandSelected

    @AuraEnabled(cacheable=true)
    public static Map<String,String> getCategories(){
        Map<String,String> CategoryMap = new Map<String,String>();
        List<Category__c>  catlist =   [Select Id,Name from Category__c]; 
        
        for(Category__c obj:catlist){
            CategoryMap.put(obj.Id,obj.Name);
        }
        return CategoryMap;
    }

    @AuraEnabled(cacheable=true)
    public static Map<String,String> getBrands(){
        Map<String,String> ProdbrandMap = new Map<String,String>();
        List<ProductStore__c>  prodbrandlist =   [Select Id,Brand__c from ProductStore__c]; 
        Set<String> s = new Set<String>();
        for(ProductStore__c obj:prodbrandlist){
            s.add(obj.Brand__c);
        }
        for(String strBrand:s){
            ProdbrandMap.put(strBrand,strBrand);
        }
        return ProdbrandMap;
    } 

    @AuraEnabled(cacheable=true)
    public static Map<String,String> getMakers(){
        Map<String,String> ProdmakerMap = new Map<String,String>();
        List<ProductStore__c>  prodmakerlist =   [Select Id,Maker__c from ProductStore__c]; 
        Set<String> s = new Set<String>();
        for(ProductStore__c obj:prodmakerlist){
            s.add(obj.Maker__c);
        }
        for(String strMaker:s){
            ProdmakerMap.put(strMaker,strMaker);
        }
        return ProdmakerMap;
    } 
}


//getProducts
// getCategorySelected
 //getBrandSelected
 //getMakerSelected
 //getComb_cat_brandSelected  
 //getComb_cat_makerSelected 
 //getComb_brand_makerSelected 
  //getComb_cat_maker_brandSelected 
