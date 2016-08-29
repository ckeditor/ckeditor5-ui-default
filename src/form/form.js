/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import Controller from '../controller.js';

/**
 * The balloon panel controller class.
 *
 * @memberOf ui.balloonPanel
 * @extends ui.Controller
 */
export default class Form extends Controller {
	/**
	 * Creates an instance of {@link ui.balloonPanel.BalloonPanel} class.
	 *
	 * @param {ui.balloonPanel.BalloonPanelModel} model Model of this balloon panel.
	 * @param {ui.View} view View of this balloon panel.
	 */
	constructor( model, view ) {
		super( model, view );

		view.model.on( 'submit', () => model.fire( 'execute' ) );

		this.addCollection( 'content' );
	}
}
