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

		// `value` can not be an HTML attribute, because it doesn't change HTMLInputElement value after edit.
		this.model.on( 'change:value', ( evt, propertyName, value ) => this.element.value = value || '' );

		/**
		 * Model of this input view.
		 *
		 * @member {ui.input.InputTextViewModel} ui.input.InputTextView#model
		 */
	}

	/**
	 * Set focus to the input.
	 */
	focus() {
		this.element.focus();
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
 * The id attribute of the input (to pair with label element).
 *
 * @observable
 * @member {String} ui.input.InputTextViewModel#id
 */
