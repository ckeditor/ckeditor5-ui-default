/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, icon */

<<<<<<< HEAD
import Icon from 'ckeditor5/ui/icon/icon.js';
import IconView from 'ckeditor5/ui/icon/iconview.js';
import Model from 'ckeditor5/ui/model.js';
=======
import IconView from '/ckeditor5/ui/icon/iconview.js';
>>>>>>> Removed Icon controller. Updated tests of IconView.

describe( 'IconView', () => {
	let view;

	beforeEach( () => {
		return ( view = new IconView() ).init();
	} );

	describe( 'constructor()', () => {
		it( 'creates element from template', () => {
			expect( view.element.tagName ).to.equal( 'svg' );
			expect( view.element.getAttribute( 'class' ) ).to.equal( 'ck-icon' );
		} );
	} );

	describe( '<svg> bindings', () => {
		describe( 'xlink:href', () => {
			it( 'reacts to changes in model#name', () => {
				const svgUseElement = view.element.firstChild;
				const svgHrefNs = 'http://www.w3.org/1999/xlink';

				view.set( 'name', 'foo' );
				expect( svgUseElement.getAttributeNS( svgHrefNs, 'href' ) ).to.equal( '#ck-icon-foo' );

				view.name = 'abc';
				expect( svgUseElement.getAttributeNS( svgHrefNs, 'href' ) ).to.equal( '#ck-icon-abc' );
			} );
		} );
	} );
} );
