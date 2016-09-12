/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import View from '../view.js';
import Template from '../template.js';

/**
 * The labeled input view class.
 *
 * See {@link ui.input.labeled.LabeledInput}.
 *
 * @memberOf ui.input.labeled
 * @extends ui.View
 */
export default class LabeledInputView extends View {
	/**
	 * @inheritDoc
	 */
	constructor( locale ) {
		super( locale );

		this.template = new Template( {
			tag: 'div'
		} );

		this.register( 'content', el => el );
	}

	/**
	 * Moves the focus to the input and select entire value.
	 */
	select() {
		this.regions.get( 'content' ).views.get( 1 ).select();
	}
}
