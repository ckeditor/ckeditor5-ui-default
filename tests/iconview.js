/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, icon */

'use strict';

import IconView from '/ckeditor5/ui/icon/iconview.js';
import Model from '/ckeditor5/ui/model.js';

describe( 'IconView', () => {
	let model, view;

	beforeEach( () => {
		model = new Model( {
			icon: 'foo',
			align: undefined
		} );
		view = new IconView( model );
	} );

	describe( 'constructor', () => {
		it( 'creates element from template', () => {
			expect( view.element.tagName ).to.be.equal( 'svg' );
			expect( view.element.getAttribute( 'class' ) ).to.be.equal( 'ck-icon' );
		} );
	} );

	describe( '<svg> bindings', () => {
		describe( 'xlink:href', () => {
			it( 'reacts to model.icon', () => {
				const svgUseElement = view.element.firstChild;
				const svgHrefNs = 'http://www.w3.org/1999/xlink';

				expect( svgUseElement.getAttributeNS( svgHrefNs, 'href' ) ).to.be.equal( '#ck-icon-foo' );

				model.icon = 'abc';

				expect( svgUseElement.getAttributeNS( svgHrefNs, 'href' ) ).to.be.equal( '#ck-icon-abc' );
			} );

			it( 'reacts to model.align', () => {
				expect( view.element.getAttribute( 'class' ) ).to.be.equal( 'ck-icon' );

				model.align = 'right';

				expect( view.element.classList.contains( 'ck-icon-right' ) ).to.be.true;
			} );
		} );
	} );
} );
