/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import Controller from '../controller.js';

/**
 * The form controller class. Allows to create regular HTML `<form />` element
 * and handling submit event or make HTML validation for form fields.
 *
 *		new Box( new Model(), new FormView() );
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
	 * @param {ui.form.FormModel} model Model of this balloon panel.
	 * @param {ui.View} view View of this balloon panel.
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
 * @interface ui.box.FormModel
 */

/**
 * Fired when the Form action should be executed.
 *
 * @event ui.button.FormModel#execute
 */
