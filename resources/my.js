Ext.define('MyApp.MyCombo', {
	extend: 'Ext.field.ComboBox',
	alias: 'widget.mycombo',

	updateValue:function (value){
		this.imgHolder.dom.innerHTML = MyApp.shared.seImgTagBuilder(value);
		return this.callParent(arguments);
	},
		
	getBodyTemplate: function(){
		var res = this.callParent(arguments);
		
		Ext.Array.insert(res[0].children, 1, [{
			cls: 'myapp-img-holder',
			reference: 'imgHolder'
		}]);
		
		return res;
	}
});

MyApp.shared = MyApp.shared || {};

MyApp.shared.seImgMap = {
	1: 'google.png',
	3: 'yandex.png',
	1004: 'bing.png',
	1006: 'google.png',
	1007: 'seznam.png'
};

MyApp.shared.seImgTagBuilder = function(seId)
{
	return MyApp.shared.seImgMap[seId] ? '<img src="/resources/se-icons/' + MyApp.shared.seImgMap[seId] + '">' : '';
};

Ext.define('Ext.data.proxy.MyAjax', {
    extend: 'Ext.data.proxy.Ajax',
	alias: 'proxy.myajax',
	
	getParams: function(operation){
		var params = this.callParent(arguments);
		params.search = Ext.isArray(params.search) ? params.search.join('') : params.search;
		return params;
	}
});