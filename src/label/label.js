/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import Controller from '../controller.js';

/**
 * The label controller class.
 *
 *		const model = new Model( {
 *			text: 'Label of some input',
 *			for: 'ck-input-5'
 *		} );
 *
 *		new Label( model, new LabelView() );
 *
 * See {@link ui.input.LabelView}.
 *
 * @memberOf ui.label
 * @extends ui.Controller
 */
export default class Label extends Controller {
	/**
	 * Creates an instance of {@link ui.label.Label} class.
	 *
	 * @param {ui.label.LabelModel} model Model of this label.
	 * @param {ui.View} view View of this label.
	 */
	constructor( model, view ) {
		super( model, view );

		view.model.bind( 'text', 'for' ).to( model );
	}
}

/**
 * The Label component {@link ui.Model model} interface.
 *
 * @interface ui.label.LabelModel
 */

/**
 * The text of the label.
 *
 * @observable
 * @member {String} ui.label.LabelModel#text
 */

/**
 * The for attribute of the label (to pair with input element).
 *
 * @observable
 * @member {String} ui.label.LabelModel#for
 */
