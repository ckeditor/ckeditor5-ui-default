/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* globals window, document, Range, HTMLElement */

import View from '../view.js';
import Template from '../template.js';
import toUnit from '../../utils/dom/tounit.js';

const toPx = toUnit( 'px' );
const arrowLeftOffset = 30;
const arrowTopOffset = 15;

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

		const bind = this.bind;

		this.template = new Template( {
			tag: 'div',
			attributes: {
				class: [
					'ck-balloon-panel',
					bind.to( 'arrow', ( value ) => `ck-balloon-panel_arrow_${ value }` ),
					bind.if( 'isVisible', 'ck-balloon-panel_visible' )
				],

				style: {
					top: bind.to( 'top', toPx ),
					left: bind.to( 'left', toPx ),
					maxWidth: bind.to( 'maxWidth', toPx )
				},

				// Make this element `focusable` to be available for adding to FocusTracker.
				tabindex: -1
			}
		} );

		this.register( 'content', el => el );

		/**
		 * Model of this balloon panel view.
		 *
		 * @member {ui.balloonPanel.BalloonPanelViewModel} ui.balloonPanel.BalloonPanelView#model
		 */
	}

	/**
	 * Returns balloon visibility state.
	 *
	 * See {@link ui.balloonPanel.BalloonPanelViewModel#isVisible}.
	 *
	 * @returns {Boolean}
	 */
	get isVisible() {
		return this.model.isVisible;
	}

	/**
	 * Shows the balloon panel.
	 *
	 * See {@link ui.balloonPanel.BalloonPanelViewModel#isVisible}.
	 */
	show() {
		this.model.isVisible = true;
	}

	/**
	 * Hides the balloon panel.
	 *
	 * See {@link ui.balloonPanel.BalloonPanelViewModel#isVisible}.
	 */
	hide() {
		this.model.isVisible = false;
	}

	/**
	 * Attaches the balloon panel to a specified DOM element or range with a smart heuristics.
	 *
	 * **Notes**:
	 *
	 * * The algorithm takes the geometry of the "limiter element" into consideration so,
	 * if possible, the balloon is positioned within the rect of that element.
	 * * If possible, the balloon is positioned within the area of the "limiter element"
	 * fitting into the browser viewport visible to the user. It prevents the panel from
	 * appearing off screen.
	 *
	 * The heuristics choses from among 4 available positions relative to the target DOM element or range:
	 *
	 * * South east:
	 *
	 *		[ Target ]
	 *		    ^
	 *		+-----------------+
	 *		|                 |
	 *		+-----------------+
	 *
	 *
	 * * South west:
	 *
	 *		         [ Target ]
	 *		              ^
	 *		+-----------------+
	 *		|                 |
	 *		+-----------------+
	 *
	 *
	 * * North east:
	 *
	 *		+-----------------+
	 *		|                 |
	 *		+-----------------+
	 *		    V
	 *		[ Target ]
	 *
	 *
	 * * North west:
	 *
	 *		+-----------------+
	 *		|                 |
	 *		+-----------------+
	 *		              V
	 *		         [ Target ]
	 *
	 * See {@ link ui.balloonPanel.BalloonPanelViewModel#arrow}.
	 *
	 * @param {HTMLElement|Range} elementOrRange Target DOM element or range to which the balloon will be attached.
	 * @param {HTMLElement} limiterElement The DOM element beyond which area the balloon panel should not be positioned, if possible.
	 */
	attachTo( elementOrRange, limiterElement ) {
		this.show();

		const elementOrRangeRect = new AbsoluteDomRect( elementOrRange, 'elementOrRange' );
		const panelRect = new AbsoluteDomRect( this.element );
		const visibleRect = getAbsoluteRectVisisbleInTheViewport( limiterElement );

		// Create a rect for each of the possible balloon positions and feed them to _smartAttachTo,
		// which will use whichever is the optimal.
		const possiblePanelRects = {
			// The absolute rect for "South-East" position.
			se: panelRect.clone().moveTo( {
				top: elementOrRangeRect.bottom + arrowTopOffset,
				left: elementOrRangeRect.left + elementOrRangeRect.width / 2 - arrowLeftOffset
			} ),

			// The absolute rect for "South west" position.
			sw: panelRect.clone().moveTo( {
				top: elementOrRangeRect.bottom + arrowTopOffset,
				left: elementOrRangeRect.left + elementOrRangeRect.width / 2 - panelRect.width + arrowLeftOffset
			} ),

			// The absolute rect for "North east" position.
			ne: panelRect.clone().moveTo( {
				top: elementOrRangeRect.top - panelRect.height - arrowTopOffset,
				left: elementOrRangeRect.left + elementOrRangeRect.width / 2 - arrowLeftOffset
			} ),

			// The absolute rect for "North west" position.
			nw: panelRect.clone().moveTo( {
				top: elementOrRangeRect.top - panelRect.height - arrowTopOffset,
				left: elementOrRangeRect.left + elementOrRangeRect.width / 2 - panelRect.width + arrowLeftOffset
			} )
		};

		this._smartAttachTo( possiblePanelRects, visibleRect );
	}

	/**
	 * For the given `Array` of possible rects, choses the one which fits the best into
	 * `visibleViewportRect`, which is when their intersection has the biggest area.
	 *
	 * @private
	 * @param {Array<{AbsoluteDomRect}>} rects List of positions where balloon can be placed.
	 * @param {AbsoluteDomRect} visibleViewportRect The absolute rect of the visible part of the browser viewport.
	 */
	_smartAttachTo( rects, visibleViewportRect ) {
		let maxIntersectRectPos;
		let maxIntersectArea = -1;

		// Get best place.
		for ( let rectPos in rects ) {
			const intersectArea = rects[ rectPos ].getIntersectArea( visibleViewportRect );

			if ( intersectArea > maxIntersectArea ) {
				maxIntersectRectPos = rectPos;
				maxIntersectArea = intersectArea;
			}
		}

		// Move the balloon panel.
		this.model.arrow = maxIntersectRectPos;
		this.model.top = rects[ maxIntersectRectPos ].top;
		this.model.left = rects[ maxIntersectRectPos ].left;
	}
}

