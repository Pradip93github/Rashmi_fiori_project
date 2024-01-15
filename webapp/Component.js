sap.ui.define([
    'sap/ui/core/UIComponent'
    
], function(UIComponent) {
    'use strict';

    return UIComponent.extend("rashmi.sd.ord.Component",{

        metadata:{
            manifest: "json"
        },

        init: function(){
            UIComponent.prototype.init.apply(this); 
            var oRuter = this.getRouter();
            oRuter.initialize();
        },

        // createContent : function(){
        //    var oAppView = new sap.ui.view({
        //     viewName: "rashmi.sd.ord.view.App",
        //     type: "XML",
        //     id: "idAppView"
        //    });

        //     // step1 create both view object
        //    var oView1 = new sap.ui.view({
        //     viewName: "rashmi.sd.ord.view.View1",
        //     type: "XML",
        //     id: "idview1"
        //    });

        //    var oView2 = new sap.ui.view({
        //       viewName: "rashmi.sd.ord.view.View2",
        //       id: "idView2",
        //       type: "XML"
        //    });

        // //    stepe get the ContainerControl which is inside my root view
        //    var oContainerControll =  oAppView.byId("idAppCon");

        // //   Step3 add all view inside the ContainerControl
        // //    oContainerControll.addPage(oView1).addPage(oView2);/
        // oContainerControll.addMasterPage(oView1).addDetailPage(oView2);
        //    return oAppView;
        // },

        destroy:{

        }


    });
    
});