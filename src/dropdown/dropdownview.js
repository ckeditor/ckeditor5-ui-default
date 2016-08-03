/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import View from '../view.js';
import Template from '../template.js';

/**
 * The dropdown view class.
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
		 * Model of this dropdown view.
		 *
		 * @member {ui.dropdown.DropdownViewModel} ui.dropdown.DropdownView#model
		 */
	}
}

/**
 * The dropdown view {@link ui.Model} interface.
 *
 * @interface ui.dropdown.DropdownViewModel
 */

/**
 * Controls whether the dropdown view is open, which also means its
 * {@link ui.dropdown.Dropdown#panel} is visible.
 *
 * @observable
 * @member {Boolean} ui.dropdown.DropdownViewModel#isOpen
 */
