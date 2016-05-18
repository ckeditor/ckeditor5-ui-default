/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import View from '../view.js';

/**
 * The basic dropdown view class.
 *
 * @memberOf ui.dropdown
 * @extends ui.View
 */

export default class DropdownView extends View {
	constructor( model ) {
		super( model );

		this.template = {
			tag: 'div',

			attributes: {
				class: [
					'ck-dropdown'
				]
			},

			on: {
				'click@.ck-dropdown__button': () => {
					if ( model.isEnabled ) {
						this.fire( 'click' );
					}
				}
			}
		};

		this.register( 'dropdown', el => el );
	}

	init() {
		const dropdownRegion = this.regions.get( 'dropdown' );

		this.on( 'click', () => {
			this.model.isOn = !this.model.isOn;

			if ( this.model.isOn ) {
				dropdownRegion.views.get( 1 ).setPosition( this.element.firstChild );
			}
		} );

		// this.model.on( 'change:isOn', ( evt, name, value ) => {
		// 	if ( value ) {
		// 		this.listenTo( document, 'mousedown', ( evtInfo, domEvt ) => {
		// 			if ( !isEqualOrChild( this.element, domEvt.target ) ) {
		// 				this.model.isOn = false;
		// 			}
		// 		} );

		// 	} else {
		// 		this.stopListening( document );
		// 	}
		// } );

		return super.init();
	}

	// appendBox( whereTo ) {
	// 	whereTo.appendChild( this._boxView.element );
	// }
}

// function isEqualOrChild( ref, node ) {
// 	return ref === node || ref.contains( node );
// }