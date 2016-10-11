/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import Controller from '../controller.js';

/**
 * The text input controller class.
 *
 *		const model = new Model( {
 *			value: 'Initial value.',
 *			id: 'id-of-this-input'
 *		} );
 *
 *		new InputText( model, new InputTextView() );
 *
 * See {@link ui.input.InputTextView}.
 *
 * @memberOf ui.input
 * @extends ui.Controller
 */
export default class InputText extends Controller {
	/**
	 * Creates an instance of {@link ui.input.InputText} class.
	 *
	 * @param {ui.input.InputTextModel} model Model of this input.
	 * @param {ui.View} view View of this input.
	 */
	constructor( model, view ) {
		super( model, view );

		view.bind( 'value', 'id' ).to( model );
	}

	/**
	 * Returns the input value.
	 *
	 * @returns {String} input value.
	 */
	get value() {
		return this.view.element.value;
	}
}

/**
 * The text input component {@link ui.Model model} interface.
 *
 * @interface ui.input.InputTextModel
 */

/**
 * The value of the input.
 *
 * @observable
 * @member {String} ui.input.InputTextModel#value
 */

/**
 * The `id` attribute of the input (i.e. to pair with a `<label>` element).
 *
 * @observable
 * @member {String} ui.input.InputTextModel#id
 */
