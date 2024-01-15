sap.ui.define([
    'rashmi/sd/ord/controller/BaseController',
    'sap/ui/model/json/JSONModel',
    'sap/m/MessageBox',
    'sap/m/MessageToast'

], function(Controller,JSONModel,MessageBox,MessageToast) {
    'use strict';
    return Controller.extend("rashmi.sd.ord.controller.Add",{

        onInit: function(){
          
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("addProd").attachMatched(this.loadAddView, this);

            this.lModel = new JSONModel();
             
            this.lModel.setData({
         "prodData" : {
                "PRODUCT_ID" : " ",
                "TYPE_CODE" : "PR",
                "CATEGORY" : "Notebooks",
                "NAME" : " ",
                "SUPPLIER_ID" : "0100000046",
                "SUPPLIER_NAME" : "SAP",
                "TAX_TARIF_CODE" : "1",
                "WEIGHT_MEASURE" : "4.200",
                "WEIGHT_UNIT" : "KG",
                "PRICE" : "0.00",
                "CURRENCY_CODE" : " ",
              }
            });

            this.getView().setModel(this.lModel,"prod");


        },

        loadAddView: function(oEvent){
          this.setMode("Create");
        },
        
       mode: "Create",
      setMode: function(oMode){
          this.mode = oMode;
        if (this.mode === "Create") {
            this.getView().byId("idSave").setText("Save");
            this.getView().byId("prdId").setEnabled(true);
            
        } else {
            this.getView().byId("idSave").setText("Update");
            this.getView().byId("prdId").setEnabled(false);
            
        }
      },

      showImage: function(pId){
        debugger;
        this.getView().byId("imgId").setSrc("/sap/opu/odata/sap/ZEPM_PRODUCT_SUPPLIER_SRV/ProductImgSet('" + pId + "')/$value");

      },

      productId: "",
      onEnter: function(oEvent){
        var that = this;
        // step:1 get the enter value.
        this.productId = oEvent.getParameter("value");
        // step:2 get the model object
        var oModel = this.getView().getModel();
        //  step:3 call the oData model to read the record

        //  Get method to fetch single record
        oModel.read("/ZPRODUCTSet('" + this.productId  + "')",{
           success: function(sData){
            that.lModel.setProperty("/prodData" , sData );
            that.setMode("Update");
            that.showImage(that.productId);
           },

           error: function(eData){
             MessageToast.show("Product Can not found please create the product");
             that.setMode("Create");
           },

        });
        //  step:4 hendel the call back
      },


        onClear: function(){
            this.lModel.setProperty("/prodData", {
                "PRODUCT_ID" : " ",
                "TYPE_CODE" : "PR",
                "CATEGORY" : "Notebooks",
                "NAME" : " ",
                "SUPPLIER_ID" : "0100000046",
                "SUPPLIER_NAME" : "SAP",
                "TAX_TARIF_CODE" : "1",
                "WEIGHT_MEASURE" : "4.200",
                "WEIGHT_UNIT" : "KG",
                "PRICE" : "0.00",
                "CURRENCY_CODE" : " ",
              }),
              this.setMode("Create");
              this.showImage();
        },

        onDelete: function( ){
            //  Step 1: Get the key field from UI to be delete.
            
            var productId = this.lModel.getProperty("/prodData/PRODUCT_ID");
            //  Step:2 validate key field value balk or not
             if (productId === " ") {
                MessageBox.error("Please enter valid productId to be delete");
                return;
             }

            //  Step:4 Get OData model
            var oModel = this.getView().getModel();
            //   step user confirmetion before delete
            var that = this;
            MessageBox.confirm("Do you wish to delete the product",{
                onClose: function(status){
                    debugger;
                 if (status === 'OK') {
                   oModel.remove("/ZPRODUCTSet('" + productId + "')",{
                   success: function( ){
                      MessageBox.confirm("Product Id is deleted successfully");
                      that.onClear();
                      that.showImage();
                       },
                  error: function(eData){
                     MessageBox.error(JSON.parse(eData.responseText).error.innererror.errordetails[0].message);
                  }
                });
                    
                 }

                }

            });
        },

        getExpProd: function(){
            //  Step1: get catagory from ui
            var category = this.getView().byId("cId").getSelectedKey();
            var oCat = this.lModel.getProperty("/prodData/CATEGORY");
            //  Step2 get the oData model.
            var oModel = this.getView().getModel();
            //  step3 call function import
            var that = this;
            oModel.callFunction("/GetMostExpensiveProduct",{
                urlParameters: {
                 "I_CATEGORY" : category,
                },
                success: function(data){
                    that.lModel.setProperty("/prodData",data);
                    // set default product id
                     that.productId = data.PRODUCT_ID; 
                    that.setMode("Update");
                    that.showImage(that.productId);
                }
            })

        },

        onSave: function(){
            // step1: get the payload
            var payload = this.lModel.getProperty("/prodData");
            // step2 pre check data
            
            if (payload.PRODUCT_ID === " ") {
                MessageBox.error("Please enter the valid product id");
                return;
            }
            //  step3: get the odata model for post
             var oDataModel = this.getView().getModel();

            //  step4: post the data to back end

            if (this.mode === "Create") {
                // POST method to create 
                var that = this;
                oDataModel.create("/ZPRODUCTSet",payload,{
                    //  step5 get the response success error
                    success: function(sData){
                       MessageToast.show("Congrets! data has been posted successfully");
                       that.showImage();
                    },
                    error: function(eData){
                       debugger; 
                       MessageBox.error(JSON.parse(eData.responseText).error.innererror.errordetails[0].message);
                    }
    
                });
                
            } else {
                //  POST method to update 
                oDataModel.update("/ZPRODUCTSet('" + this.productId + "')",payload,{
                    //  step5 get the response success error
                    success: function(sData){
                       MessageToast.show("Congrets! data has been update successfully");
                    },
                    error: function(eData){
                       debugger; 
                       MessageBox.error(JSON.parse(eData.responseText).error.innererror.errordetails[0].message);
                    }
                });
            }
        },

        onBack: function(){
            this.oRouter.navTo("startpage");
        }


    })
    
});