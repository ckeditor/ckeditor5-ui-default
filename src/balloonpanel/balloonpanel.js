/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import Controller from '../controller.js';

/**
 * The balloon panel controller class.
 *
 *		new BalloonPanel( new Model(), new BalloonPanelView() );
 *
 * See {@link ui.form.BalloonPanelView}.
 *
 * @memberOf ui.balloonPanel
 * @extends ui.Controller
 */
export default class BalloonPanel extends Controller {
	/**
	 * Creates an instance of {@link ui.balloonPanel.BalloonPanel} class.
	 *
	 * @param {ui.balloonPanel.BalloonPanelModel} model Model of this balloon panel.
	 * @param {ui.View} view View of this balloon panel.
	 */
	constructor( model, view ) {
		super( model, view );

		view.model.set( 'top', 0 );
		view.model.set( 'left', 0 );
		view.model.set( 'arrow', 'se' );
		view.model.set( 'isVisible', false );

		view.model.bind( 'maxWidth' ).to( model );
		view.model.delegate( 'hide' ).to( model );

		this.addCollection( 'content' );
	}
}

/**
 * The balloon panel component {@link ui.Model} interface.
 *
 * @interface ui.balloonPanel.BalloonPanelModel
 */

/**
 * Max width of the balloon panel.
 *
 * @observable
 * @member {Number} ui.balloonPanel.BalloonPanelModel#maxWidth
 */

/**
 * Fired when the balloon panel is hide.
 *
 * @event ui.balloonPanel.BalloonPanelModel#hide
 */
