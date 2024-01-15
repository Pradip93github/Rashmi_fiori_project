sap.ui.define([
    'rashmi/sd/ord/controller/BaseController',
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Filter",
    
], function(Controller,FilterOperator,Filter) {
    'use strict';
    return Controller.extend("rashmi.sd.ord.controller.View1", {

        onInit:function(){

            this.oRuter = this.getOwnerComponent().getRouter();

        },

        onCall: function(oIndex){
            this.oRuter.navTo("superman",{
                productId : oIndex
            });
            // this.getView().getParent().to("idView2");
        },

           goToNextPage: function(oItemPath){
            
            var oItem = oItemPath.getParameter("listItem");
            var sPath = oItem.getBindingContextPath();

            var oInd = sPath.split("/")[sPath.split("/").length - 1];

            // var splitApp = this.getView().getParent().getParent();
            // var oV2 = splitApp.getDetailPages()[0];
            // oV2.bindElement(sPath);
            
            this.onCall(oInd); 

        },

        onDelete: function(oEvent){
            
            var oItem = oEvent.getParameter("listItem");
            var oListItem = this.getView().byId("idList");
                oListItem.removeItem(oItem);


        },

        onAdd: function(){

            this.oRuter.navTo("addProd");

        },

        onSearch: function(oEvent){
        //    debugger;
			var sQuery = oEvent.getSource().getValue();
		
				// var filter = new Filter("NAME", FilterOperator.Contains, sQuery);
                 var filter1 = new Filter("CATEGORY", FilterOperator.Contains, sQuery);
		
                // var aFilters = [filter , filter1 ];
			

            // var lFilter = new Filter({
            //     filters: aFilters,
            //     and: false
            // });

			// update list binding
			var oList = this.byId("idList");
			var oBinding = oList.getBinding("items");
			// oBinding.filter(lFilter, "Application");
            oBinding.filter(filter1, "Application");

        },


        
    });
    
});