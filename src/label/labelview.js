/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import View from '../view.js';
import Template from '../template.js';

/**
 * The label view class.
 *
 * See {@link ui.label.Label}.
 *
 * @memberOf ui.label
 * @extends ui.View
 */
export default class LabelView extends View {
	/**
	 * @inheritDoc
	 */
	constructor( locale ) {
		super( locale );

		const bind = this.templateBind;

		this.template = new Template( {
			tag: 'label',
			attributes: {
				class: [
					'ck-label'
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
		 * The text of the label.
		 *
		 * @observable
		 * @member {String} ui.label.LabelView#text
		 */

		/**
		 * The `for` attribute of the label (i.e. to pair with an `<input>` element).
		 *
		 * @observable
		 * @member {String} ui.label.LabelView#for
		 */
	}
}
