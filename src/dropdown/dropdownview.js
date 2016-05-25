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
	/**
	 * Creates a DropdownView instance.
	 *
	 * @param {utils.Observable} model
	 */
	constructor( model ) {
		super( model );

		this.template = {
			tag: 'div',

			attributes: {
				class: [
					'ck-dropdown'
				]
			}
		};

		this.register( 'main', el => el );
	}
}
