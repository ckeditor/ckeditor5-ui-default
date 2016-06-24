/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import View from '../view.js';
import Template from '../template.js';

/**
 * The DropdownView class.
 *
 * See {@link ui.dropdown.Dropdown}.
 *
 * @memberOf ui.dropdown
 * @extends ui.View
 */
export default class DropdownView extends View {
	/**
	 * @inheritDoc
	 */
	constructor() {
		super();

		this.template = new Template( {
			tag: 'div',

			attributes: {
				class: [
					'ck-dropdown'
				]
			}
		} );

		this.register( 'main', el => el );
	}
}
