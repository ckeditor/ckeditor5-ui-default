/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import ToolbarView from '../toolbar/toolbarview.js';

/**
 * The stocky toolbar view class.
 *
 * @memberOf ui.toolbar
 * @extends ui.toolbar
 */

export default class StickyToolbarView extends ToolbarView {
	constructor( model ) {
		super( model );

		this.model.set( 'isSticky', false );

		const bind = this.attributeBinder;
		this.template.attributes.class.push( bind.if( 'isSticky', 'ck-toolbar-sticky' ) );
	}

	init() {
		super.init();

		/**
		 * Toolbar placeholder is a dummy element which replaces the actual toolbar as
		 * long as the actual toolbar is sticky. It prevents flickering of the UI.
		 *
		 * @private
		 * @type {HTMLElement}
		 * @property _elementPlaceholder
		 */
		this._elementPlaceholder = document.createElement( 'div' );
		this._elementPlaceholder.classList.add( 'ck-toolbar-sticky-placeholder' );
		this.element.parentNode.insertBefore( this._elementPlaceholder, this.element );

		// Update sticky state of the toolbar as the window is being scrolled.
		this.listenTo( window, 'scroll', () => {
			this._checkIfShouldBeSticky();
		} );

		// Synchronize with `model.isActive` because sticking an inactive toolbar is pointless.
		this.model.on( 'change:isActive', ( evt, name, value ) => {
			if ( value ) {
				this._checkIfShouldBeSticky();
			} else {
				this._detach();
			}
		} );
	}

	/**
	 * TODO
	 *
	 * @protected
	 */
	_checkIfShouldBeSticky() {
		const rectElement = this.model.isSticky ?
			this._elementPlaceholder : this.element;
		const rect = rectElement.getBoundingClientRect();

		if ( rect.top < 0 && this.model.isActive ) {
			this._stick( rect );
		} else {
			this._detach();
		}
	}

	/**
	 * TODO
	 *
	 * @protected
	 */
	_stick( regionRect ) {
		const elementStyle = this.element.style;
		const placeholderStyle = this._elementPlaceholder.style;

		// Setup placeholder.
		placeholderStyle.display = 'block';
		placeholderStyle.height = regionRect.height + 'px';

		// Stick the top region.
		elementStyle.position = 'fixed';
		elementStyle.top = 0;
		elementStyle.background = 'rgba(0,0,255,.2)';
		elementStyle.width = regionRect.width + 'px';
		elementStyle.marginLeft = -window.scrollX + 'px';

		this.model.isSticky = true;
	}

	/**
	 * TODO
	 *
	 * @protected
	 */
	_detach() {
		const elementStyle = this.element.style;
		const placeholderStyle = this._elementPlaceholder.style;

		// Release the placeholder.
		placeholderStyle.display = 'none';

		// "Peel off" the top region.
		elementStyle.position = 'static';
		elementStyle.top = 'auto';
		elementStyle.background = 'none';
		elementStyle.width = 'auto';
		elementStyle.marginLeft = 'auto';

		this.model.isSticky = false;
	}
}
