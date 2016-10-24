/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import View from '../view.js';
import Template from '../template.js';

import LabelView from '../label/labelview.js';

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
	 * Creates an instance of the labeled input view class.
	 *
	 * @param {Function} InputViewClass Constructor of the input view.
	 * @param {utils.Locale} [locale] The {@link core.editor.Editor#locale editor's locale} instance.
	 */
	constructor( InputViewClass, locale ) {
		super( locale );

		/**
		 * The label view.
		 *
		 * @member {ui.label.LabelView} ui.input.labeled.LabeledInput#labelView
		 */
		this.labelView = new LabelView( this.locale );

		/**
		 * The input view.
		 *
		 * @member {ui.View} ui.input.labeled.LabeledInput#inputView
		 */
		this.inputView = new InputViewClass( this.locale );

		this.template = new Template( {
			tag: 'div',

			children: [
				this.labelView,
				this.inputView
			]
		} );
	}

	/**
	 * Moves the focus to the input and selects the value.
	 */
	select() {
		this.inputView.select();
	}
}
