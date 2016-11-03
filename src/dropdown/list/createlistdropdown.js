/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* global document */

import ListView from '../../list/listview.js';
import ListItemView from '../../list/listitemview.js';
import createDropdown from '../createDropdown.js';

/**
 * Creates an instance of {@link ui.dropdown.list.ListDropdownView} class using
 * defined model.
 *
 * @param {ui.dropdown.ListDropdownModel} model Model of this list dropdown.
 * @param {utils.Locale} locale The {@link core.editor.Editor#locale editor's locale} instance.
 * @returns {ui.dropdown.list.ListDropdownView} The list dropdown view instance.
 */
export default function createListDropdown( model, locale ) {
	const dropdownView = createDropdown( model, locale );

	/**
	 * List of the list dropdown view.
	 *
	 * @readonly
	 * @member {ui.dropdown.ListDropdownView} ui.dropdown.ListDropdownView#listView
	 */
	const listView = dropdownView.listView = new ListView( locale );

	listView.items.bindTo( model.items ).as( itemModel => {
		const item = new ListItemView( locale );

		// Bind all attributes of the model to the item view.
		item.bind( ...Object.keys( itemModel ) ).to( itemModel );

		return item;
	} );

	// TODO: Delegate all events instead of just execute.
	listView.items.delegate( 'execute' ).to( dropdownView );

	dropdownView.panelView.children.add( listView );

	dropdownView.on( 'change:isOpen', ( evt, name, value ) => {
		if ( value ) {
			attachDocumentClickListener( dropdownView );
		} else {
			dropdownView.stopListening( document );
		}
	} );

	// Close the dropdown when one of the list items has been executed.
	dropdownView.on( 'execute', () => {
		dropdownView.isOpen = false;
	} );

	return dropdownView;
}

// Attaches a "click" listener in DOM to check if any element outside
// the dropdown has been clicked.
//
// @private
// @param {ui.dropdown.ListDropdownView} dropdownView
function attachDocumentClickListener( dropdownView ) {
	// TODO: It will probably be focus/blur-based rather than click. It should be bound
	// to focusmanager of some sort.
	dropdownView.listenTo( document, 'click', ( evtInfo, { target: domEvtTarget } ) => {
		// Collapse the dropdown when the webpage outside of the component is clicked.
		if ( dropdownView.element != domEvtTarget && !dropdownView.element.contains( domEvtTarget ) ) {
			dropdownView.isOpen = false;
		}
	} );
}

/**
 * The list dropdown model interface.
 *
 * @extends ui.dropdown.DropdownModel
 * @interface ui.dropdown.list.ListDropdownModel
 */

/**
 * A {@link utils.Collection} of {@link utils.Observable} used to populate
 * the inner {@link ui.list.List} instance.
 *
 * Usually {@link ui.list.ListModel}.
 *
 * @observable
 * @member {Boolean} ui.dropdown.list.ListDropdownModel#items
 */

/**
 * Fired when the list dropdown should be executed, usually when
 * one of the list items in {@link ui.dropdown.list.ListDropdown#list} has been executed.
 *
 * @event ui.dropdown.list.ListDropdownModel#execute
 */
