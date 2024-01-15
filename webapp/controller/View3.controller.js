sap.ui.define([
    'rashmi/sd/ord/controller/BaseController',
    "sap/ui/core/routing/History"
    
], function(Controller,History) {
    'use strict';

      return Controller.extend("rashmi.sd.ord.controller.View3",{
      
        onInit: function(){
        this.oRouter = this.getOwnerComponent().getRouter();
        this.oRouter.getRoute("spiderman").attachMatched(this.loadView3,this);

        },

        loadView3: function(OEvent){
            var sId = OEvent.getParameter("arguments").supplierId;
           var sPath= 'fruit>/suppliers/' + sId;
           this.getView().bindElement(sPath);
        },

        onBack: function(){
          const oHistory = History.getInstance();
			    const sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				const oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("superman", {}, true);
			}

        }



      })
    
});