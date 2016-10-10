/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* globals document, window */

import Template from '../../template.js';
import ToolbarView from '../toolbarview.js';
import toUnit from '../../../utils/dom/tounit.js';

const toPx = toUnit( 'px' );

/**
 * The sticky toolbar view class.
 *
 * See {@link ui.stickyToolbar.StickyToolbar}, {@link ui.toolbar.ToolbarView}.
 *
 * @memberOf ui.stickyToolbar
 * @extends ui.toolbar.ToolbarView
 */
export default class StickyToolbarView extends ToolbarView {
	/**
	 * @inheritDoc
	 */
	constructor( locale ) {
		super( locale );

		const bind = this.bind;

		this.model.set( 'isSticky', false );
		this.model.set( 'left', null );
		this.model.set( 'marginLeft', null );
		this.model.set( 'limiterElement', null );
		this.model.set( 'limiterOffset', 50 );
		this.model.set( '_isStickyToTheLimiter', false );

		Template.extend( this.template, {
			attributes: {
				class: [
					// Toggle class of the toolbar when "sticky" state changes in the model.
					bind.if( 'isSticky', 'ck-toolbar_sticky' ),
					bind.if( '_isStickyToTheLimiter', 'ck-toolbar_sticky_bottom-limit' ),
				],
				style: {
					width: bind.to( 'isSticky', ( isSticky ) => {
						if ( isSticky ) {
							const toolbarComputedStyle = window.getComputedStyle( this.element );

							return toPx(
								this._elementPlaceholder.getBoundingClientRect().width +

								// getBoundingClientRect returns dimensions including the border width.
								// When going sticky, the toolbar gets the border. If the border is not
								// considered, the sticky toolbar becomes narrower than the placeholder.
								parseFloat( toolbarComputedStyle.borderLeftWidth ) +
								parseFloat( toolbarComputedStyle.borderRightWidth )
							);
						}

						return null;
					} ),

					top: bind.to( '_isStickyToTheLimiter', ( _isStickyToTheLimiter ) => {
						return _isStickyToTheLimiter ?
								toPx( window.scrollY + this._limiterRect.bottom - this._toolbarRect.height - this.model.limiterOffset )
							:
								null;
					} ),

					left: bind.to( 'left' ),
					marginLeft: bind.to( 'marginLeft' )
				}
			}
		} );

		/**
		 * A dummy element which visually fills the space as long as the
		 * actual toolbar is sticky. It prevents flickering of the UI.
		 *
		 * @private
		 * @property {HTMLElement} ui.stickyToobar.StickyToolbarView#_elementPlaceholder
		 */
		this._elementPlaceholder = new Template( {
			tag: 'div',
			attributes: {
				class: [
					'ck-toolbar__placeholder'
				],
				style: {
					display: bind.to( 'isSticky', isSticky => isSticky ? 'block' : 'none' ),
					height: bind.to( 'isSticky', ( isSticky ) => {
						return isSticky ? toPx( this._toolbarRect.height ) : null;
					} )
				}
			}
		} ).render();

		/**
		 * The DOM bounding client rect of the {@link ui.View#element} of the toolbar.
		 *
		 * @protected
		 * @member {Object} ui.stickyToobar.StickyToolbarView#_toolbarRect
		 */

		/**
		 * The DOM bounding client rect of the {@link ui.stickyToobar.StickyToolbarViewModel#limiterElement}
		 * of the toolbar.
		 *
		 * @protected
		 * @member {Object} ui.stickyToobar.StickyToolbarView#_limiterRect
		 */

		/**
		 * Model of this sticky toolbar view.
		 *
		 * @member {ui.stickyToobar.StickyToolbarViewModel} ui.stickyToolbar.StickyToolbarView#model
		 */
	}

	init() {
		super.init();

		this.element.parentNode.insertBefore( this._elementPlaceholder, this.element );

		// Update sticky state of the toolbar as the window is being scrolled.
		this.listenTo( window, 'scroll', () => {
			this._checkIfShouldBeSticky();
		} );

		// Synchronize with `model.isActive` because sticking an inactive toolbar is pointless.
		this.listenTo( this.model, 'change:isActive', () => {
			this._checkIfShouldBeSticky();
		} );
	}

