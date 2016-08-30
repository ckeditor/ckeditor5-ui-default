/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* globals window, document, Range, HTMLElement */

import View from '../view.js';
import Template from '../template.js';

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
					'ck-link-balloon-panel',
					bind.to( 'arrow', ( value ) =>  `ck-balloon-panel_arrow_${ value }` ),
					bind.if( 'isVisible', 'ck-balloon-panel_visible' ),
				],

				style: {
					top: bind.to( 'top', ( value ) => `${ value }px` ),
					left: bind.to( 'left', ( value ) => `${ value }px` ),
					maxWidth: bind.to( 'maxWidth', ( value ) => `${ value }px` ),
					maxHeight: bind.to( 'maxHeight', ( value ) => `${ value }px` ),
				}
			}
		} );

		this.register( 'content', el => el );

		/**
		 * Model of this balloon panel view.
		 *
		 * @member {ui.balloonPanel.BalloonPanelView} ui.balloonPanel.BalloonPanelView#model
		 */
	}

	/**
	 * Check if balloon is currently visible.
	 *
	 * @returns {Boolean}
	 */
	get isVisible() {
		return this.model.isVisible;
	}

	/**
	 * Show balloon and start listen to `keydown` event for closing by `Esc` key.
	 */
	show() {
		this.model.isVisible = true;

		// Attach keydown listener for closing panel on Esc press.
		this._keyCloseCallback = evt => {
			if ( evt.keyCode == 27 ) {
				this.hide();
			}
		};
		document.addEventListener( 'keydown', this._keyCloseCallback );
	}

	/**
	 * Hide balloon, and stop listen `keydown` event.
	 *
	 * @fires ui.balloonPanel.BalloonPanelModel#hide
	 */
	hide() {
		this.model.isVisible = false;
		this.model.fire( 'hide' );
		document.removeEventListener( 'keydown', this._keyCloseCallback );
	}

	/**
	 * Attach balloon panel to specified element or range including limits of viewport bounding box.
	 *
	 *  Balloon could show in 4 relative to the target element places:
	 * * South east:
	 *
	 * 		[ Target ]
	 *		    ^
	 *		+-----------------+
	 *		|                 |
	 *		+-----------------+
	 *
	 *
	 * * South west:
	 *
	 * 		         [ Target ]
	 *		              ^
	 *		+-----------------+
	 *		|                 |
	 *		+-----------------+
	 *
	 *
	 * * North east:
	 *
	 * 		+-----------------+
	 * 		|                 |
	 *		+-----------------+
	 *		    V
	 *		[ Target ]
	 *
	 *
	 * * North west:
	 *
	 * 		+-----------------+
	 * 		|                 |
	 *		+-----------------+
	 *		              V
	 *		         [ Target ]
	 *
	 * @param {HTMLElement|Range} elementOrRange Target element to which the balloon will be attached.
	 * @param {HTMLElement|Object} limiter Viewport element.
	 */
	attachTo( elementOrRange, limiter ) {
		this.show();

		const elementOrRangeRect = new AbsoluteDomRect( elementOrRange, 'elementOrRange' );
		const panelRect = new AbsoluteDomRect( this.element );
		const visibleInViewportRect = getVisibleInViewportRect( limiter );

		// Get bounding box of each available place and move balloon in this place where fits the best.
		this._smartAttachTo( [
			// South east.
			panelRect.clone( 'se' ).moveTo( {
				top: elementOrRangeRect.bottom + arrowTopOffset,
				left: elementOrRangeRect.left + elementOrRangeRect.width / 2 - arrowLeftOffset
			} ),

			// South west.
			panelRect.clone( 'sw' ).moveTo( {
				top: elementOrRangeRect.bottom + arrowTopOffset,
				left: elementOrRangeRect.left + elementOrRangeRect.width / 2 - panelRect.width + arrowLeftOffset
			} ),

			// North east.
			panelRect.clone( 'ne' ).moveTo( {
				top: elementOrRangeRect.top - panelRect.height - arrowTopOffset,
				left: elementOrRangeRect.left + elementOrRangeRect.width / 2 - arrowLeftOffset
			} ),

			// North west.
			panelRect.clone( 'nw' ).moveTo( {
				top: elementOrRangeRect.top - panelRect.height - arrowTopOffset,
				left: elementOrRangeRect.left + elementOrRangeRect.width / 2 - panelRect.width + arrowLeftOffset
			} )
		], visibleInViewportRect );
	}

	/**
	 * Move balloon in the place where fits the best.
	 *
	 * @private
	 * @param {Array<{AbsoluteDomRect}>} rects List of positions where balloon can be placed.
	 * @param {AbsoluteDomRect} visibleViewportRect Bounding box of visible part of viewport element.
	 */
	_smartAttachTo( rects, visibleViewportRect ) {
		let maxIntersectRect;
		let maxIntersectArea = -1;

		// Get best place.
		for ( let rect of rects ) {
			const intersectArea = rect.getIntersectArea( visibleViewportRect );

			if ( intersectArea > maxIntersectArea ) {
				maxIntersectRect = rect;
				maxIntersectArea = intersectArea;
			}
		}

		// Move balloon.
		this.model.arrow = maxIntersectRect.name;
		this.model.top = maxIntersectRect.top;
		this.model.left = maxIntersectRect.left;
	}
}

