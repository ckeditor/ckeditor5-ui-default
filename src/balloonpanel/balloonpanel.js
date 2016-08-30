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
		view.model.set( 'isVisible', false );
		view.model.bind( 'arrow', 'maxWidth', 'maxHeight' ).to( model );
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
 * Top position of the balloon panel.
 *
 * @observable
 * @member {Number} ui.balloonPanel.BalloonPanelModel#top
 */

/**
 * Left position of the balloon panel.
 *
 * @observable
 * @member {Number} ui.balloonPanel.BalloonPanelModel#left
 */

/**
 * Max width of the balloon panel.
 *
 * @observable
 * @member {Number} ui.balloonPanel.BalloonPanelModel#maxWidth
 */

/**
 * Max height of the balloon panel.
 *
 * @observable
 * @member {Number} ui.balloonPanel.BalloonPanelModel#maxHeight
 */

/**
 * Balloon panel arrow direction.
 *
 * @observable
 * @member {'se'|sw'|'ne'|nw'} ui.balloonPanel.BalloonPanelModel#arrow
 */

/**
 * flag indicates when the balloon panel is visible or not.
 *
 * @observable
 * @member {Boolean} ui.balloonPanel.BalloonPanelModel#isVisible
 */

/**
 * Fired when the balloon panel is hide.
 *
 * @event ui.balloonPanel.BalloonPanelModel#hide
 */
