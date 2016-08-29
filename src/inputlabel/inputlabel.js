/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import Controller from '../controller.js';

/**
 * The input label controller class.
 *
 * 		const model = new Model( {
 *			text: 'Label of some input',
 *			for: 'ck-input-5'
 *		} );
 *
 *		new InputLabel( model, new InputLabelView() );
 *
 * See {@link ui.input.InputLabelView}.
 *
 * @memberOf ui.input
 * @extends ui.Controller
 */
export default class InputLabel extends Controller {
	/**
	 * Creates an instance of {@link ui.input.InputLabel} class.
	 *
	 * @param {ui.input.InputLabelModel} model Model of this label.
	 * @param {ui.View} view View of this label.
	 */
	constructor( model, view ) {
		super( model, view );

		view.model.bind( 'text', 'for' ).to( model );
	}
}

/**
 * The InputLabel component {@link ui.Model model} interface.
 *
 * @interface ui.input.InputLabelModel
 */

/**
 * The text of the label.
 *
 * @observable
 * @member {String} ui.input.InputLabelModel#text
 */

/**
 * The for attribute of the label (to pair with input element).
 *
 * @observable
 * @member {String} ui.input.InputLabelModel#for
 */
