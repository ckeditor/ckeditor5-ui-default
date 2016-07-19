/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import Dropdown from '../dropdown.js';

import List from '../../list/list.js';
import ListView from '../../list/listview.js';

/**
 * The list dropdown controller class. It represents a dropdown
 * with a {@link ui.list.List} component.
 *
 *		const model = new Model( {
 *			label: 'List Dropdown',
 *			isEnabled: true,
 *			isOn: false,
 *			content: {@link ui.dropdown.list.ListDropdownModel#content}
 *		} );
 *
 *		// An instance of Dropdown.
 *		new ListDropdown( model, new ListDropdownView() );
 *
 * See {@link ui.dropdown.list.ListDropdownView}.
 *
 * @memberOf ui.dropdown.list
 * @extends ui.dropdown.Dropdown
 */
export default class ListDropdown extends Dropdown {
	/**
	 * Creates an instance of {@link ui.dropdown.list.ListDropdown} class.
	 *
	 * @param {ui.dropdown.list.ListDropdownModel} model Model of this list dropdown.
	 * @param {ui.View} view View of this list dropdown.
	 */
	constructor( model, view ) {
		super( model, view );

		const listModel = this.model.content;

		// Collapse the dropdown when an item in the panel is clicked.
		this.listenTo( listModel, 'execute', () => {
			view.model.isOpen = false;
		} );

		/**
		 * List of this list dropdown.
		 *
		 * @readonly
		 * @member {ui.list.List} ui.dropdown.list.ListDropdown#list
		 */
		this.list = new List( listModel, new ListView() );

		this.panel.add( 'content', this.list );
	}
}

/**
 * The list dropdown model interface.
 *
 * @extends ui.dropdown.DropdownModel
 * @interface ui.dropdown.list.ListDropdownModel
 */

/**
 * Content of the list dropdown used to create the {@link ui.list.List} instance.
 * Usually {@link ui.list.ListModel}.
 *
 * @member {Boolean} ui.dropdown.list.ListDropdownModel#content
 */
