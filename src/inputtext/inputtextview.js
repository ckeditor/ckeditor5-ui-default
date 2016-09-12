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

		const bind = this.bind;

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
		this.model.on( 'change:value', ( evt, propertyName, value ) => this.element.value = value || '' );

		/**
		 * Model of this input view.
		 *
		 * @member {ui.input.InputTextViewModel} ui.input.InputTextView#model
		 */
	}

	/**
	 * Moves the focus to the input and select entire value.
	 */
	select() {
		this.element.select();
	}
}

/**
 * The text input view {@link ui.Model model} interface.
 *
 * @interface ui.input.InputTextViewModel
 */

/**
 * The value of the input.
 *
 * @observable
 * @member {String} ui.input.InputTextViewModel#value
 */

/**
 * The `id` attribute of the input (i.e. to pair with a `<label>` element).
 *
 * @observable
 * @member {String} ui.input.InputTextViewModel#id
 */