/**
 * The balloon panel view {@link ui.Model model} interface.
 *
 * @interface ui.balloonPanel.BalloonPanelViewModel
 */

/**
 * Top position of the balloon panel.
 *
 * @observable
 * @member {Number} ui.balloonPanel.BalloonPanelViewModel#top
 */

/**
 * Left position of the balloon panel.
 *
 * @observable
 * @member {Number} ui.balloonPanel.BalloonPanelViewModel#left
 */

/**
 * Max width of the balloon panel.
 *
 * @observable
 * @member {Number} ui.balloonPanel.BalloonPanelViewModel#maxWidth
 */

/**
 * Max height of the balloon panel.
 *
 * @observable
 * @member {Number} ui.balloonPanel.BalloonPanelViewModel#maxHeight
 */

/**
 * Balloon panel arrow direction.
 *
 * @observable
 * @member {'se'|sw'|'ne'|nw'} ui.balloonPanel.BalloonPanelViewModel#arrow
 */

/**
 * Controls whether the balloon panel is visible or not.
 *
 * @observable
 * @member {Boolean} ui.balloonPanel.BalloonPanelViewModel#isVisible
 */

/**
 * Private helper for count and manipulate bounding box of passed element relative to whole document.
 *
 * **Note** It is not bounding box relative to visible viewport like result of `element.getBoundingClientRect()`. It is relative to
 * whole document (includes scrollbars).
 *
 * @private
 */
class AbsoluteDomRect {
	/**
	 * Create instance of AbsoluteDomRect class.
	 *
	 * @param {HTMLElement|Range|Object} elementOrRangeOrRect Target object witch bounding box will be count.
	 * @param {String} [name=undefined] Name of class instance.
	 */
	constructor( elementOrRangeOrRect, name ) {
		if ( name ) {
			this.name = name;
		}

		Object.assign( this, getAbsoluteBoundingBoxOf( elementOrRangeOrRect ) );
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
	 * Move current bounding to passed coordinates.
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
 * Get relative to whole document bounding box of passed HTMLElement, Range, or Rect.
 *
 * @private
 * @param {HTMLElement|Range|Object} elementOrRangeOrRect Target object witch bounding box will be count.
 * @returns {Object} Bounding box coordinates.
 */
function getAbsoluteBoundingBoxOf( elementOrRangeOrRect ) {
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

	let boundingBox = Object.assign( {}, elementOrRangeOrRect );

	if ( boundingBox.width === undefined ) {
		boundingBox.width = boundingBox.right - boundingBox.left;
	}

	if ( boundingBox.height === undefined ) {
		boundingBox.width = boundingBox.bottom - boundingBox.top;
	}

	return boundingBox;
}

/**
 * Get bounding box of visible in viewport fragment of passed element.
 *
 * @private
 * @param {HTMLElement} element Element which visible area will be count.
 * @returns {AbsoluteDomRect} Bounding box of visible area.
 */
function getVisibleInViewportRect( element ) {
	const limiterRect = new AbsoluteDomRect( element, 'limiter' );
	const windowScrollX = window.scrollX;
	const windowScrollY = window.scrollY;
	const bodyWidth = document.body.clientWidth;
	const bodyHeight = document.body.clientHeight;

	// 	[Viewport]
	// 	+---------------------------------------+
	// 	|                        [Element]      |
	// 	|                        +----------------------+
	// 	|                        |##############|       |
	// 	|                        |##############|       |
	// 	|                        |##############|       |
	// 	|                        +-------^--------------+
	// 	|                                |      |
	// 	+--------------------------------|------+
	//                                   |
	//                                    \- [Visible Viewport Rect]
	//
	return new AbsoluteDomRect( {
		top: Math.max( limiterRect.top, windowScrollY ),
		left: Math.max( limiterRect.left, windowScrollX ),
		right: Math.min( limiterRect.right, bodyWidth + windowScrollX ),
		bottom: Math.min( limiterRect.bottom, bodyHeight + windowScrollY )
	}, 'visibleViewportRect' );
}
