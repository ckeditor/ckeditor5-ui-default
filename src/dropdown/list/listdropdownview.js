/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import DropdownView from '/ckeditor5/ui/dropdown/dropdownview.js';

/**
 * The basic list dropdown view class.
 *
 * @memberOf ui.dropdown
 * @extends ui.View
 */
export default class ListDropdownView extends DropdownView {
	constructor( model ) {
		super( model );

		this.listenTo( this.model, 'change:isOn', ( evt, name, value ) => {
			if ( value ) {
				// TODO: It will probably be focus/blur-based rather than click. It should be bound
				// to focusmanager of some sort.
				this.listenTo( document, 'click', ( evtInfo, domEvt ) => {
					if ( this.element != domEvt.target && !this.element.contains( domEvt.target ) ) {
						this.model.isOn = false;
					}
				} );
			} else {
				this.stopListening( document );
			}
		} );
	}
}
