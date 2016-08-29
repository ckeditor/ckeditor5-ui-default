/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import View from '../view.js';
import Template from '../template.js';

/**
 * The balloon panel view class.
 *
 * See {@link ui.balloonPanel.BalloonPanel}.
 *
 * @memberOf ui.balloonPanel
 * @extends ui.View
 */
export default class FormView extends View {
	/**
	 * @inheritDoc
	 */
	constructor() {
		super();

		const bind = this.bind;

		this.template = new Template( {
			tag: 'form',

			on: {
				submit: bind.to( evt => {
					evt.preventDefault();
					this.model.fire( 'submit' );
				} )
			}
		} );

		this.register( 'content', el => el );
	}
}
