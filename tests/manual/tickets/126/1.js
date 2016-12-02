/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* global document */

import BalloonPanelView from 'ckeditor5/ui/balloonpanel/balloonpanelview.js';

createPanel( 'static' );
createPanel( 'relative' );
createPanel( 'absolute' );
createPanel( 'fixed' );

function createPanel( selector ) {
	const view = new BalloonPanelView();

	view.element.innerHTML = `Parent of this panel has position:${ selector }.`;
	view.init().then( () => {
		document.querySelector( `#${ selector }-container` ).appendChild( view.element );

		view.attachTo( document.querySelector( `#anchor-${ selector }` ) );
		view.isVisible = true;
	} );
}
