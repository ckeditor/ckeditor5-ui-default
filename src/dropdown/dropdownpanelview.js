/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import View from '../view.js';
import Template from '../template.js';

/**
 * The basic dropdown panel view class.
 *
 * @memberOf ui.dropdown
 * @extends ui.View
 */
export default class DropdownPanelView extends View {
	/**
	 * Creates a DropdownPanelView instance.
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
	}
}
