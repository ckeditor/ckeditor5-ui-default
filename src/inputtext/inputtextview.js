/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import View from '../view.js';
import Template from '../template.js';

/**
 * The text input view class.
 *
 * See {@link ui.input.InputText}.
 *
 * @memberOf ui.input
 * @extends ui.View
 */
export default class InputTextView extends View {
	/**
	 * @inheritDoc
	 */
	constructor( locale ) {
		super( locale );

		const bind = this.bindTemplate;

		this.template = new Template( {
			tag: 'input',
			attributes: {
				type: 'text',
				class: [
					'ck-input',
					'ck-input-text'
				],
				id: bind.to( 'id' )
			}
		} );

		// Note: `value` cannot be an HTML attribute, because it doesn't change HTMLInputElement value once changed.
		this.on( 'change:value', ( evt, propertyName, value ) => this.element.value = value || '' );

		/**
		 * The value of the input.
		 *
		 * @observable
		 * @member {String} ui.input.InputTextView#value
		 */

		/**
		 * The `id` attribute of the input (i.e. to pair with a `<label>` element).
		 *
		 * @observable
		 * @member {String} ui.input.InputTextView#id
		 */
	}

	/**
	 * Moves the focus to the input and selects the value.
	 */
	select() {
		this.element.select();
	}
}
