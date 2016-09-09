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
 * See {@link ui.balloonPanel.BalloonPanelView}.
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

		view.model.set( {
			top: 0,
			left: 0,
			arrow: 'se',
			isVisible: false
		} );

		view.model.bind( 'maxWidth' ).to( model );

		this.addCollection( 'content' );
	}
}

/**
 * The balloon panel component {@link ui.Model} interface.
 *
 * @interface ui.balloonPanel.BalloonPanelModel
 */

/**
 * Max width of the balloon panel, as in CSS.
 *
 * @observable
 * @member {Number} ui.balloonPanel.BalloonPanelModel#maxWidth
 */
