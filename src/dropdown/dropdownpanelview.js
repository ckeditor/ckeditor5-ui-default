/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import View from '../view.js';
import Template from '../template.js';

/**
 * The dropdown panel view class.
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
					bind.if( 'isVisible', 'ck-dropdown__panel-visible' )
				]
			}
		} );

		this.register( 'content', el => el );

		/**
		 * Model of this dropdown panel view.
		 *
		 * @member {ui.dropdown.DropdownPanelViewModel} ui.dropdown.DropdownPanelView#model
		 */
	}
}

/**
 * The dropdown panel view model interface.
 *
 * @memberOf ui.dropdown
 * @interface ui.dropdown.DropdownPanelViewModel
 */

/**
 * Controls whether the panel is visible.
 *
 * @member {Boolean} ui.dropdown.DropdownPanelViewModel#isVisible
 */