/**
 * An abstract class which represents a client rect of an HTMLElement or a Range in DOM.
 *
 * **Note**: The geometry used by each instance corresponds with coordinates of an object
 * with `position: absolute` relative to the `<body>` (`document.body`), and hence
 * it is useful to manage such objects.
 *
 * @private
 */
class AbsoluteDomRect {
	/**
	 * Create instance of AbsoluteDomRect class.
	 *
	 * @param {HTMLElement|Range|Object} elementOrRangeOrRect Source object to create the rect.
	 */
	constructor( elementOrRangeOrRect ) {
		Object.assign( this, getAbsoluteRect( elementOrRangeOrRect ) );
	}

	/**
	 * Clone instance of this class.
	 *
	 * @param {String} newName Name of new instance.
	 * @returns {AbsoluteDomRect}
	 */
	clone( newName ) {
		return new AbsoluteDomRect( this, newName );
	}

	/**
	 * Move current box to specified position.
	 *
	 * @param {Number} top New to position.
	 * @param {Number} left New left position.
	 * @returns {AbsoluteDomRect}
	 */
	moveTo( { top, left } ) {
		this.top = top;
		this.right = left + this.width;
		this.bottom = top + this.height;
		this.left = left;

		return this;
	}

	/**
	 * Get intersect surface area of this AbsoluteDomRect and other AbsoluteDomRect.
	 *
	 * @param {AbsoluteDomRect} rect
	 * @returns {Number} Overlap surface area.
	 */
	getIntersectArea( rect ) {
		const hOverlap = Math.max( 0, Math.min( this.right, rect.right ) - Math.max( this.left, rect.left ) );
		const vOverlap = Math.max( 0, Math.min( this.bottom, rect.bottom ) - Math.max( this.top, rect.top ) );

		return hOverlap * vOverlap;
	}
}

