/*
 * File: app/view/searchEngineDialogViewController.js
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

Ext.define('MyApp.view.searchEngineDialogViewController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.searchenginedialog',

	initialize: function() {
		this.initForm();

	},

	initForm: function() {
		let view = this.view;
		let rec = view._record || null;
		let form = this.lookup('searchEngineForm');
		let searchEngineId = rec ? rec.get('seId') : null;

		view._recId = view._record ? view._record.get('id') : null;

		this.lookup('saveButton').setText(view._recId ? 'Save' : 'Add');

		let tpl = Ext.create('Ext.XTemplate',
			'<div class="se-block se-block-small">',
				'<div class="se-pic">',
					'{[this.img(values.id)]}',
				'</div>',
				'<div class="se-text">',
					'{name}',
				'</div>',
			'</div>',
			{
				img: MyApp.shared.seImgTagBuilder
			}
		);

		form.add({
			xtype: 'mycombo',
			store: 'searchEngineSettings',

			name: 'searchEngine',
			label: 'Search Engine',

			value: searchEngineId,

			valueField: 'id',
			displayField: 'name',

			queryMode: 'local',

			forceSelection: true,
			editable: false,

			listeners: {
				change: 'onSearchEngineChange'
			},

			itemTpl: tpl
		});

		if (searchEngineId)
			this.updateForm();
	},

	updateForm: function() {
		let view = this.view;
		let rec = view._record || null;
		let form = this.lookup('searchEngineForm');

		while ((form.getAt(1)))
			form.removeAt(1);

		let searchEngineId = form.getValues().searchEngine;
		let searchEngineSettingsStore = Ext.data.StoreManager.lookup('searchEngineSettings');
		let searchEngineRec = searchEngineSettingsStore.getById(searchEngineId);

		if (!searchEngineRec) return;

		let settingsKeys = searchEngineRec.get('settings');
		let editableSettings = searchEngineRec.get('editableSettings');
		let defaultSettings = searchEngineRec.get('defaultSettings');

		Ext.Array.each(settingsKeys, (settingsKey) => {

			let store = Ext.data.StoreManager.lookup('searchEngineSettingsDictionary_' + settingsKey);
			let xtype = store ? 'combobox' : 'textfield';

			let item = {
				xtype: xtype,
				store: store,

				name: settingsKey,
				label: editableSettings[settingsKey].label,

				value: rec ? rec.get('settings')[settingsKey] : defaultSettings[settingsKey]
			};

			if (store)
				Ext.apply(item, {
					valueField: store._long ? 'name' : 'id',
					displayField: 'name',

					queryMode: store._long ? 'remote' : 'local',

					forceSelection: !store._long,

					queryParam: 'search',

					listeners: {
						beforequery: (queryPlan) => {

						}
					}
				});

			form.add(item);
		});

		delete view._record;

	},

	onSearchEngineChange: function() {
		this.updateForm();
	},

	onSave: function(butten, e) {
		let view = this.view;
		let form = this.lookup('searchEngineForm');

		let formValues = form.getValues();
		let infoValues = {};

		Ext.Object.each(formValues, (key, value) => {

			if (key == 'searchEngine') return;

			let store = Ext.data.StoreManager.lookup('searchEngineSettingsDictionary_' + key);
			let rec = store ? store.getById(value) : null;
			infoValues[key] = rec ? rec.get('name') : value;

		});

		let searchEngineId = form.getValues().searchEngine;
		let searchEngineSettingsStore = Ext.data.StoreManager.lookup('searchEngineSettings');
		let searchEngineRec = searchEngineSettingsStore.getById(searchEngineId);

		let searchEnginesStore = Ext.data.StoreManager.lookup('searchEngines');

		let record = view._recId ? searchEnginesStore.getById(view._recId) : searchEnginesStore.add({})[0];

		record.set({
			seId: searchEngineId,
			name: searchEngineRec.get('name'),
			info: Ext.Object.getValues(infoValues).join(', ').replace(/(,\s)+/g, ', ').replace(/(,\s)$/g, ''),
			settings: formValues
		});

		view.close();
	},

	onCancel: function(button, e) {
		this.view.close();
	}

});