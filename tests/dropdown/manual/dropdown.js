/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import testUtils from '/tests/ui/_utils/utils.js';

import Model from '/ckeditor5/ui/model.js';
import Collection from '/ckeditor5/utils/collection.js';

import Dropdown from '/ckeditor5/ui/dropdown/dropdown.js';
import DropdownView from '/ckeditor5/ui/dropdown/dropdownview.js';

import ListDropdown from '/ckeditor5/ui/dropdown/list/listdropdown.js';
import ListDropdownView from '/ckeditor5/ui/dropdown/list/listdropdownview.js';

testUtils.createTestUIController( {
	dropdown: 'div#dropdown',
	listDropdown: 'div#list-dropdown',
	dropdownShared: 'div#dropdown-shared',
	dropdownLabel: 'div#dropdown-label'
} ).then( ui => {
	createEmptyDropdown( ui );
	createListDropdown( ui );
	createSharedModelDropdowns( ui );
	createLongLabelDropdown( ui );
} );

function createEmptyDropdown( ui ) {
	const dropdown = createDropdown( {
		label: 'Dropdown',
		isEnabled: true,
		isOn: false,
		withText: true
	} );

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
		withText: true,
		content: itemListModel
	} );

	const dropdown = new ListDropdown( model, new ListDropdownView() );

	ui.add( 'listDropdown', dropdown );

	window.listDropdownModel = model;
	window.listDropdownCollection = collection;
	window.Model = Model;
}

function createSharedModelDropdowns( ui ) {
	const modelDef = {
		label: 'Shared Model',
		isEnabled: true,
		isOn: false,
		withText: true
	};

	const dropdown1 = createDropdown( modelDef );
	const dropdown2 = createDropdown( modelDef );

	ui.add( 'dropdownShared', dropdown1 );
	ui.add( 'dropdownShared', dropdown2 );

	dropdown1.panel.view.element.innerHTML = dropdown2.panel.view.element.innerHTML = 'Empty panel.';
}

function createLongLabelDropdown( ui ) {
	const dropdown = createDropdown( {
		label: 'Dropdown with a very long label',
		isEnabled: true,
		isOn: false,
		withText: true
	} );

	ui.add( 'dropdownLabel', dropdown );

	dropdown.panel.view.element.innerHTML = 'Empty panel. There is no child view in this DropdownPanelView.';
}

function createDropdown( modelDef ) {
	return new Dropdown( new Model( modelDef ), new DropdownView() );
}
