public with sharing class OrderClass {
    @AuraEnabled(cacheable=true)
    public static Contact createContact(contact con) {
        insert con;
        return con;
    }

    @AuraEnabled(cacheable=true)
    public static void updateOrder(String orderId,String contactId,String address,Decimal amount) {
        OrderDetail__c od=new OrderDetail__c();
        od=[Select Address__c,
        Status__c,
        Contact_Id__c 
        From OrderDetail__c
        Where Id=:orderId];
        od.Contact_Id__c=contactId;
        od.Status__c='Order Placed';
        od.Address__c=address;
        od.Amount__c=amount;
        update od;
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContact() {
        return[Select Id,Email From Contact];
    }
}
