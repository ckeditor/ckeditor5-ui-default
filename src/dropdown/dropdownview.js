/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import View from '../view.js';
import DropdownBoxView from './dropdownboxview.js';

/**
 * The basic dropdown view class.
 *
 * @memberOf ui.dropdown
 * @extends ui.View
 */

export default class DropdownView extends View {
	constructor( model ) {
		super( model );

		this._boxView = new DropdownBoxView( this.model );
		// const bind = this.attributeBinder;

		this.template = {
			tag: 'div',

			attributes: {
				class: [
					'ck-dropdown'
				]
			},

			on: {
				click: () => {
					if ( model.isEnabled ) {
						this.fire( 'click' );
					}
				}
			}
		};

		this.register( 'dropdown', el => el );
		this.register( 'box', () => this._boxView.element );

		this.on( 'click', () => {
			this.model.isOn = !this.model.isOn;

			if ( this.model.isOn ) {
				this.listenTo( document, 'mousedown', ( evtInfo, domEvt ) => {
					if ( !isEqualOrChild( this.element, domEvt.target ) ) {
						this.model.isOn = false;
					}
				} );

				this._boxView.setPosition( this.regions.get( 'dropdown' ).views.get( 0 ).element );
			} else {
				this.stopListening( document );
			}
		} );
	}

	init() {
		this._boxView.init();

		return super.init();
	}

	appendBox( whereTo ) {
		whereTo.appendChild( this._boxView.element );
	}
}

function isEqualOrChild( ref, node ) {
	return ref === node || ref.contains( node );
}
