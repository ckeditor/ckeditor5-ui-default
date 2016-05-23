/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import testUtils from '/tests/ckeditor5/_utils/utils.js';

import Model from '/ckeditor5/ui/model.js';
import Collection from '/ckeditor5/utils/collection.js';

import Dropdown from '/ckeditor5/ui/dropdown/dropdown.js';
import DropdownView from '/ckeditor5/ui/dropdown/dropdownview.js';

import ListDropdown from '/ckeditor5/ui/dropdown/list/listdropdown.js';
import ListDropdownView from '/ckeditor5/ui/dropdown/list/listdropdownview.js';

testUtils.createTestUIController( {
	dropdown: 'div#dropdown',
	listDropdown: 'div#list-dropdown'
} ).then( ui => {
	createEmptyDropdown( ui );
	createListDropdown( ui );
} );

function createEmptyDropdown( ui ) {
	const model = new Model( {
		label: 'Dropdown',
		isEnabled: true,
		isOn: false,
	} );

	const dropdown = new Dropdown( model, new DropdownView( model ) );

	ui.add( 'dropdown', dropdown );

	dropdown.panel.view.element.innerHTML = 'Empty panel. There is no child view in this DropdownPanelView.';
}

function createListDropdown( ui ) {
	const collection = new Collection( { idProperty: 'label' } );

	[ '0.8em', '1em', '1.2em', '1.5em', '2.0em', '3.0em' ].forEach( font => {
		collection.add( new Model( {
			label: font,
			style: `font-size: ${ font }`
		} ) );
	} );

	const itemListModel = new Model( {
		items: collection
	} );

	itemListModel.on( 'execute', ( evtInfo, itemModel ) => {
		/* global console */
		console.log( 'ListItem#execute', itemModel );
	} );

	const model = new Model( {
		label: 'ListDropdown',
		isEnabled: true,
		isOn: false,
		content: itemListModel
	} );

	const dropdown = new ListDropdown( model, new ListDropdownView( model ) );

	ui.add( 'listDropdown', dropdown );

	window.listDropdownModel = model;
	window.listDropdownCollection = collection;
	window.Model = Model;
}
