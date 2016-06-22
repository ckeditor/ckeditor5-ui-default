/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import ButtonView from '../button/buttonview.js';
import Template from '../template.js';

/**
 * The basic dropdown button view class.
 *
 * @memberOf ui.dropdown
 * @extends ui.button.ButtonView
 */
export default class DropdownButtonView extends ButtonView {
	/**
	 * Creates a DropdownButtonView instance.
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
