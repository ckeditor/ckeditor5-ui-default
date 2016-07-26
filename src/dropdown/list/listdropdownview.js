/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import DropdownView from '../dropdownview.js';

/**
 * The list dropdown view class.
 *
 * See {@link ui.dropdown.list.ListDropdown}.
 *
 * @memberOf ui.dropdown.list
 * @extends ui.dropdown.DropdownView
 */
export default class ListDropdownView extends DropdownView {
	/**
	 * @inheritDoc
	 */
	constructor() {
		super();

		this.listenTo( this.model, 'change:isOpen', ( evt, name, value ) => {
			if ( value ) {
				// TODO: It will probably be focus/blur-based rather than click. It should be bound
				// to focusmanager of some sort.
				this.listenTo( document, 'click', ( evtInfo, { target: domEvtTarget } ) => {
					// Collapse the dropdown when the webpage outside of the component is clicked.
					if ( this.element != domEvtTarget && !this.element.contains( domEvtTarget ) ) {
						this.model.isOpen = false;
					}
				} );
			} else {
				this.stopListening( document );
			}
		} );
	}
}
