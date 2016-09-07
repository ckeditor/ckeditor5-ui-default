/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import Controller from '../controller.js';

/**
 * The form controller class. Allows to create regular HTML `<form />` element
 * and handling submit event or make HTML validation for form fields.
 *
 *		new Form( new Model(), new FormView() );
 *
 * See {@link ui.form.FormView}.
 *
 * @memberOf ui.form
 * @extends ui.Controller
 */
export default class Form extends Controller {
	/**
	 * Creates an instance of {@link ui.form.Form} class.
	 *
	 * @param {ui.form.FormModel} model Model of this form.
	 * @param {ui.View} view View of this form.
	 */
	constructor( model, view ) {
		super( model, view );

		view.model.on( 'submit', () => model.fire( 'execute' ) );

		this.addCollection( 'content' );
	}
}

/**
 * The Form component {@link ui.Model model} interface.
 *
 * @interface ui.form.FormModel
 */

/**
 * Fired when the Form action should be executed.
 *
 * @event ui.form.FormModel#execute
 */
