/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, iconmanager */

import testUtils from 'tests/core/_utils/utils.js';
import IconManagerView from 'ckeditor5/ui/iconmanager/iconmanagerview.js';

testUtils.createSinonSandbox();

describe( 'IconManagerView', () => {
	let view;

	beforeEach( () => {
		view = new IconManagerView();
		view.sprite = '<symbol><title>foo</title></symbol>';

		return view.init();
	} );

	describe( 'constructor()', () => {
		it( 'sets initial view attribute values', () => {
			expect( new IconManagerView().sprite ).to.be.null;
		} );

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
