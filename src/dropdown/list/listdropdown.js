/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import Dropdown from '../dropdown.js';

import List from '../../list/list.js';
import ListView from '../../list/listview.js';

/**
 * The basic list dropdown controller class.
 *
 * @memberOf ui.dropdown.list
 * @extends ui.dropdown.Dropdown
 */
export default class ListDropdown extends Dropdown {
	constructor( model, view ) {
		super( model, view );

		view.model.bind( 'isOn' ).to( model );

		const content = this.model.content;

		// Collapse the dropdown when an item in the panel is clicked.
		this.listenTo( content, 'execute', () => {
			this.model.isOn = false;
		} );

		// Collapse the dropdown when the webpage outside of the component is clicked.
		this.listenTo( view.model, 'close', () => {
			this.model.isOn = false;
		} );

		this.panel.add( 'content', new List( content, new ListView() ) );
	}
}

/**
 * The ListDropdown model interface.
 *
 * @memberOf ui.dropdown.list
 * @interface ui.dropdown.list.ListDropdownModel
 */

/**
 * Content of the dropdown used to create the List instance.
 *
 * @member {Boolean} ui.dropdown.list.ListDropdownModel#content
 */