/**
 * Returns the client rect of an HTMLElement, Range, or rect. The obtained geometry of the rect
 * corresponds with `position: absolute` relative to the `<body>` (`document.body`).
 *
 * @private
 * @param {HTMLElement|Range|Object} elementOrRangeOrRect Target object witch rect is to be determined.
 * @returns {Object} Client rect object.
 */
function getAbsoluteRect( elementOrRangeOrRect ) {
	if ( elementOrRangeOrRect instanceof HTMLElement || elementOrRangeOrRect instanceof Range ) {
		const elementRect = elementOrRangeOrRect.getBoundingClientRect();
		const bodyRect = document.body.getBoundingClientRect();

		return {
			top: elementRect.top - bodyRect.top,
			right: elementRect.right - bodyRect.left,
			bottom: elementRect.bottom - bodyRect.top,
			left: elementRect.left - bodyRect.left,
			width: elementRect.width,
			height: elementRect.height
		};
	}

	// The rect has been passed.
	const absoluteRect = Object.assign( {}, elementOrRangeOrRect );

	if ( absoluteRect.width === undefined ) {
		absoluteRect.width = absoluteRect.right - absoluteRect.left;
	}

	if ( absoluteRect.height === undefined ) {
		absoluteRect.height = absoluteRect.bottom - absoluteRect.top;
	}

	return absoluteRect;
}

/**
 * Returns the client rect of the element limited by the visible (to the user)
 * viewport of the browser window.
 *
 *		[Browser viewport]
 *		+---------------------------------------+
 *		|                        [Element]      |
 *		|                        +----------------------+
 *		|                        |##############|       |
 *		|                        |##############|       |
 *		|                        |#######^######|       |
 *		|                        +-------|--------------+
 *		|                                |      |
 *		+--------------------------------|------+
 *		                                 |
 *		                                  \- [Element rect visible in the viewport]
 *
 * @private
 * @param {HTMLElement|Object} element Object which visible area rect is to be determined.
 * @returns {AbsoluteDomRect} An absolute rect of the area visible in the viewport.
 */
function getAbsoluteRectVisisbleInTheViewport( element ) {
	const limiterRect = new AbsoluteDomRect( element, 'limiterElement' );

	const windowScrollX = window.scrollX;
	const windowScrollY = window.scrollY;
	const bodyWidth = document.body.clientWidth;
	const bodyHeight = document.body.clientHeight;

	return new AbsoluteDomRect( {
		top: Math.max( limiterRect.top, windowScrollY ),
		left: Math.max( limiterRect.left, windowScrollX ),
		right: Math.min( limiterRect.right, bodyWidth + windowScrollX ),
		bottom: Math.min( limiterRect.bottom, bodyHeight + windowScrollY )
	} );
}

/**
 * The balloon panel view {@link ui.Model model} interface.
 *
 * @interface ui.balloonPanel.BalloonPanelViewModel
 */

/**
 * The absolute top position of the balloon panel in pixels.
 *
 * @observable
 * @member {Number} ui.balloonPanel.BalloonPanelViewModel#top
 */

/**
 * The absolute left position of the balloon panel in pixels.
 *
 * @observable
 * @member {Number} ui.balloonPanel.BalloonPanelViewModel#left
 */

/**
 * The maximum width of the balloon panel, as in CSS.
 *
 * @observable
 * @member {Number} ui.balloonPanel.BalloonPanelViewModel#maxWidth
 */

/**
 * Balloon panel arrow direction.
 *
 * @observable
 * @member {'se'|'sw'|'ne'|'nw'} ui.balloonPanel.BalloonPanelViewModel#arrow
 */

/**
 * Controls whether the balloon panel is visible or not.
 *
 * @observable
 * @member {Boolean} ui.balloonPanel.BalloonPanelViewModel#isVisible
 */
