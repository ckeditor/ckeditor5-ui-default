/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, iconmanager */

<<<<<<< HEAD
import testUtils from 'tests/core/_utils/utils.js';
import IconManager from 'ckeditor5/ui/iconmanager/iconmanager.js';
import IconManagerView from 'ckeditor5/ui/iconmanager/iconmanagerview.js';
import Model from 'ckeditor5/ui/model.js';
=======
import testUtils from '/tests/core/_utils/utils.js';
import IconManagerView from '/ckeditor5/ui/iconmanager/iconmanagerview.js';
>>>>>>> Refactoring in IconManager* classes and tests.

testUtils.createSinonSandbox();

describe( 'IconManagerView', () => {
	let view;

	beforeEach( () => {
		view = new IconManagerView();
		view.sprite = '<symbol><title>foo</title></symbol>';

		return view.init();
	} );

<<<<<<< HEAD
	describe( 'constructor()', () => {
=======
	describe( 'constructor', () => {
		it( 'sets initial view attribute values', () => {
			expect( new IconManagerView().sprite ).to.be.null;
		} );

>>>>>>> Refactoring in IconManager* classes and tests.
		it( 'creates element from template', () => {
			expect( view.element.tagName ).to.equal( 'svg' );
			expect( view.element.getAttribute( 'class' ) ).to.equal( 'ck-icon-manager__sprite' );
		} );
	} );

	describe( 'init', () => {
		it( 'initializes the sprite', () => {
			expect( view.element.innerHTML ).to.equal( '<symbol><title>foo</title></symbol>' );
		} );
	} );
} );
