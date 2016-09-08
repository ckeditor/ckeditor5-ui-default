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
 * The labeled input controller class. It contains two components, {@link ui.input.Label Label} and
 * passed by a constructor InputComponent instance, connected by an unique id.
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
	 * @param {ui.input.InputText} inputComponent Input component.
	 */
	constructor( model, view, inputComponent ) {
		super( model, view );

		/**
		 * Create unique id to pair input with label.
		 *
		 * @protected
		 * @member {ui.input.Label}
		 */
		this._uid = `ck-input-${ uid() }`;

		/**
		 * Label Instance.
		 *
		 * @member {ui.input.Label}
		 */
		this.label = this._createLabel();

		/**
		 * Input instance.
		 *
		 * @member {ui.input.InputText}
		 */
		this.input = this._attachInput( inputComponent );

		// Insert label and input to content collection.
		const contentCollection = this.addCollection( 'content' );

		contentCollection.add( this.label );
		contentCollection.add( this.input );
	}

	/**
	 * Get input value.
	 *
	 * @returns {String} Input value.
	 */
	get value() {
		return this.input.value;
	}

	/**
	 * Initialize {@link ui.input.Label Label} class.
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
	 * Bind input#model with {ui.input.labeled.LabeledInputModel}.
	 *
	 * @private
	 * @param {ui.input.InputText} inputComponent Constructor of Input component.
	 * @returns {ui.input.InputText} inputComponent instance.
	 */
	_attachInput( inputComponent ) {
		const model = inputComponent.model;

		model.bind( 'value' ).to( this.model, 'value' );
		model.set( 'id', this._uid );

		return inputComponent;
	}
}

/**
 * The LabeledInput component {@link ui.Model model} interface.
 *
 * @interface ui.input.labeled.LabeledInputModel
 */

/**
 * The text content of the label element.
 *
 * @observable
 * @member {String} ui.input.labeled.LabeledInputModel#label
 */

/**
 * The value of the input element.
 *
 * @observable
 * @member {String} ui.input.labeled.LabeledInputModel#value
 */
