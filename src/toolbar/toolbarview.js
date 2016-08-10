/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import View from '../view.js';
import Template from '../template.js';

/**
 * The toolbar view class.
 *
 * See {@link ui.toolbar.Toolbar}.
 *
 * @memberOf ui.toolbar
 * @extends ui.View
 */
export default class ToolbarView extends View {
	/**
	 * @inheritDoc
	 */
	constructor() {
		super();

		this.template = new Template( {
			tag: 'div',
			attributes: {
				class: [
					'ck-toolbar'
				]
			}
		} );

		this.register( 'items', el => el );
	}
}
