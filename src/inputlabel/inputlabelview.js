/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import View from '../view.js';
import Template from '../template.js';

/**
 * The input label view class.
 *
 * See {@link ui.input.InputLabel}.
 *
 * @memberOf ui.input
 * @extends ui.View
 */
export default class InputLabelView extends View {
	/**
	 * @inheritDoc
	 */
	constructor( locale ) {
		super( locale );

		const bind = this.bind;

		this.template = new Template( {
			tag: 'label',
			attributes: {
				class: [
					'ck-input__label'
				],
				for: bind.to( 'for' )
			},
			children: [
				{
					text: bind.to( 'text' )
				}
			]
		} );

		/**
		 * Model of this label view.
		 *
		 * @member {ui.input.InputLabelViewModel} ui.input.InputLabelView#model
		 */
	}
}

/**
 * The input label view {@link ui.Model} interface.
 *
 * @interface ui.input.InputLabelViewModel
 */

/**
 * The label text.
 *
 * @observable
 * @member {String} ui.input.InputLabelViewModel#text
 */

/**
 * The for attribute of the label (to pair with form element).
 *
 * @observable
 * @member {String} ui.input.InputLabelViewModel#for
 */
