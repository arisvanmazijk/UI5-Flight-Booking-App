sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/ui/core/UIComponent",
   "sap/ui/core/routing/History",
   "sap/ui/model/Filter",
   "sap/ui/model/FilterOperator"
], function (Controller, UIComponent, History, Filter, FilterOperator) {
   "use strict";
   return Controller.extend("sap.ui.softwaris.flightapp.controller.Detail", {
		onInit : function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("flights").attachPatternMatched(this._onObjectMatched, this);			
		},
		
		_onObjectMatched: function (oEvent) {
			var aFilter = [];
			var carrid = window.decodeURIComponent(oEvent.getParameter("arguments").carrid);
			var connid = window.decodeURIComponent(oEvent.getParameter("arguments").connid);
			
			aFilter.push(new Filter("CARRID", FilterOperator.Contains, carrid));
			aFilter.push(new Filter("CONNID", FilterOperator.Contains, connid));
			
			var oList = this.byId("flightsList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);			
		},		
		
		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			
				if (sPreviousHash !== undefined) {
					window.history.go(-1);
				} else {
					var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter.navTo("landing");
				}
			},
			
		navToBooking: function () {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("booking");
		}			
	});
});