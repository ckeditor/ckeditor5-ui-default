/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import View from '../view.js';
import Template from '../template.js';

/**
 * The DropdownPanelView class.
 *
 * See {@link ui.dropdown.DropdownPanel}.
 *
 * @memberOf ui.dropdown
 * @extends ui.View
 */
export default class DropdownPanelView extends View {
	/**
	 * @inheritDoc
	 */
	constructor() {
		super();

		const bind = this.bind;

		this.template = new Template( {
			tag: 'div',

			attributes: {
				class: [
					'ck-reset',
					'ck-dropdown__panel',
					bind.if( 'isOn', 'ck-dropdown__panel-active' )
				]
			}
		} );

		this.register( 'content', el => el );

		/**
		 * Model of this DropdownPanelView.
		 *
		 * @member {ui.dropdown.DropdownPanelViewModel} ui.dropdown.DropdownPanelView#model
		 */
	}
}

/**
 * The DropdownPanelView model interface.
 *
 * @memberOf ui.dropdown
 * @interface DropdownPanelViewModel
 */

/**
 * Controls whether the DropdownPanelView is "active", which means that the box is visible.
 *
 * @member {Boolean} ui.dropdown.DropdownPanelViewModel#isOn
 */
