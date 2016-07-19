/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import ButtonView from '../button/buttonview.js';
import Template from '../template.js';

/**
 * The dropdown button view class.
 *
 * See {@link ui.dropdown.Dropdown}, {@link ui.button.Button}, {@link ui.button.ButtonView}.
 *
 * @memberOf ui.dropdown
 * @extends ui.button.ButtonView
 */
export default class DropdownButtonView extends ButtonView {
	/**
	 * @inheritDoc
	 */
	constructor() {
		super();

		Template.extend( this.template, {
			attributes: {
				class: 'ck-dropdown__button'
			}
		} );
	}
}
