/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import View from '../view.js';
import Template from '../template.js';
import uid from '../../utils/uid.js';

import LabelView from '../label/labelview.js';

/**
 * The labeled input view class.
 *
 * @memberOf ui.labeledInput
 * @extends ui.View
 */
export default class LabeledInputView extends View {
	/**
	 * Creates an instance of the labeled input view class.
	 *
	 * @param {utils.Locale} locale The {@link core.editor.Editor#locale editor's locale} instance.
	 * @param {Function} InputView Constructor of the input view.
	 */
	constructor( locale, InputView ) {
		super( locale );

		const id = `ck-input-${ uid() }`;

		/**
		 * The text of the label.
		 *
		 * @observable
		 * @member {String} ui.labeledInput.LabeledInputView#label
		 */
		this.set( 'label' );

		/**
		 * The value of the input.
		 *
		 * @observable
		 * @member {String} ui.labeledInput.LabeledInputView#value
		 */
		this.set( 'value' );

		/**
		 * The label view.
		 *
		 * @member {ui.label.LabelView} ui.labeledInput.LabeledInput#labelView
		 */
		this.addChild( this.labelView = this._createLabelView( id ) );

		/**
		 * The input view.
		 *
		 * @member {ui.View} ui.labeledInput.LabeledInput#inputView
		 */
		this.addChild( this.inputView = this._createInputView( InputView, id ) );

		this.template = new Template( {
			tag: 'div',

			children: [
				this.labelView,
				this.inputView
			]
		} );
	}

	/**
	 * Creates label view class instance and bind with view.
	 *
	 * @private
	 * @param {String} id Unique id to set as labelView#for attribute.
	 * @returns {ui.label.LabelView}
	 */
	_createLabelView( id ) {
		const labelView = new LabelView( this.locale );

		labelView.for = id;
		labelView.bind( 'text' ).to( this, 'label' );

		return labelView;
	}

	/**
	 * Creates input view class instance and bind with view.
	 *
	 * @private
	 * @param {ui.input} InputView Input view constructor.
	 * @param {String} id Unique id to set as inputView#id attribute.
	 * @returns {ui.input}
	 */
	_createInputView( InputView, id ) {
		const inputView = new InputView( this.locale );

		inputView.id = id;
		inputView.bind( 'value' ).to( this );

		return inputView;
	}

	/**
	 * Moves the focus to the input and selects the value.
	 */
	select() {
		this.inputView.select();
	}
}
