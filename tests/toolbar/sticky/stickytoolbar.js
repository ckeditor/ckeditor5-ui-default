/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, toolbar */

'use strict';

import Model from '/ckeditor5/ui/model.js';
import StickyToolbar from '/ckeditor5/ui/toolbar/sticky/stickytoolbar.js';
import StickyToolbarView from '/ckeditor5/ui/toolbar/sticky/stickytoolbarview.js';

describe( 'StickyToolbar', () => {
	let toolbar, view, model;

	beforeEach( () => {
		model = new Model( {
			isActive: false
		} );

		view = new StickyToolbarView();
		toolbar = new StickyToolbar( model, view );
	} );

	describe( 'constructor', () => {
		it( 'binds view#model attributes to the StickyToolbar#model', () => {
			expect( view.model.isActive ).to.equal( model.isActive );
		} );
	} );
} );
