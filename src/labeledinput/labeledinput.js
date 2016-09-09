/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import uid from '../../utils/uid.js';

import Model from '../model.js';
import Controller from '../controller.js';

import Label from '../label/label.js';
import LabelView from '../label/labelview.js';

/**
 * The labeled input controller class. It contains two components, {@link ui.input.Label Label}
 * and `InputComponent` instance, connected by an unique id.
 *
 *		const input = new InputText( new Model(), new InputTextView() );
 *
 *		const model = new Model( {
 *			label: 'Label text'
 *			value: 'init value',
 *		} );
 *
 *		new LabeledInput( model, new LabeledInputView(), input );
 *
 * See {@link ui.input.labeled.LabeledInputView}.
 *
 * @memberOf ui.input.labeled
 * @extends ui.Controller
 */
export default class LabeledInput extends Controller {
	/**
	 * Creates an instance of {@link ui.input.labeled.LabeledInput} class.
	 *
	 * @param {ui.input.labeled.LabeledInputModel} model Model of this input.
	 * @param {ui.View} view View of this input.
	 * @param {Function} InputClass Constructor of the input component.
	 * @param {Function} InputViewClass Constructor of the input view.
	 * @param {ui.Model} model Model of the input component.
	 */
	constructor( model, view, InputClass, InputViewClass, inputModel ) {
		super( model, view );

		/**
		 * An unique `id` to pair the input with its label.
		 *
		 * @protected
		 * @member {ui.input.Label}
		 */
		this._uid = `ck-input-${ uid() }`;

		/**
		 * The `Label` controller instance.
		 *
		 * @member {ui.input.Label}
		 */
		this.label = this._createLabel();

		/**
		 * The input controller instance.
		 *
		 * @member {ui.input.InputText}
		 */
		this.input = this._spawnInput( InputClass, InputViewClass, inputModel );

		// Insert label and input to content collection.
		const contentCollection = this.addCollection( 'content' );

		contentCollection.add( this.label );
		contentCollection.add( this.input );
	}

	/**
	 * Returns the input value.
	 *
	 * @returns {String} Input value.
	 */
	get value() {
		return this.input.value;
	}

	/**
	 * Initializes the {@link ui.input.Label Label} instance.
	 *
	 * @private
	 * @returns {Label}
	 */
	_createLabel() {
		const model = new Model();

		model.bind( 'text' ).to( this.model, 'label' );
		model.set( 'for', this._uid );

		return new Label( model, new LabelView( this.locale ) );
	}

	/**
	 * Creates the new input using given constructor and model.
	 * Binds basic attributes of the newly created input's model to {ui.input.labeled.LabeledInputModel}.
	 *
	 * @private
	 * @param {Function} InputClass A constructor of the input component.
	 * @param {ui.Model} inputModel Model of the input component.
	 * @returns {ui.Controller} An instance of the input component.
	 */
	_spawnInput( InputClass, InputViewClass, inputModel ) {
		inputModel.bind( 'value' ).to( this.model, 'value' );
		inputModel.set( 'id', this._uid );

		return new InputClass( inputModel, new InputViewClass( this.locale ) );
	}
}

/**
 * The LabeledInput component {@link ui.Model model} interface.
 *
 * @interface ui.input.labeled.LabeledInputModel
 */

/**
 * The text content of the {@link ui.input.LabeledInput#label}.
 *
 * @observable
 * @member {String} ui.input.labeled.LabeledInputModel#label
 */

/**
 * The value of the {@link ui.input.LabeledInput#input}.
 *
 * @observable
 * @member {String} ui.input.labeled.LabeledInputModel#value
 */
