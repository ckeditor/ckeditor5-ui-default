/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* globals document, window, Event */
/* bender-tags: ui, toolbar */

import testUtils from '/tests/core/_utils/utils.js';
import StickyToolbarView from '/ckeditor5/ui/toolbar/sticky/stickytoolbarview.js';
import ToolbarView from '/ckeditor5/ui/toolbar/toolbarview.js';

testUtils.createSinonSandbox();

describe( 'StickyToolbarView', () => {
	let model, view, element, limiterElement, locale;

	beforeEach( () => {
		locale = {};
		limiterElement = document.createElement( 'div' );

		view = new StickyToolbarView( locale );
		model = view.model;
		element = view.element;

		// This one is usually bound by the controller.
		model.set( 'isActive', false );

		// Dummy values just to let non–geometrical tests pass without reference errors.
		view._toolbarRect = { top: 10, right: 20, bottom: 30, left: 40, width: 50, height: 60 };
		view._limiterRect = { top: 5, right: 10, bottom: 15, left: 20, width: 25, height: 30 };

		document.body.appendChild( element );
	} );

	describe( 'constructor', () => {
		it( 'inherits from ToolbarView', () => {
			expect( view ).to.be.instanceof( ToolbarView );
		} );

		it( 'sets model attributes', () => {
			expect( model.isSticky ).to.be.false;
			expect( model.limiterElement ).to.be.null;
			expect( model.limiterOffset ).to.equal( 50 );

			expect( model._isStickyToTheLimiter ).to.be.false;
			expect( model._left ).to.be.null;
			expect( model._marginLeft ).to.be.null;
		} );

		it( 'accepts the locale', () => {
			expect( view.locale ).to.equal( locale );
		} );

		it( 'creates the _elementPlaceholder', () => {
			expect( view._elementPlaceholder.classList.contains( 'ck-toolbar__placeholder' ) ).to.be.true;
		} );
	} );

	describe( 'element model bindings', () => {
		beforeEach( () => {
			model.limiterElement = limiterElement;
		} );

		it( 'update the class on model#isSticky change', () => {
			model.isSticky = false;
			expect( element.classList.contains( 'ck-toolbar_sticky' ) ).to.be.false;

			model.isSticky = true;
			expect( element.classList.contains( 'ck-toolbar_sticky' ) ).to.be.true;
		} );

		it( 'update the class on model#_isStickyToTheLimiter change', () => {
			model._isStickyToTheLimiter = false;
			expect( element.classList.contains( 'ck-toolbar_sticky_bottom-limit' ) ).to.be.false;

			model._isStickyToTheLimiter = true;
			expect( element.classList.contains( 'ck-toolbar_sticky_bottom-limit' ) ).to.be.true;
		} );

		it( 'update the styles.width on model#isSticky change', () => {
			testUtils.sinon.stub( view._elementPlaceholder, 'getBoundingClientRect' ).returns( { width: 100 } );

			model.isSticky = false;
			expect( element.style.width ).to.equal( '' );

			model.isSticky = true;
			expect( element.style.width ).to.equal( '100px' );
		} );

		it( 'update the styles.top on model#isSticky change', () => {
			view._limiterRect = { bottom: 100 };
			view._toolbarRect = { height: 20 };
			window.scrollY = 10;

			model._isStickyToTheLimiter = false;
			expect( element.style.top ).to.equal( '' );

			model._isStickyToTheLimiter = true;
			expect( element.style.top ).to.equal( '40px' );
		} );

		it( 'update the styles.left on model#left change', () => {
			model._left = '30px';
			expect( element.style.left ).to.equal( '30px' );

			model._left = '10px';
			expect( element.style.left ).to.equal( '10px' );
		} );

		it( 'update the styles.marginLeft on model#marginLeft change', () => {
			model._marginLeft = '30px';
			expect( element.style.marginLeft ).to.equal( '30px' );

			model._marginLeft = '10px';
			expect( element.style.marginLeft ).to.equal( '10px' );
		} );
	} );

	describe( '_elementPlaceholder model bindings', () => {
		it( 'update the styles.display on model#isSticky change', () => {
			model.isSticky = false;
			expect( view._elementPlaceholder.style.display ).to.equal( 'none' );

			model.isSticky = true;
			expect( view._elementPlaceholder.style.display ).to.equal( 'block' );
		} );

		it( 'update the styles.height on model#isSticky change', () => {
			view._toolbarRect = { height: 50 };

			model.isSticky = false;
			expect( view._elementPlaceholder.style.height ).to.equal( '' );

			model.isSticky = true;
			expect( view._elementPlaceholder.style.height ).to.equal( '50px' );
		} );
	} );

	describe( 'init', () => {
		beforeEach( () => {
			model.limiterElement = limiterElement;
		} );

		it( 'calls init on parent class', () => {
			const spy = testUtils.sinon.spy( ToolbarView.prototype, 'init' );

			view.init();
			expect( spy.calledOnce ).to.be.true;
		} );

		it( 'puts the view._elementPlaceholder before view.element', () => {
			view.init();
			expect( element.previousSibling ).to.equal( view._elementPlaceholder );
		} );

		it( 'listens to window#scroll event and calls view._checkIfShouldBeSticky', () => {
			const spy = testUtils.sinon.spy( view, '_checkIfShouldBeSticky' );

			view.init();
			window.dispatchEvent( new Event( 'scroll' ) );

			expect( spy.calledOnce ).to.be.true;
		} );

		it( 'listens to model.isActive and calls view._checkIfShouldBeSticky', () => {
			const spy = testUtils.sinon.spy( view, '_checkIfShouldBeSticky' );
			expect( spy.notCalled ).to.be.true;

			view.init();
			model.isActive = true;
			expect( spy.calledOnce ).to.be.true;

			model.isActive = false;
			expect( spy.calledTwice ).to.be.true;
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
		beforeEach( () => {
			model.limiterElement = limiterElement;
		} );

		describe( 'model.isSticky', () => {
			beforeEach( () => {
				testUtils.sinon.stub( view.element, 'getBoundingClientRect' ).returns( {
					height: 20
				} );
			} );

			it( 'is true if beyond the top of the viewport (toolbar is active)', () => {
				testUtils.sinon.stub( model.limiterElement, 'getBoundingClientRect' ).returns( { top: -10, height: 100 } );
				model.isActive = true;

				expect( model.isSticky ).to.be.false;

				view._checkIfShouldBeSticky();
				expect( model.isSticky ).to.be.true;
			} );

			it( 'is false if beyond the top of the viewport (toolbar is inactive)', () => {
				testUtils.sinon.stub( model.limiterElement, 'getBoundingClientRect' ).returns( { top: -10, height: 100 } );
				model.isActive = false;

				expect( model.isSticky ).to.be.false;

				view._checkIfShouldBeSticky();
				expect( model.isSticky ).to.be.false;
			} );

			it( 'is false if in the viewport (toolbar is active)', () => {
				testUtils.sinon.stub( model.limiterElement, 'getBoundingClientRect' ).returns( { top: 10, height: 100 } );
				model.isActive = true;

				expect( model.isSticky ).to.be.false;

				view._checkIfShouldBeSticky();
				expect( model.isSticky ).to.be.false;
			} );

			it( 'is false if model.limiterElement is smaller than the toolbar and model.limiterOffset (toolbar is active)', () => {
				testUtils.sinon.stub( model.limiterElement, 'getBoundingClientRect' ).returns( { top: -10, height: 60 } );
				model.isActive = true;
				model.limiterOffset = 50;

				expect( model.isSticky ).to.be.false;

				view._checkIfShouldBeSticky();
				expect( model.isSticky ).to.be.false;
			} );
		} );

		describe( 'model._isStickyToTheLimiter', () => {
			it( 'is true if model.isSticky is true and reached the bottom edge of view.limiterElement', () => {
				testUtils.sinon.stub( model.limiterElement, 'getBoundingClientRect' ).returns( {
					top: -10,
					bottom: 10,
					height: 100
				} );

				testUtils.sinon.stub( view.element, 'getBoundingClientRect' ).returns( {
					height: 20
				} );

				model.isActive = true;

				expect( model.isSticky ).to.be.false;
				expect( model._isStickyToTheLimiter ).to.be.false;

				view._checkIfShouldBeSticky();
				expect( model.isSticky ).to.be.true;
				expect( model._isStickyToTheLimiter ).to.be.true;
			} );

			it( 'is false if model.isSticky is true and not reached the bottom edge of view.limiterElement', () => {
				testUtils.sinon.stub( model.limiterElement, 'getBoundingClientRect' ).returns( {
					top: -10,
					bottom: 90,
					height: 100
				} );

				testUtils.sinon.stub( view.element, 'getBoundingClientRect' ).returns( {
					height: 20
				} );

				model.isActive = true;

				expect( model.isSticky ).to.be.false;
				expect( model._isStickyToTheLimiter ).to.be.false;

				view._checkIfShouldBeSticky();
				expect( model.isSticky ).to.be.true;
				expect( model._isStickyToTheLimiter ).to.be.false;
			} );

			it( 'is false if model.isSticky is false', () => {
				testUtils.sinon.stub( model.limiterElement, 'getBoundingClientRect' ).returns( {
					top: 10,
				} );

				model.isActive = true;

				expect( model.isSticky ).to.be.false;
				expect( model._isStickyToTheLimiter ).to.be.false;

				view._checkIfShouldBeSticky();
				expect( model.isSticky ).to.be.false;
				expect( model._isStickyToTheLimiter ).to.be.false;
			} );
		} );

		describe( 'model._left', () => {
			it( 'is set if model.isSticky and model._isStickyToTheLimiter are true', () => {
				testUtils.sinon.stub( model.limiterElement, 'getBoundingClientRect' ).returns( {
					top: -10,
					bottom: 10,
					left: 60,
					height: 100
				} );

				testUtils.sinon.stub( view.element, 'getBoundingClientRect' ).returns( {
					height: 20
				} );

				testUtils.sinon.stub( document.body, 'getBoundingClientRect' ).returns( {
					left: 40
				} );

				model.isActive = true;

				expect( model.isSticky ).to.be.false;
				expect( model._isStickyToTheLimiter ).to.be.false;
				expect( model._left ).to.equal( null );

				view._checkIfShouldBeSticky();
				expect( model.isSticky ).to.be.true;
				expect( model._isStickyToTheLimiter ).to.be.true;
				expect( model._left ).to.equal( '20px' );
			} );

			it( 'is not set if model._isStickyToTheLimiter is false', () => {
				testUtils.sinon.stub( model.limiterElement, 'getBoundingClientRect' ).returns( {
					top: -10,
					bottom: 80,
					height: 100
				} );

				testUtils.sinon.stub( view.element, 'getBoundingClientRect' ).returns( {
					height: 20
				} );

				model.isActive = true;

				expect( model.isSticky ).to.be.false;
				expect( model._isStickyToTheLimiter ).to.be.false;
				expect( model._left ).to.equal( null );

				view._checkIfShouldBeSticky();
				expect( model.isSticky ).to.be.true;
				expect( model._isStickyToTheLimiter ).to.be.false;
				expect( model._left ).to.equal( null );
			} );

			it( 'is not set if model.isSticky is false', () => {
				testUtils.sinon.stub( model.limiterElement, 'getBoundingClientRect' ).returns( {
					top: 10,
				} );

				model.isActive = true;

				expect( model.isSticky ).to.be.false;
				expect( model._isStickyToTheLimiter ).to.be.false;
				expect( model._left ).to.equal( null );

				view._checkIfShouldBeSticky();
				expect( model.isSticky ).to.be.false;
				expect( model._isStickyToTheLimiter ).to.be.false;
				expect( model._left ).to.equal( null );
			} );
		} );

		describe( 'model._marginLeft', () => {
			it( 'is set if model.isSticky is true model._isStickyToTheLimiter is false', () => {
				testUtils.sinon.stub( model.limiterElement, 'getBoundingClientRect' ).returns( {
					top: -10,
					bottom: 80,
					height: 100
				} );

				testUtils.sinon.stub( view.element, 'getBoundingClientRect' ).returns( {
					height: 20
				} );

				window.scrollX = 10;

				model.isActive = true;

				expect( model.isSticky ).to.be.false;
				expect( model._isStickyToTheLimiter ).to.be.false;
				expect( model._marginLeft ).to.equal( null );

				view._checkIfShouldBeSticky();
				expect( model.isSticky ).to.be.true;
				expect( model._isStickyToTheLimiter ).to.be.false;
				expect( model._marginLeft ).to.equal( '-11px' );
			} );

			it( 'is not set if model._isStickyToTheLimiter is true', () => {
				testUtils.sinon.stub( model.limiterElement, 'getBoundingClientRect' ).returns( {
					top: -10,
					bottom: 10,
					left: 60,
					height: 100
				} );

				testUtils.sinon.stub( view.element, 'getBoundingClientRect' ).returns( {
					height: 20
				} );

				testUtils.sinon.stub( document.body, 'getBoundingClientRect' ).returns( {
					left: 40
				} );

				model.isActive = true;

				expect( model.isSticky ).to.be.false;
				expect( model._isStickyToTheLimiter ).to.be.false;
				expect( model._marginLeft ).to.equal( null );

				view._checkIfShouldBeSticky();
				expect( model.isSticky ).to.be.true;
				expect( model._isStickyToTheLimiter ).to.be.true;
				expect( model._marginLeft ).to.equal( null );
			} );

			it( 'is not set if model.isSticky is false', () => {
				testUtils.sinon.stub( model.limiterElement, 'getBoundingClientRect' ).returns( {
					top: 10,
				} );

				model.isActive = true;

				expect( model.isSticky ).to.be.false;
				expect( model._isStickyToTheLimiter ).to.be.false;
				expect( model._marginLeft ).to.equal( null );

				view._checkIfShouldBeSticky();
				expect( model.isSticky ).to.be.false;
				expect( model._isStickyToTheLimiter ).to.be.false;
				expect( model._marginLeft ).to.equal( null );
			} );
		} );
	} );
} );
