/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* globals document */
/* bender-tags: ui, toolbar */

import Model from 'ckeditor5/ui/model.js';
import View from 'ckeditor5/ui/view.js';
import StickyToolbar from 'ckeditor5/ui/toolbar/sticky/stickytoolbar.js';

describe( 'StickyToolbar', () => {
	let toolbar, view, model, limiterElement;

	beforeEach( () => {
		limiterElement = document.createElement( 'div' );

		model = new Model( {
			isActive: false,
			limiterElement: limiterElement
		} );

		view = new View();
		toolbar = new StickyToolbar( model, view );
	} );

	describe( 'constructor', () => {
		it( 'binds view attributes to the StickyToolbar#model', () => {
			expect( view.isActive ).to.equal( model.isActive );
			expect( view.limiterElement ).to.equal( limiterElement );
		} );
	} );
} );
