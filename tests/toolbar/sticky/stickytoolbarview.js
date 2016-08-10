/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* globals document, window, Event, HTMLElement */
/* bender-tags: ui, toolbar */

import testUtils from '/tests/core/_utils/utils.js';
import StickyToolbar from '/ckeditor5/ui/toolbar/sticky/stickytoolbar.js';
import StickyToolbarView from '/ckeditor5/ui/toolbar/sticky/stickytoolbarview.js';
import ToolbarView from '/ckeditor5/ui/toolbar/toolbarview.js';
import Model from '/ckeditor5/ui/model.js';

testUtils.createSinonSandbox();

describe( 'StickyToolbarView', () => {
	let model, view;

	beforeEach( () => {
		model = new Model( {
			isActive: false
		} );

		view = new StickyToolbarView();
		document.body.appendChild( view.element );

		return new StickyToolbar( model, view ).init();
	} );

	describe( 'constructor', () => {
		it( 'inherits from ToolbarView', () => {
			expect( view ).to.be.instanceof( ToolbarView );
		} );

		it( 'sets view.model.isSticky false', () => {
			expect( view.model.isSticky ).to.be.false;
		} );
	} );

	describe( 'view.element bindings', () => {
		it( 'work when view.model.isSticky changes', () => {
			expect( view.element.classList.contains( 'ck-toolbar_sticky' ) ).to.be.false;

			view.model.isSticky = true;

			expect( view.element.classList.contains( 'ck-toolbar_sticky' ) ).to.be.true;
		} );
	} );

	describe( 'init', () => {
		it( 'creates view._elementPlaceholder', () => {
			expect( view._elementPlaceholder.classList.contains( 'ck-toolbar__placeholder' ) ).to.be.true;
			expect( view.element.previousSibling ).to.equal( view._elementPlaceholder );
		} );

		it( 'listens to window#scroll event and calls view._checkIfShouldBeSticky', () => {
			const spy = testUtils.sinon.spy( view, '_checkIfShouldBeSticky' );

			window.dispatchEvent( new Event( 'scroll' ) );

			expect( spy.calledOnce ).to.be.true;
		} );

		it( 'listens to model.isActive calls view._checkIfShouldBeSticky or view.detach', () => {
			const checkSpy = testUtils.sinon.spy( view, '_checkIfShouldBeSticky' );
			const detachSpy = testUtils.sinon.spy( view, '_detach' );

			expect( checkSpy.notCalled ).to.be.true;
			expect( detachSpy.notCalled ).to.be.true;

			model.isActive = true;

			expect( checkSpy.calledOnce ).to.be.true;
			expect( detachSpy.calledOnce ).to.be.true;

			model.isActive = false;

			expect( checkSpy.calledOnce ).to.be.true;
			expect( detachSpy.calledTwice ).to.be.true;
		} );
	} );

	describe( 'destroy', () => {
		it( 'calls destroy on parent class', () => {
			const spy = testUtils.sinon.spy( ToolbarView.prototype, 'destroy' );

			view.destroy();

			expect( spy.calledOnce ).to.be.true;
		} );

		it( 'removes view._elementPlaceholder from DOM', () => {
			view.destroy();
			expect( view._elementPlaceholder.parentNode ).to.be.null;
		} );
	} );

	describe( '_checkIfShouldBeSticky', () => {
		it( 'sticks the toolbar if beyond the top of the viewport (toolbar is active)', () => {
			model.isActive = true;

			testUtils.sinon.stub( HTMLElement.prototype, 'getBoundingClientRect', () => {
				return {
					top: -10
				};
			} );

			const stickSpy = testUtils.sinon.spy( view, '_stick' );
			const detachSpy = testUtils.sinon.spy( view, '_detach' );

			view._checkIfShouldBeSticky();

			expect( stickSpy.calledOnce ).to.be.true;
			expect( detachSpy.notCalled ).to.be.true;
		} );

		it( 'detaches the toolbar if beyond the top of the viewport (toolbar is inactive)', () => {
			model.isActive = false;

			testUtils.sinon.stub( HTMLElement.prototype, 'getBoundingClientRect', () => {
				return {
					top: -10
				};
			} );

			const stickSpy = testUtils.sinon.spy( view, '_stick' );
			const detachSpy = testUtils.sinon.spy( view, '_detach' );

			view._checkIfShouldBeSticky();

			expect( stickSpy.notCalled ).to.be.true;
			expect( detachSpy.calledOnce ).to.be.true;
		} );

		it( 'detaches the toolbar if in the viewport (toolbar is active)', () => {
			model.isActive = true;

			testUtils.sinon.stub( HTMLElement.prototype, 'getBoundingClientRect', () => {
				return {
					top: 10
				};
			} );

			const stickSpy = testUtils.sinon.spy( view, '_stick' );
			const detachSpy = testUtils.sinon.spy( view, '_detach' );

			view._checkIfShouldBeSticky();

			expect( stickSpy.notCalled ).to.be.true;
			expect( detachSpy.calledOnce ).to.be.true;
		} );
	} );

	describe( '_stick', () => {
		it( 'updates view._elementPlaceholder styles', () => {
			view._stick( { top: 10, width: 20, height: 30 } );

			expect( view._elementPlaceholder.style.display ).to.equal( 'block' );
			expect( view._elementPlaceholder.style.height ).to.equal( '30px' );
		} );

		it( 'updates view.element styles', () => {
			view._stick( { top: 10, width: 20, height: 30 } );

			expect( view.element.style.width ).to.equal( '22px' );
			// It's tricky to mock window.scrollX.
			expect( view.element.style.marginLeft ).to.not.equal( '' );
		} );

		it( 'updates view.model.isSticky attribute', () => {
			expect( view.model.isSticky ).to.be.false;

			view._stick( { top: 10, width: 20, height: 30 } );

			expect( view.model.isSticky ).to.be.true;
		} );
	} );

	describe( '_detach', () => {
		it( 'updates view._elementPlaceholder styles', () => {
			view._detach();

			expect( view._elementPlaceholder.style.display ).to.equal( 'none' );
		} );

		it( 'updates view.element styles', () => {
			view._detach();

			expect( view.element.style.width ).to.equal( 'auto' );
			expect( view.element.style.marginLeft ).to.equal( 'auto' );
		} );

		it( 'updates view.model.isSticky attribute', () => {
			view.model.isSticky = true;

			view._detach();

			expect( view.model.isSticky ).to.be.false;
		} );
	} );
} );
