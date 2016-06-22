/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import DropdownView from '../dropdownview.js';

/**
 * The basic list dropdown view class.
 *
 * @memberOf ui.dropdown
 * @extends ui.View
 */
export default class ListDropdownView extends DropdownView {
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
	}
}

/**
 * The ListDropdownView model interface.
 *
 * @memberOf ui.dropdown.list
 * @interface ui.dropdown.list.ListDropdownViewModel
 */

/**
 * Fired when component is to be closed because of user action in DOM.
 *
 * @event ui.dropdown.ListDropdownViewModel#close
 */
