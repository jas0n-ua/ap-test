/*
 * File: app/store/KeywordsAdditional.js
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

Ext.define('MyApp.store.KeywordsAdditional', {
	extend: 'Ext.data.Store',

	requires: [
		'MyApp.model.Keyword',
		'Ext.data.proxy.Memory',
		'Ext.data.reader.Json'
	],

	constructor: function(cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
			storeId: 'keywordsAdditional',
			model: 'MyApp.model.Keyword',
			proxy: {
				type: 'memory',
				reader: {
					type: 'json',
					rootProperty: 'keywords'
				}
			}
		}, cfg)]);
	}
});