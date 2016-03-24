/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, icon */

'use strict';

import testUtils from '/tests/ckeditor5/_utils/utils.js';
import IconView from '/ckeditor5/ui/iconview.js';
import Model from '/ckeditor5/ui/model.js';

testUtils.createSinonSandbox();

describe( 'IconView', () => {
	let model, view;

	beforeEach( () => {
		model = new Model( {
			icon: 'foo'
		} );
		view = new IconView( model );
	} );

	describe( 'constructor', () => {
		it( 'calls _createViewElement', () => {
			const spy = testUtils.sinon.spy( IconView.prototype, '_createViewElement' );

			view = new IconView( model );

			expect( spy.calledOnce ).to.be.true;
		} );
	} );

	describe( '_createViewElement', () => {
		it( 'creates view.element', () => {
			view._createViewElement();

			expect( view.element.tagName ).to.be.equal( 'svg' );
			expect( view.element.getAttribute( 'class' ) ).to.be.equal( 'ck-icon ck-icon-left' );
		} );

		it( 'creates view.use', () => {
			view._createViewElement();

			expect( view.use.tagName ).to.be.equal( 'use' );
			expect( view.use.getAttribute( 'xlink:href' ) ).to.be.equal( '#ck-icon-foo' );
		} );

		it( 'creates model#change:icon binding', () => {
			view._createViewElement();

			expect( view.use.getAttribute( 'xlink:href' ) ).to.be.equal( '#ck-icon-foo' );
			model.icon = 'abc';
			expect( view.use.getAttribute( 'xlink:href' ) ).to.be.equal( '#ck-icon-abc' );
		} );
	} );
} );
