/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import DropdownView from '../dropdownview.js';

/**
 * The ListDropdownView class.
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

		let isDomListenerActive = false;

		this.listenTo( this.model, 'change:isOn', ( evt, name, value ) => {
			if ( value ) {
				// TODO: It will probably be focus/blur-based rather than click. It should be bound
				// to focusmanager of some sort.
				this.listenTo( document, 'click', ( evtInfo, { target: domEvtTarget } ) => {
					if ( this.element != domEvtTarget && !this.element.contains( domEvtTarget ) ) {
						this.model.fire( 'close' );
					}
				} );

				isDomListenerActive = true;
			} else {
				if ( isDomListenerActive ) {
					this.stopListening( document );

					isDomListenerActive = false;
				}
			}
		} );

		/**
		 * Model of this ListDropdownView.
		 *
		 * @member {ui.dropdown.list.ListDropdownViewModel} ui.dropdown.list.ListDropdownView#model
		 */
	}
}

/**
 * The ListDropdownView model interface.
 *
 * @memberOf ui.dropdown.list
 * @interface ui.dropdown.list.ListDropdownViewModel
 */

/**
 * Controls whether the ListDropdownView is "active", which means that the box is visible.
 *
 * @member {Boolean} ui.dropdown.list.ListDropdownViewModel#isOn
 */

/**
 * Fired when component is to be closed because of user action in DOM like clicking
 * or using the keyboard.
 *
 * @event ui.dropdown.ListDropdownViewModel#close
 */