	/**
	 * Destroys the toolbar and removes the {@link _elementPlaceholder}.
	 */
	destroy() {
		super.destroy();

		this._elementPlaceholder.remove();
	}

	/**
	 * Analyzes the environment to decide whether the toolbar should
	 * be sticky or not. Then, it uses {@link _stick} and {@link _detach}
	 * methods to manage the state of the toolbar.
	 *
	 * @protected
	 */
	_checkIfShouldBeSticky() {
		const limiterRect = this._limiterRect = this.model.limiterElement.getBoundingClientRect();
		const toolbarRect = this._toolbarRect = this.element.getBoundingClientRect();

		// The toolbar must be active to become sticky.
		this.model.isSticky = this.model.isActive &&
			// The limiter's top edge must be beyond the upper edge of the visible viewport.
			limiterRect.top < 0 &&
			// The model#limiterElement's height mustn't be smaller than the toolbar's height and model#limiterOffset.
			// There's no point in entering the sticky mode if the model#limiterElement is very, very small, because
			// it would immediately set model#_isStickyToTheLimiter true and, given model#limiterOffset, the toolbar
			// would be positioned before the model#limiterElement.
			this._toolbarRect.height + this.model.limiterOffset < limiterRect.height;

		// Stick the toolbar to the top edge of the viewport simulating CSS position:sticky.
		// TODO: Possibly replaced by CSS in the future http://caniuse.com/#feat=css-sticky
		if ( this.model.isSticky ) {
			this.model._isStickyToTheLimiter = limiterRect.bottom < toolbarRect.height + this.model.limiterOffset;

			if ( this.model._isStickyToTheLimiter ) {
				this.model.left = toPx( limiterRect.left - document.body.getBoundingClientRect().left );
				this.model.marginLeft = null;
			} else {
				this.model.left = null;
				this.model.marginLeft = toPx( -window.scrollX - 1 );
			}
		}
		// Detach the toolbar from the top edge of the viewport.
		else {
			this.model._isStickyToTheLimiter = false;
			this.model.marginLeft = this.model.left = null;
		}
	}
}

/**
 * The sticky toolbar view {@link ui.Model} interface.
 *
 * @interface ui.stickyToobar.StickyToolbarViewModel
 */

/**
 * Controls whether the sticky toolbar should be active. When any editable
 * is focused in the editor, toolbar becomes active.
 *
 * @readonly
 * @observable
 * @member {Boolean} ui.stickyToobar.StickyToolbarViewModel#isActive
 */

/**
 * Controls whether the sticky toolbar is in the "sticky" state.
 *
 * @readonly
 * @observable
 * @member {Boolean} ui.stickyToobar.StickyToolbarViewModel#isSticky
 */

/**
 * Controls the `left` CSS style of the toolbar.
 *
 * @readonly
 * @observable
 * @member {String} ui.stickyToobar.StickyToolbarViewModel#left
 */

/**
 * Controls the `margin-left` CSS style of the toolbar.
 *
 * @readonly
 * @observable
 * @member {String} ui.stickyToobar.StickyToolbarViewModel#marginLeft
 */

/**
 * The limiter element for the sticky toolbar instance. Its bounding rect limits
 * the "stickyness" of the toolbar, i.e. when the toolbar reaches the bottom
 * edge of the limiter, it becomes sticky to that edge and does not float
 * off the limiter. It is mandatory for the toolbar to work properly and once
 * set, it cannot be changed.
 *
 * @readonly
 * @observable
 * @member {HTMLElement} ui.stickyToobar.StickyToolbarViewModel#limiterElement
 */

/**
 * The offset from the bottom edge of {@link ui.stickyToobar.StickyToolbarViewModel#limiterElement}
 * which stops the toolbar from stickying any further to prevent limiter's content
 * from being completely covered.
 *
 * @readonly
 * @observable
 * @default 50
 * @member {Number} ui.stickyToobar.StickyToolbarViewModel#limiterOffset
 */

/**
 * Set `true` if the sticky toolbar reached the bottom edge of the
 * {@link ui.stickyToobar.StickyToolbarViewModel#limiterElement}.
 *
 * @protected
 * @readonly
 * @observable
 * @member {Boolean} ui.stickyToobar.StickyToolbarViewModel#_isStickyToTheLimiter
 */
