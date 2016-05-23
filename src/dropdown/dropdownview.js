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
				'click@.ck-dropdown__button': 'click'
			}
		};

		this.register( 'dropdown', el => el );
	}

	init() {
		const dropdownRegion = this.regions.get( 'dropdown' );

		this.on( 'click', () => {
			if ( !this.model.isEnabled ) {
				return;
			}

			this.model.isOn = !this.model.isOn;
		} );

		this.listenTo( this.model, 'change:isOn', ( evt, name, value ) => {
			if ( value ) {
				dropdownRegion.views.get( 1 ).positionRelativeTo( this.element.firstChild );
			}
		} );

		return super.init();
	}
}
