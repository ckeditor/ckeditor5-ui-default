/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/**
 * @module ui/balloonpanel/balloonpanelview
 */

/* globals window, Range, HTMLElement */

import View from '../view.js';
import Template from '../template.js';
import toUnit from '../../utils/dom/tounit.js';

const toPx = toUnit( 'px' );
const arrowLeftOffset = 30;
const arrowTopOffset = 15;

/**
 * The balloon panel view class.
 *
 * @extends module:ui/view~View
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
		 * @member {Number} #top
		 */
		this.set( 'top', 0 );

		/**
		 * The absolute left position of the balloon panel in pixels.
		 *
		 * @observable
		 * @default 0
		 * @member {Number} #left
		 */
		this.set( 'left', 0 );

		/**
		 * Balloon panel arrow direction.
		 *
		 * @observable
		 * @default 'se'
		 * @member {'se'|'sw'|'ne'|'nw'} #arrow
		 */
		this.set( 'arrow', 'se' );

		/**
		 * Controls whether the balloon panel is visible or not.
		 *
		 * @observable
		 * @default false
		 * @member {Boolean} #isVisible
		 */
		this.set( 'isVisible', false );

		/**
		 * Max width of the balloon panel, as in CSS.
		 *
		 * @observable
		 * @member {Number} #maxWidth
		 */

		/**
		 * Collection of the child views which creates balloon panel contents.
		 *
		 * @readonly
		 * @member {module:ui/viewcollection~ViewCollection}
		 */
		this.content = this.createCollection();

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
			},

			children: this.content
		} );
	}

	/**
	 * Shows the balloon panel.
	 *
	 * See {@link #isVisible}.
	 */
	show() {
		this.isVisible = true;
	}

	/**
	 * Hides the balloon panel.
	 *
	 * See {@link #isVisible}.
	 */
	hide() {
		this.isVisible = false;
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
	 * The heuristics chooses from among 4 available positions relative to the target DOM element or range:
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
	 * See {@link #arrow}.
	 *
	 * @param {HTMLElement|Range} elementOrRange Target DOM element or range to which the balloon will be attached.
	 * @param {HTMLElement|Object} limiterElementOrRect The DOM element or element rect
	 * beyond which area the balloon panel should not be positioned, if possible.
	 */
	attachTo( elementOrRange, limiterElementOrRect ) {
		this.show();

		const elementOrRangeRect = new AbsoluteDomRect( elementOrRange );
		const panelRect = new AbsoluteDomRect( this.element );
		const limiterVisibleRect = getAbsoluteRectVisibleInTheViewport( limiterElementOrRect );

		// Create a rect for each of the possible balloon positions and feed them to _smartAttachTo,
		// which will use whichever is the optimal. Position are ordered from most to less desired.
		const possiblePanelRects = {
			// The absolute rect for "South east" position.
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

		this._smartAttachTo( possiblePanelRects, limiterVisibleRect, panelRect.width * panelRect.height );
	}

	/**
	 * For the given set of possible rects, chooses the one which fits the best into both - browser viewport and
	 * `visibleContainerRect`, which is when their intersection has the biggest area. Note that priority is a possible
	 * highest intersection area with browser viewport.
	 *
	 * @private
	 * @param {Object} rects Set of positions where balloon can be placed.
	 * @param {module:ui/balloonpanel/balloonpanelview~AbsoluteDomRect} visibleContainerRect The absolute rect of the
	 * visible part of container element.
	 * @param {Number} panelSurfaceArea Panel surface area.
	 */
	_smartAttachTo( rects, visibleContainerRect, panelSurfaceArea ) {
		const viewportRect = new AbsoluteDomRect( getAbsoluteViewportRect() );
		const positionedAncestor = getPositionedAncestor( this.element.parentElement );

		let maxIntersectRectPos;
		let maxContainerIntersectArea = -1;
		let maxViewportIntersectArea = -1;

		// Find the best place. Stop searching when the position with fully visible panel has been found.
		Object.keys( rects ).some( ( rectPos ) => {
			const containerIntersectArea = rects[ rectPos ].getIntersectArea( visibleContainerRect );
			const viewportIntersectArea = rects[ rectPos ].getIntersectArea( viewportRect );

			if ( viewportIntersectArea >= maxViewportIntersectArea && containerIntersectArea > maxContainerIntersectArea ) {
				maxIntersectRectPos = rectPos;
				maxContainerIntersectArea = containerIntersectArea;
				maxViewportIntersectArea = viewportIntersectArea;
			}

			return maxContainerIntersectArea === panelSurfaceArea;
		} );

		// Move the balloon panel.
		this.arrow = maxIntersectRectPos;

		let { top, left } = rects[ maxIntersectRectPos ];

		// (#126) If there's some positioned ancestor of the panel, then its positioned rect must be taken into
		// consideration because `AbsoluteDomRect` is always relative to the viewport.
		if ( positionedAncestor ) {
			const positionedAncestorRect = positionedAncestor.getBoundingClientRect();

			top -= positionedAncestorRect.top;
			left -= positionedAncestorRect.left;
		}

		this.top = top;
		this.left = left;
	}
}

/**
 * A class which represents a client rect of an HTMLElement or a Range in DOM.
 *
 * @private
 */
class AbsoluteDomRect {
	// Create instance of AbsoluteDomRect class.
	//
	// @param {HTMLElement|Range|Object} elementOrRangeOrRect Source object to create the rect.
	constructor( elementOrRangeOrRect ) {
		Object.assign( this, getAbsoluteRect( elementOrRangeOrRect ) );
	}

	// Clone instance of this class.
	//
	// @returns {AbsoluteDomRect}
	clone() {
		return new AbsoluteDomRect( this );
	}

	// Move current box to specified position.
	//
	// @param {Number} top New to position.
	// @param {Number} left New left position.
	// @returns {AbsoluteDomRect}
	moveTo( { top, left } ) {
		this.top = top;
		this.right = left + this.width;
		this.bottom = top + this.height;
		this.left = left;

		return this;
	}

	// Get intersect surface area of this AbsoluteDomRect and other AbsoluteDomRect.
	//
	// @param {AbsoluteDomRect} rect
	// @returns {Number} Overlap surface area.
	getIntersectArea( rect ) {
		const hOverlap = Math.max( 0, Math.min( this.right, rect.right ) - Math.max( this.left, rect.left ) );
		const vOverlap = Math.max( 0, Math.min( this.bottom, rect.bottom ) - Math.max( this.top, rect.top ) );

		return hOverlap * vOverlap;
	}
}

// Returns the client rect of an HTMLElement, Range, or rect. The obtained geometry of the rect
// corresponds with `position: absolute` relative to the `<body>` (`document.body`).
//
// @private
// @param {HTMLElement|Range|Object} elementOrRangeOrRect Target object witch rect is to be determined.
// @returns {Object} Client rect object.
function getAbsoluteRect( elementOrRangeOrRect ) {
	if ( elementOrRangeOrRect instanceof HTMLElement || elementOrRangeOrRect instanceof Range ) {
		let { top, right, bottom, left, width, height } = elementOrRangeOrRect.getBoundingClientRect();

		return { top, right, bottom, left, width, height };
	}
	// A rect has been passed.
	else {
		const absoluteRect = Object.assign( {}, elementOrRangeOrRect );

		if ( absoluteRect.width === undefined ) {
			absoluteRect.width = absoluteRect.right - absoluteRect.left;
		}

		if ( absoluteRect.height === undefined ) {
			absoluteRect.height = absoluteRect.bottom - absoluteRect.top;
		}

		return absoluteRect;
	}
}

// For a given element, returns the nearest ancestor element which position is not "static".
//
// @private
// @param {HTMLElement} element Element which ancestors are checked.
// @returns {HTMLElement|null}
function getPositionedAncestor( element ) {
	while ( element && element.tagName.toLowerCase() != 'html' ) {
		if ( window.getComputedStyle( element ).position != 'static' ) {
			return element;
		}

		element = element.parentNode;
	}

	return null;
}

// Returns the client rect of the element limited by the visible (to the user)
// viewport of the browser window.
//
//		[Browser viewport]
//		+---------------------------------------+
//		|                        [Element]      |
//		|                        +----------------------+
//		|                        |##############|       |
//		|                        |##############|       |
//		|                        |#######^######|       |
//		|                        +-------|--------------+
//		|                                |      |
//		+--------------------------------|------+
//		                                 |
//		                                  \- [Element rect visible in the viewport]
//
// @private
// @param {HTMLElement|Object} element Object which visible area rect is to be determined.
// @returns {AbsoluteDomRect} An absolute rect of the area visible in the viewport.
function getAbsoluteRectVisibleInTheViewport( element ) {
	const elementRect = getAbsoluteRect( element );
	const viewportRect = getAbsoluteViewportRect();

	return new AbsoluteDomRect( {
		top: Math.max( elementRect.top, viewportRect.top ),
		left: Math.max( elementRect.left, viewportRect.left ),
		right: Math.min( elementRect.right, viewportRect.right ),
		bottom: Math.min( elementRect.bottom, viewportRect.bottom )
	} );
}

// Get browser viewport rect.
//
// @private
// @returns {Object} Viewport rect.
function getAbsoluteViewportRect() {
	const windowScrollX = window.scrollX;
	const windowScrollY = window.scrollY;
	const windowWidth = window.innerWidth;
	const windowHeight = window.innerHeight;

	return {
		top: windowScrollY,
		right: windowWidth + windowScrollX,
		bottom: windowHeight + windowScrollY,
		left: windowScrollX
	};
}
