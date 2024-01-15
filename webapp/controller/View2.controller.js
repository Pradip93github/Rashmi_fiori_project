sap.ui.define([
    'rashmi/sd/ord/controller/BaseController',
    'sap/m/MessageBox',
    'sap/m/MessageToast',
    'sap/ui/core/Fragment',
    'sap/m/DisplayListItem',
    'sap/ui/model/FilterOperator',
    'sap/ui/model/Filter'
    
], function(Controller,MessageBox,MessageToast,Fragment,DisplayListItem,FilterOperator,Filter) {
    'use strict';
     return Controller.extend("rashmi.sd.ord.controller.View2",{

        onInit: function(){
            this.oRouter = this.getOwnerComponent().getRouter();

            this.oRouter.getRoute("superman").attachMatched(this.loadview2, this);

        },

        loadview2: function(OEvent){
           
           var sId = OEvent.getParameter("arguments").productId;
           var sPath= '/' + sId;
           this.getView().bindElement(sPath,{
              expand: 'To_Supplier'
           });
        },

        onBack: function(){
            this.oRouter.navTo("startpage");
            // this.getView().getParent().to("idview1");

        },
        
        onCall: function(oId){
            this.oRouter.navTo("spiderman",{
                supplierId : oId
            })
        },

        goToView3: function(OEvent){
        
            var  oItem = OEvent.getParameter("listItem");
            var sPath = oItem.getBindingContextPath();
            var oInd = sPath.split("/")[sPath.split("/").length - 1];
            this.onCall(oInd);

        },
        
        //  this global object is act like a romote controll
        oSupplierPopup: null,
        onFilterSupplier: function(){
        //    MessageBox.confirm("sorry!work in progress");
        var that =  this;
        if(!this.oSupplierPopup){
            Fragment.load({
                fragmentName: "rashmi.sd.ord.fragments.popup",
                type: "XML",
                id:"supplier",
                controller:this
            }).then(function(oFragment){
                
                //  inside the collback/promis function we can not access this pointer, our controller object
                //  but we can access local veriable of our caller function 
                  that.oSupplierPopup = oFragment;
                  that.oSupplierPopup.setTitle("Supplier");
                //  data binding which will show in filter popup
                // allow fragment to access the all view parts
                that.getView().addDependent(that.oSupplierPopup);
                that.oSupplierPopup.bindAggregation("items",{
                    path : "fruit>/suppliers",
                    template : new DisplayListItem({
                        label:'{fruit>name}',
                        value : '{fruit>city}'

                    })
                 
                });
                oFragment.open();
            });

        }else{
            this.oSupplierPopup.open();
        };

        },
         
        oSelectField : null,
         oF4HelpPopup : null,
        onF4Help: function(oEvent){
            // MessageBox.confirm("sorry!work in progress");
            // bellow single line means it taking the snapshot on which line we press for f4 help
            this.oSelectField = oEvent.getSource();
            var that = this;
            if (!this.oF4HelpPopup) {
                Fragment.load({
                    fragmentName:"rashmi.sd.ord.fragments.popup",
                    type: "XML",
                    id: "city",
                    controller: this
                }).then(function(oFregment){
                    
                    // inside callback/promise function we can't call global variable using this
                    // so we need to declear our local veriable
                    
                    that.oF4HelpPopup = oFregment;
                    that.oF4HelpPopup.setTitle("city");
                    that.oF4HelpPopup.setMultiSelect(false);
                    that.getView().addDependent(that.oF4HelpPopup);
                    that.oF4HelpPopup.bindAggregation("items",{
                        path:"fruit>/cities",
                        template: new DisplayListItem({
                            label:'{fruit>name}',
                            value:'{fruit>otherName}'
                        })
                    });
                    oFregment.open();
                });
                
            } else {
                this.oF4HelpPopup.open();
            }
           
    
        },
        
        // below function will perform when user select any item on popup item list
        onSelectPopupItem: function(oEvent){
             debugger;
             
             
            //  need to read the fragment id to confirm the event trigger
            var sId = oEvent.getSource().getId();
            if (sId.indexOf("city") != -1) {
                var oItem = oEvent.getParameter("selectedItem");
                var oData = oItem.getLabel();
                this.oSelectField.setValue(oData);
                
            } else{
                var aItem = [];
                var oItems = oEvent.getParameter("selectedItems");

                for (let i = 0; i < oItems.length; i++) {
                    const element = oItems[i];

                    aItem.push(new Filter("name", FilterOperator.EQ, element.getLabel()));
                }

               var aFilter = new Filter({
                filters: aItem,
                and: false,
               });

                var oList = this.getView().byId("tableId");
                var oBinding = oList.getBinding("items");
                 oBinding.filter(aFilter, "Application");
                
            } 

            
            
        },


        onSearch: function(oEvent){
        
			var sQuery = oEvent.getParameter("value");
		    var filter = new Filter("name", FilterOperator.Contains, sQuery);
            var oBinding = oEvent.getParameter("itemsBinding");
			oBinding.filter(filter, "Application");

        },

        onSave: function(){
            var oModel = this.getView().getModel("i18n");
            var oBndl = oModel.getResourceBundle();
            MessageBox.confirm("Do you want to place the order",
            {
              onClose: function(status){
              
                if (status === 'OK'){
                    var sText = oBndl.getText("XMSG_SUCCESS",[999999]);
                    MessageToast.show(sText);
                }else{
                    MessageBox.error("oops!there must have problem");
                };
              },

            });
        }



     });
    
});