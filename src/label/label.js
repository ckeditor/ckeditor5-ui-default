/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import Controller from '../controller.js';

/**
 * The label controller class.
 *
 *		const model = new Model( {
 *			text: 'Label of some input.',
 *			for: 'id-of-related-input'
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

		view.bind( 'text', 'for' ).to( model );
	}
}

/**
 * The label component {@link ui.Model model} interface.
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
 * The `for` attribute of the label (i.e. to pair with an `<input>` element).
 *
 * @observable
 * @member {String} ui.label.LabelModel#for
 */
