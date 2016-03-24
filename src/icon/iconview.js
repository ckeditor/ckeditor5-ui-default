/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import View from '../view.js';

/**
 * The basic icon view class.
 *
 * @memberOf ui.icon
 * @extends ui.View
 */

export default class IconView extends View {
	constructor( model ) {
		super( model );

		this._createViewElement();

		model.on( 'change:icon', ( evt, value ) => {
			this.use.setAttribute( 'xlink:href', `#ck-icon-${ value }` );
		} );
	}

	_createViewElement() {
		// Note: Creating SVG icons with with Template class is not possible
		// because of CSS limitations of document.createEleentNS–created elements.
		const tmp = document.createElement( 'div' );

		tmp.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="ck-icon ck-icon-left">
				<use xlink:href="#ck-icon-${ this.model.icon }"></use>
			</svg>`;

		this.element = tmp.firstChild;

		/**
		 * An element which is responsible for displaying the right icon.
		 *
		 * @member {HTMLElement} ui.IconView#use
		 */
		this.use = this.element.firstElementChild;
	}
}
