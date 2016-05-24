/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import Dropdown from '../dropdown.js';

import List from '/ckeditor5/ui/list/list.js';
import ListView from '/ckeditor5/ui/list/listview.js';

/**
 * The basic list dropdown controller class.
 *
 * @memberOf ui.dropdown.list
 * @extends ui.dropdown.Dropdown
 */

export default class ListDropdown extends Dropdown {
	constructor( model, view ) {
		super( model, view );

		const content = this.model.content;

		// Collapse the dropdown when an item in the panel is clicked.
		content.on( 'execute', () => {
			this.model.isOn = false;
		} );

		this.panel.add( 'content', new List( content, new ListView( content ) ) );
	}
}

/**
 * The ListDropdown model interface.
 *
 * @memberOf ui.dropdown.list
 * @interface ListDropdownModel
 */

/**
 * Content of the dropdown used to create the List instance.
 *
 * @member {Boolean} ui.dropdown.list.ListDropdownModel#content
 */
