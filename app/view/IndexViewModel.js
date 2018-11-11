/*
 * File: app/view/IndexViewModel.js
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

Ext.define('MyApp.view.IndexViewModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.index',

	data: {
		step1Text: [
			'<span class="myapp-project-text">New project for lenta.ru</span>',
			'<span class="myapp-step-text">Add keywords (Step 1 of 2)</span><br><hr>'
		].join('<br>'),
		step2Text: '<span class="myapp-step-text">Add Search Engines (Step 2 of 2)</span><br><hr>',
		editMode: false
	}

});