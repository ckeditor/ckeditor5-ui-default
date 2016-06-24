/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, icon */

'use strict';

import Icon from '/ckeditor5/ui/icon/icon.js';
import IconView from '/ckeditor5/ui/icon/iconview.js';
import Model from '/ckeditor5/ui/model.js';

describe( 'IconView', () => {
	let model, view;

	beforeEach( () => {
		model = new Model( {
			name: 'foo',
			align: null
		} );

		view = new IconView();

		return new Icon( model, view ).init();
	} );

	describe( 'constructor', () => {
		it( 'creates element from template', () => {
			expect( view.element.tagName ).to.be.equal( 'svg' );
			expect( view.element.getAttribute( 'class' ) ).to.be.equal( 'ck-icon' );
		} );
	} );

	describe( '<svg> bindings', () => {
		describe( 'xlink:href', () => {
			it( 'reacts to changes in model#name', () => {
				const svgUseElement = view.element.firstChild;
				const svgHrefNs = 'http://www.w3.org/1999/xlink';

				expect( svgUseElement.getAttributeNS( svgHrefNs, 'href' ) ).to.be.equal( '#ck-icon-foo' );

				model.name = 'abc';

				expect( svgUseElement.getAttributeNS( svgHrefNs, 'href' ) ).to.be.equal( '#ck-icon-abc' );
			} );

			it( 'reacts to changes in model#align', () => {
				expect( view.element.getAttribute( 'class' ) ).to.be.equal( 'ck-icon' );

				model.align = 'RIGHT';

				expect( view.element.classList.contains( 'ck-icon-right' ) ).to.be.true;
				expect( view.element.classList.contains( 'ck-icon-left' ) ).to.be.false;

				model.align = 'LEFT';

				expect( view.element.classList.contains( 'ck-icon-right' ) ).to.be.false;
				expect( view.element.classList.contains( 'ck-icon-left' ) ).to.be.true;
			} );
		} );
	} );
} );