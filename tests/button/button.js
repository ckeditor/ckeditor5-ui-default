/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, button */

'use strict';

import Editor from '/ckeditor5/core/editor.js';
import Button from '/ckeditor5/ui/button/button.js';
import View from '/ckeditor5/core/ui/view.js';
import Model from '/ckeditor5/core/ui/model.js';

describe( 'Button', () => {
	let model, button, view, editor;

	beforeEach( () => {
		editor = new Editor();
		model = new Model();
		view = new View();
		button = new Button( editor, model, view );
	} );

	describe( 'constructor', () => {
		it( 'works', () => {
			expect( button.view ).to.equal( view );
		} );
	} );
} );
