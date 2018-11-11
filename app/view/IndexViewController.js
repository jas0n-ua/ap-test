/*
 * File: app/view/IndexViewController.js
 *
 * This file was generated by Sencha Architect version 4.2.4.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 6.6.x Modern library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 6.6.x Modern. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('MyApp.view.IndexViewController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.index',

	config: {
		preferences: null
	},

	initialize: function() {
		this.loadPreferences();
	},

	loadPreferences: function() {
		let view = this.view;

		view.setMasked({xtype: 'loadmask'});

		Ext.Ajax.request({

		    method: 'post',
		    url: 'https://cors-anywhere.herokuapp.com/https://spyserp.com/panel/apiclient',
			//url: 'data/1.json',

		    jsonData: {method: "projectCustom", domain: "lenta.ru", withSettings: 1}


		}).then((response) => {

		    let data = Ext.decode(response.responseText);
		    console.dir(data);

		    let keywordsStore = Ext.data.StoreManager.lookup('keywords');
		    keywordsStore.loadRawData(data);

			let searchEngineSettingsStore = Ext.data.StoreManager.lookup('searchEngineSettings');
		    searchEngineSettingsStore.loadRawData(Ext.Object.getValues(data.engines));

			// create store for predefinedSettings keys
			Ext.Object.each(data.predefinedSettings, (key, value) => {

				if (value.long)
				{
					Ext.create({
						xclass: 'Ext.data.JsonStore',
						storeId: 'searchEngineSettingsDictionary_' + key,

						fields: ['id', 'name'],

						data: value.values,
						_long: value.long,

						proxy: {
							type: 'myajax',

							url: 'https://cors-anywhere.herokuapp.com/https://spyserp.com/panel/apiclient',

							actionMethods: {
								create: 'POST',
								read: 'POST',
								update: 'POST',
								destroy: 'POST'
							},

							noCache: false,
							paramsAsJson: true,

							extraParams: {
								method: 'searchEnginesLoadSettings',
								key: key
							},

							reader: {
								type: 'json',

								transform: (data) => {

									if (Ext.isArray(data))
										return data;

									let res = [];

									Ext.Object.each(data, (key, value) => {
										res.push([key, value]);
									});

									return res;
								},

							}
						}
					});
				}
				else
				{
					Ext.create({
						xclass: 'Ext.data.ArrayStore',
						storeId: 'searchEngineSettingsDictionary_' + key,

						fields: ['id', 'name'],
						data: value.values,
						_long: value.long
					});
				}



			});

			let searchEnginesStore = Ext.data.StoreManager.lookup('searchEngines');
			searchEngineSettingsStore.each((searchEngineRec, i) => {

				if (i>1) return false;

				let settingsKeys = searchEngineRec.get('settings');
				let defaultSettings = searchEngineRec.get('defaultSettings');

				let settings = {};
				let infoValues = {};

				Ext.Array.each(settingsKeys, (key) => {

					let value = defaultSettings[key];

					settings[key] = value;

					let store = Ext.data.StoreManager.lookup('searchEngineSettingsDictionary_' + key);

					let rec = store ? store.getById(value) : null;
					infoValues[key] = rec ? rec.get('name') : value;

				});

				searchEnginesStore.add({
					seId: searchEngineRec.get('id'),
					name: searchEngineRec.get('name'),
					info: Ext.Object.getValues(infoValues).join(', ').replace(/(,\s)+/g, ', ').replace(/(,\s)$/g, ''),
					settings: settings
				});

			});




		}).always(() => {

		    view.unmask();

		}).otherwise((reason) => {

		    console.log(reason);

		});

	},

	onKeywordsImportFromFile: function(button, e) {
		Ext.Msg.alert('Not yet implemented');
	},

	onKeywordsAnalyzeCompetitors: function(button, e) {
		Ext.Viewport.add({xclass: 'MyApp.view.keywordsDialog'}).show();
	},

	onKeywordsDelete: function(grid, info) {
		info.record.store.remove(info.record);
	},

	onKeywordsEdit: function(button, e) {
		this.getViewModel().set('editMode', true);

		let editor = this.lookup('keywordsEditor');
		let grid = this.lookup('keywordsGrid');

		let keywords = [];
		grid.getStore().each((rec) => {
			keywords.push(rec.get('keyword'));
		});

		editor.setValue(keywords.join('\n'));
	},

	onKeywordsSave: function(button, e) {
		this.getViewModel().set('editMode', false);

		let editor = this.lookup('keywordsEditor');
		let grid = this.lookup('keywordsGrid');

		let keywordsText = editor.getValue();
		editor.reset();

		let keywords = keywordsText.split('\n');
		let store = grid.getStore();
		let newData = [];

		Ext.each(keywords, (keyword) => {

			keyword = keyword.trim();

			if (!keyword.length)
				return;

			let rec = store.findRecord('keyword', keyword, 0, false, false, true);
			if (rec)
				newData.push(rec.getData());
			else
				newData.push({keyword: keyword, frequency: 0});
		});

		store.loadData(newData);
	},

	onKeywordsCancel: function(button, e) {
		this.getViewModel().set('editMode', false);

		this.lookup('keywordsEditor').reset();
	},

	onSearchEngineAdd: function(button, e) {
		let searchEnginesStore = Ext.data.StoreManager.lookup('searchEngines');
		if (searchEnginesStore.getCount() >= 10)
			Ext.Msg.alert('Error', 'Only 10 search engines can be added');
		else
			Ext.Viewport.add({xclass: 'MyApp.view.searchEngineDialog', title: 'Add Search Engine'}).show();
	},

	onSearchEngineEdit: function(grid, info) {
		Ext.Viewport.add({xclass: 'MyApp.view.searchEngineDialog', title: 'Edit Search Engine', _record: info.record}).show();
	},

	onSearchEngineRemove: function(grid, info) {
		info.record.store.remove(info.record);
	}

});