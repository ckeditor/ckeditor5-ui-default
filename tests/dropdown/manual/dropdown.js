/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import Model from '/ckeditor5/ui/model.js';
import Collection from '/ckeditor5/utils/collection.js';

import DropdownList from '/ckeditor5/ui/dropdown/dropdownlist.js';
import DropdownListView from '/ckeditor5/ui/dropdown/dropdownlistview.js';

import Dropdown from '/ckeditor5/ui/dropdown/dropdown.js';
import DropdownView from '/ckeditor5/ui/dropdown/dropdownview.js';

//---------------------------

window.Model = Model;

//---------------------------

const itemsCollection = window.itemsCollection = new Collection();

itemsCollection.add( new Model( {
	label: 'Arial',
	style: 'font-family: arial'
} ) );

itemsCollection.add( new Model( {
	label: 'Times New Roman',
	style: 'font-family: "Times New Roman"'
} ) );

itemsCollection.add( new Model( {
	label: 'Comic Sans',
	style: 'font-family: "Comic Sans MS"'
} ) );

const dropdownListModel = new Model( {
	items: itemsCollection
} );

const dropdownList = new DropdownList( dropdownListModel, new DropdownListView( dropdownListModel ) );

//---------------------------

const dropdownModel = window.dropdownModel = new Model( {
	label: 'Font',
	isEnabled: true,
	isOn: false,
	content: dropdownList
} );

const dropdown = window.dropdown = new Dropdown( dropdownModel, new DropdownView( dropdownModel ) );

dropdown.init();

document.body.appendChild( dropdown.view.element );

