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

		this.model.set( 'isOpen', false );

		this.template = new Template( {
			tag: 'div',

			attributes: {
				class: [
					'ck-dropdown'
				]
			}
		} );

		this.register( 'main', el => el );

		/**
		 * Model of this DropdownView.
		 *
		 * @member {ui.dropdown.DropdownViewModel} ui.dropdown.DropdownView#model
		 */
	}
}

/**
 * The DropdownView {@link ui.Model} interface.
 *
 * @memberOf ui.dropdown
 * @interface ui.dropdown.DropdownViewModel
 */

/**
 * Controls whether the dropdown is open, which also means its
 * {@link ui.dropdown.Dropdown#panel} is visible.
 *
 * @member {String} ui.dropdown.DropdownViewModel#isOpen
 */
