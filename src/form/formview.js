/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import View from '../view.js';
import Template from '../template.js';

/**
 * The form view class.
 *
 * See {@link ui.form.Form}.
 *
 * @memberOf ui.form
 * @extends ui.View
 */
export default class FormView extends View {
	/**
	 * @inheritDoc
	 */
	constructor() {
		super();

		const bind = this.bindTemplate;

		this.template = new Template( {
			tag: 'form',

			on: {
				submit: bind.to( evt => {
					evt.preventDefault();
					this.fire( 'submit' );
				} )
			}
		} );

		this.register( 'content', el => el );
	}
}

/**
 * Fired when the form view is submitted (when one of the child triggered submit event).
 * E.g. click on {@link ui.button.Button Button} of type submit.
 *
 * @event ui.form.FormView#submit
 */
