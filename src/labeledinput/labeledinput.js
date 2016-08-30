/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import uid from '../../utils/uid.js';

import Model from '../model.js';
import Controller from '../controller.js';

import InputText from '../inputtext/inputtext.js';
import InputTextView from '../inputtext/inputtextview.js';

import InputLabel from '../inputlabel/inputlabel.js';
import InputLabelView from '../inputlabel/inputlabelview.js';

/**
 * The labeled input controller class. It contains two components {@link ui.input.InputLabel InputLabel} and
 * {@link ui.input.InputText InputText} pair each other by {@link ui.input.LabeledInputModel#uid unique id}.
 *
 * 		const model = new Model( {
 *			label: 'Label text'
 *			value: 'init value',
 *		} );
 *
 *		new LabeledInput( model, new LabeledInputView() );
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
	 */
	constructor( model, view ) {
		super( model, view );

		// Create unique id to pair input with label.
		model.set( 'uid', uid() );

		/**
		 * Label Instance.
		 *
		 * @member {ui.input.InputLabel}
		 */
		this.label = this._createLabel();

		/**
		 * Input instance.
		 *
		 * @member {ui.input.InputText}
		 */
		this.input = this._createInput();

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
	 * Initialize {@link ui.input.InputLabel InputLabel} class.
	 *
	 * @private
	 * @returns {InputLabel}
	 */
	_createLabel() {
		const model = new Model();

		model.bind( 'text' ).to( this.model, 'label' );
		model.bind( 'for' ).to( this.model, 'uid', value => `ck-input-${ value }` );

		return new InputLabel( model, new InputLabelView( this.locale ) );
	}

	/**
	 * Initialize {@link ui.input.InputText InputText} class.
	 *
	 * @private
	 * @returns {InputText}
	 */
	_createInput() {
		const model = new Model();

		model.bind( 'value' ).to( this.model, 'value' );
		model.bind( 'id' ).to( this.model, 'uid', value => `ck-input-${ value }` );

		return new InputText( model, new InputTextView( this.locale ) );
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

/**
 * The unique id to pair {@link ui.input.InputText input element} with {@link ui.input.InputLabel InputLabel label element}.
 *
 * @observable
 * @member {Number} ui.input.labeled.LabeledInputModel#uid
 */
