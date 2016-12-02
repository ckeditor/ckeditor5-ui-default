/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* global document */

import View from '../view.js';
import Template from '../template.js';
import { getOptimalPosition } from '../../utils/dom/position.js';
import toUnit from '../../utils/dom/tounit.js';

const toPx = toUnit( 'px' );
const arrowHOffset = 30;
const arrowVOffset = 15;

/**
 * The balloon panel view class.
 *
 * See {@link ui.balloonPanel.BalloonPanel}.
 *
 * @memberOf ui.balloonPanel
 * @extends ui.View
 */
export default class BalloonPanelView extends View {
	/**
	 * @inheritDoc
	 */
	constructor( locale ) {
		super( locale );

		const bind = this.bindTemplate;

		/**
		 * The absolute top position of the balloon panel in pixels.
		 *
		 * @observable
		 * @default 0
		 * @member {Number} ui.balloonPanel.BalloonPanelView#top
		 */
		this.set( 'top', 0 );

		/**
		 * The absolute left position of the balloon panel in pixels.
		 *
		 * @observable
		 * @default 0
		 * @member {Number} ui.balloonPanel.BalloonPanelView#left
		 */
		this.set( 'left', 0 );

		/**
		 * Balloon panel's current position. Must correspond with
		 * {@link ui.balloonPanel.BalloonPanelView#defaultPositions}.
		 *
		 * See {@link ui.balloonPanel.BalloonPanelView#positions}.
		 *
		 * @observable
		 * @default 'se'
		 * @member {'se'|'sw'|'ne'|'nw'} ui.balloonPanel.BalloonPanelView#position
		 */
		this.set( 'position', 'se' );

		/**
		 * Controls whether the balloon panel is visible or not.
		 *
		 * @observable
		 * @default false
		 * @member {Boolean} ui.balloonPanel.BalloonPanelView#isVisible
		 */
		this.set( 'isVisible', false );

		/**
		 * Positions taken intro consideration when attaching the panel
		 * using {@link ui.balloonPanel.BalloonPanelView#attachTo} method.
		 * Corresponding with {@link ui.balloonPanel.BalloonPanelView#defaultPositions}.
		 *
		 * See {@link ui.balloonPanel.BalloonPanelView#defaultPositions} to learn
		 * about default available positions.
		 *
		 * Also see {@link ui.balloonPanel.BalloonPanelView#position}.
		 *
		 * @type {Array.<String>}
		 */
		this.positions = [
			'se', 'sw', 'ne', 'nw'
		];

		/**
		 * The DOM element or Range beyond which area the balloon panel should not be
	 	 * positioned when using {@link ui.balloonPanel.BalloonPanelView#attachTo} method,
	 	 * if possible.
		 *
		 * @type {HTMLElement|Range}
		 */
		this.limiter = document.body;

		/**
		 * Indicates that, if possible, the balloons should be positioned using
		 * {@link ui.balloonPanel.BalloonPanelView#attachTo} so that if visually fits
		 * into the visible browser viewport.
		 *
		 * @type {Boolean}
		 */
		this.fitInViewport = true;

		/**
		 * Max width of the balloon panel, as in CSS.
		 *
		 * @observable
		 * @member {Number} ui.balloonPanel.BalloonPanelView#maxWidth
		 */

		/**
		 * Collection of the child views which creates balloon panel contents.
		 *
		 * @readonly
		 * @member {ui.ViewCollection} ui.list.ListView#content
		 */
		this.content = this.createCollection();

		this.template = new Template( {
			tag: 'div',
			attributes: {
				class: [
					'ck-balloon-panel',
					bind.to( 'position', ( value ) => `ck-balloon-panel_arrow_${ value }` ),
					bind.if( 'isVisible', 'ck-balloon-panel_visible' )
				],

				style: {
					top: bind.to( 'top', toPx ),
					left: bind.to( 'left', toPx ),
					maxWidth: bind.to( 'maxWidth', toPx )
				},

				// Make this element `focusable` to be available for adding to FocusTracker.
				tabindex: -1
			},

			children: this.content
		} );
	}

	/**
	 * Shows the balloon panel.
	 *
	 * See {@link ui.balloonPanel.BalloonPanelView#isVisible}.
	 */
	show() {
		this.isVisible = true;
	}

	/**
	 * Hides the balloon panel.
	 *
	 * See {@link ui.balloonPanel.BalloonPanelView#isVisible}.
	 */
	hide() {
		this.isVisible = false;
	}

	/**
	 * Attaches the balloon panel to a specified DOM element or range with a smart heuristics,
	 * taking {@link ui.balloonPanel.BalloonPanelView#positions}, {@link ui.balloonPanel.BalloonPanelView#limiter}
	 * and {@link ui.balloonPanel.BalloonPanelView#fitInViewport} into consideration.
	 *
	 * @param {[type]} target [description]
	 * @returns {[type]} [description]
	 */
	attachTo( target ) {
		this.show();

		const { top, left, name: position } = getOptimalPosition( {
			element: this.element,
			target: target,
			positions: this.positions.map( p => BalloonPanelView.defaultPositions[ p ] ),
			limiter: this.limiter,
			fitInViewport: this.fitInViewport
		} );

		Object.assign( this, { top, left, position } );
	}
}

/**
 * A default set of positioning functions used by the balloon panel view
 * when attaching using {@link ui.balloonPanel.BalloonPanelView#attachTo} method.
 *
 * The available positioning functions are as follows:
 *
 * * South east:
 *
 *		[ Target ]
 *		    ^
 *		+-----------------+
 *		|     Balloon     |
 *		+-----------------+
 *
 *
 * * South west:
 *
 *		         [ Target ]
 *		              ^
 *		+-----------------+
 *		|     Balloon     |
 *		+-----------------+
 *
 *
 * * North east:
 *
 *		+-----------------+
 *		|     Balloon     |
 *		+-----------------+
 *		    V
 *		[ Target ]
 *
 *
 * * North west:
 *
 *		+-----------------+
 *		|     Balloon     |
 *		+-----------------+
 *		              V
 *		         [ Target ]
 *
 * See {@link ui.balloonPanel.BalloonPanelView#positions},
 * {@link ui.balloonPanel.BalloonPanelView#position}.
 *
 * @member {Object} ui.balloonPanel.BalloonPanelView#defaultPositions
 */
BalloonPanelView.defaultPositions = {
	se: ( targetRect ) => ( {
		top: targetRect.bottom + arrowVOffset,
		left: targetRect.left + targetRect.width / 2 - arrowHOffset,
		name: 'se'
	} ),

	sw: ( targetRect, balloonRect ) => ( {
		top: targetRect.bottom + arrowVOffset,
		left: targetRect.left + targetRect.width / 2 - balloonRect.width + arrowHOffset,
		name: 'sw'
	} ),

	ne: ( targetRect, balloonRect ) => ( {
		top: targetRect.top - balloonRect.height - arrowVOffset,
		left: targetRect.left + targetRect.width / 2 - arrowHOffset,
		name: 'ne'
	} ),

	nw: ( targetRect, balloonRect ) => ( {
		top: targetRect.top - balloonRect.height - arrowVOffset,
		left: targetRect.left + targetRect.width / 2 - balloonRect.width + arrowHOffset,
		name: 'nw'
	} )
};
