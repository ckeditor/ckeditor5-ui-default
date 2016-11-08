/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* global document, window */
/* bender-tags: ui, balloonPanel, browser-only */

import ViewCollection from 'ckeditor5/ui/viewcollection.js';
import BalloonPanelView from 'ckeditor5/ui/balloonpanel/balloonpanelview.js';
import ButtonView from 'ckeditor5/ui/button/buttonview.js';
import testUtils from 'tests/core/_utils/utils.js';

testUtils.createSinonSandbox();

describe( 'BalloonPanelView', () => {
	let view;

	beforeEach( () => {
		view = new BalloonPanelView();

		view.set( 'maxWidth', 200 );

		return view.init();
	} );

	describe( 'constructor()', () => {
		it( 'should create element from template', () => {
			expect( view.element.tagName ).to.equal( 'DIV' );
			expect( view.element.classList.contains( 'ck-balloon-panel' ) ).to.true;
			expect( view.element.getAttribute( 'tabindex' ) ).to.equal( '-1' );
		} );

		it( 'should set default values', () => {
			expect( view.top ).to.equal( 0 );
			expect( view.left ).to.equal( 0 );
			expect( view.arrow ).to.equal( 'se' );
			expect( view.isVisible ).to.equal( false );
		} );

		it( 'creates view#content collection', () => {
			expect( view.content ).to.be.instanceOf( ViewCollection );
		} );
	} );

	describe( 'DOM bindings', () => {
		describe( 'arrow', () => {
			it( 'should react on view#arrow', () => {
				expect( view.element.classList.contains( 'ck-balloon-panel_arrow_se' ) ).to.true;

				view.set( 'arrow', 'sw' );

				expect( view.element.classList.contains( 'ck-balloon-panel_arrow_sw' ) ).to.true;
			} );
		} );

		describe( 'isVisible', () => {
			it( 'should react on view#isvisible', () => {
				expect( view.element.classList.contains( 'ck-balloon-panel_visible' ) ).to.false;

				view.isVisible = true;

				expect( view.element.classList.contains( 'ck-balloon-panel_visible' ) ).to.true;
			} );
		} );

		describe( 'styles', () => {
			it( 'should react on view#top', () => {
				expect( view.element.style.top ).to.equal( '0px' );

				view.top = 10;

				expect( view.element.style.top ).to.equal( '10px' );
			} );

			it( 'should react on view#left', () => {
				expect( view.element.style.left ).to.equal( '0px' );

				view.left = 10;

				expect( view.element.style.left ).to.equal( '10px' );
			} );

			it( 'should react on view#maxWidth', () => {
				expect( view.element.style.maxWidth ).to.equal( '200px' );

				view.maxWidth = 10;

				expect( view.element.style.maxWidth ).to.equal( '10px' );
			} );
		} );

		describe( 'children', () => {
			it( 'should react on view#content', () => {
				expect( view.element.childNodes.length ).to.equal( 0 );

				const button = new ButtonView( { t() {} } );
				view.content.add( button );

				expect( view.element.childNodes.length ).to.equal( 1 );
			} );
		} );
	} );

	describe( 'isVisible', () => {
		it( 'should return view#isVisible value', () => {
			expect( view.isVisible ).to.false;

			view.isVisible = true;

			expect( view.isVisible ).to.true;
		} );
	} );

	describe( 'show', () => {
		it( 'should set view#isVisible as true', () => {
			view.isVisible = false;

			view.show();

			expect( view.isVisible ).to.true;
		} );
	} );

	describe( 'hide', () => {
		it( 'should set view#isVisible as false', () => {
			view.isVisible = true;

			view.hide();

			expect( view.isVisible ).to.false;
		} );
	} );

	describe( 'attachTo', () => {
		let targetEl, limiterEl;

		beforeEach( () => {
			limiterEl = document.createElement( 'div' );
			targetEl = document.createElement( 'div' );

			// Mock balloon panel element dimensions.
			mockBoundingBox( view.element, {
				top: 0,
				left: 0,
				width: 100,
				height: 100
			} );

			// Make sure that limiterEl is fully visible in viewport.
			testUtils.sinon.stub( window, 'innerWidth', 500 );
			testUtils.sinon.stub( window, 'innerHeight', 500 );
		} );

		describe( 'limited by limiter element', () => {
			beforeEach( () => {
				// Mock limiter element dimensions.
				mockBoundingBox( limiterEl, {
					left: 0,
					top: 0,
					width: 500,
					height: 500
				} );
			} );

			it( 'should put balloon on the `south east` side of the target element at default', () => {
				// Place target element at the center of the limiterEl.
				mockBoundingBox( targetEl, {
					top: 225,
					left: 225,
					width: 50,
					height: 50
				} );

				view.attachTo( targetEl, limiterEl );

				expect( view.arrow ).to.equal( 'se' );
			} );

			it( 'should put balloon on the `south east` side of the target element when target is on the top left side of the limiterEl', () => {
				// Place target element at the center of the limiterEl.
				mockBoundingBox( targetEl, {
					top: 0,
					left: 0,
					width: 50,
					height: 50
				} );

				view.attachTo( targetEl, limiterEl );

				expect( view.arrow ).to.equal( 'se' );
			} );

			it( 'should put balloon on the `south west` side of the target element when target is on the right side of the limiterEl', () => {
				mockBoundingBox( targetEl, {
					top: 0,
					left: 450,
					width: 50,
					height: 50
				} );

				view.attachTo( targetEl, limiterEl );

				expect( view.arrow ).to.equal( 'sw' );
			} );

			it( 'should put balloon on the `north east` side of the target element when target is on the bottom of the limiterEl ', () => {
				mockBoundingBox( targetEl, {
					top: 450,
					left: 0,
					width: 50,
					height: 50
				} );

				view.attachTo( targetEl, limiterEl );

				expect( view.arrow ).to.equal( 'ne' );
			} );

			it( 'should put balloon on the `north west` side of the target element when target is on the bottom right of the limiterEl', () => {
				mockBoundingBox( targetEl, {
					top: 450,
					left: 450,
					width: 50,
					height: 50
				} );

				view.attachTo( targetEl, limiterEl );

				expect( view.arrow ).to.equal( 'nw' );
			} );
		} );

		describe( 'limited by viewport', () => {
			it( 'should put balloon on the `south west` position when `south east` is limited', () => {
				mockBoundingBox( limiterEl, {
					left: 0,
					top: 0,
					width: 500,
					height: 500
				} );

				mockBoundingBox( targetEl, {
					top: 0,
					left: 225,
					width: 50,
					height: 50
				} );

				testUtils.sinon.stub( window, 'innerWidth', 275 );

				view.attachTo( targetEl, limiterEl );

				expect( view.arrow ).to.equal( 'sw' );
			} );

			it( 'should put balloon on the `south east` position when `south west` is limited', () => {
				mockBoundingBox( limiterEl, {
					left: -400,
					top: 0,
					width: 500,
					height: 500
				} );

				mockBoundingBox( targetEl, {
					top: 0,
					left: 0,
					width: 50,
					height: 50
				} );

				testUtils.sinon.stub( window, 'scrollX', 400 );

				view.attachTo( targetEl, limiterEl );

				expect( view.arrow ).to.equal( 'se' );
			} );

			it( 'should put balloon on the `north east` position when `south east` is limited', () => {
				mockBoundingBox( limiterEl, {
					left: 0,
					top: 0,
					width: 500,
					height: 500
				} );

				mockBoundingBox( targetEl, {
					top: 225,
					left: 0,
					width: 50,
					height: 50
				} );

				testUtils.sinon.stub( window, 'innerHeight', 275 );

				view.attachTo( targetEl, limiterEl );

				expect( view.arrow ).to.equal( 'ne' );
			} );

			it( 'should put balloon on the `south east` position when `north east` is limited', () => {
				mockBoundingBox( limiterEl, {
					left: 0,
					top: -400,
					width: 500,
					height: 500
				} );

				mockBoundingBox( targetEl, {
					top: 0,
					left: 0,
					width: 50,
					height: 50
				} );

				testUtils.sinon.stub( window, 'scrollY', 400 );

				view.attachTo( targetEl, limiterEl );

				expect( view.arrow ).to.equal( 'se' );
			} );
		} );
	} );
} );

function mockBoundingBox( element, data ) {
	const boundingBox = Object.assign( {}, data );

	boundingBox.right = boundingBox.left + boundingBox.width;
	boundingBox.bottom = boundingBox.top + boundingBox.height;

	testUtils.sinon.stub( element, 'getBoundingClientRect' ).returns( boundingBox );
}
