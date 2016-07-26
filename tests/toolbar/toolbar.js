/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, toolbar */

import Toolbar from '/ckeditor5/ui/toolbar/toolbar.js';
import ToolbarView from '/ckeditor5/ui/toolbar/toolbarview.js';
import ControllerCollection from '/ckeditor5/ui/controllercollection.js';
import Model from '/ckeditor5/ui/model.js';

describe( 'Toolbar', () => {
	let model, toolbar;

	beforeEach( () => {
		model = new Model();

		toolbar = new Toolbar( model, new ToolbarView() );
	} );

	describe( 'constructor', () => {
		it( 'accepts a model instance', () => {
			expect( toolbar.model ).to.equal( model );
		} );

		it( 'creates buttons collection', () => {
			expect( toolbar.collections.get( 'buttons' ) ).to.be.instanceof( ControllerCollection );
		} );
	} );
} );
