/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* global document */
/* bender-tags: ui, balloonPanel, browser-only */

import BalloonPanelView from '/ckeditor5/ui/balloonpanel/balloonpanelview.js';

describe( 'BalloonPanelView', () => {
	let view;

	beforeEach( () => {
		view = new BalloonPanelView();

		view.model.set( {
			top: 0,
			left: 0,
			arrow: 'se',
			isVisible: false,
			maxWidth: 200
		} );

		view.init();
	} );

	describe( 'constructor', () => {
		it( 'should create element from template', () => {
			expect( view.element.tagName ).to.equal( 'DIV' );
			expect( view.element.classList.contains( 'ck-balloon-panel' ) ).to.true;
			expect( view.element.classList.contains( 'ck-link-balloon-panel' ) ).to.true;
			expect( view.element.getAttribute( 'tabindex' ) ).to.equal( '-1' );
		} );

		it( 'should register "content" region', () => {
			expect( view.regions.get( 0 ).name ).to.equal( 'content' );
			expect( view.regions.get( 0 ).element ).to.equal( view.element );
		} );
	} );

	describe( 'DOM bindings', () => {
		describe( 'arrow', () => {
			it( 'should react on view.model#arrow', () => {
				expect( view.element.classList.contains( 'ck-balloon-panel_arrow_se' ) ).to.true;

				view.model.set( 'arrow', 'sw' );

				expect( view.element.classList.contains( 'ck-balloon-panel_arrow_sw' ) ).to.true;
			} );
		} );

		describe( 'isVisible', () => {
			it( 'should react on view.model#isvisible', () => {
				expect( view.element.classList.contains( 'ck-balloon-panel_visible' ) ).to.false;

				view.model.isVisible = true;

				expect( view.element.classList.contains( 'ck-balloon-panel_visible' ) ).to.true;
			} );
		} );

		describe( 'styles', () => {
			it( 'should react on view.model#top', () => {
				expect( view.element.style.top ).to.equal( '0px' );

				view.model.top = 10;

				expect( view.element.style.top ).to.equal( '10px' );
			} );

			it( 'should react on view.model#left', () => {
				expect( view.element.style.left ).to.equal( '0px' );

				view.model.left = 10;

				expect( view.element.style.left ).to.equal( '10px' );
			} );

			it( 'should react on view.model#maxWidth', () => {
				expect( view.element.style.maxWidth ).to.equal( '200px' );

				view.model.maxWidth = 10;

				expect( view.element.style.maxWidth ).to.equal( '10px' );
			} );
		} );
	} );

	describe( 'isVisible', () => {
		it( 'should return view.model#isVisible value', () => {
			expect( view.isVisible ).to.false;

			view.model.isVisible = true;

			expect( view.isVisible ).to.true;
		} );
	} );

	describe( 'show', () => {
		it( 'should set view.model#isVisible as true', () => {
			view.model.isVisible = false;

			view.show();

			expect( view.isVisible ).to.true;
		} );
	} );

	describe( 'hide', () => {
		it( 'should set view.model#isVisible as false', () => {
			view.model.isVisible = true;

			view.hide();

			expect( view.isVisible ).to.false;
		} );
	} );

	describe( 'attachTo', () => {
		const limiter = { left: 0, top: 0, right: 300, bottom: 300 };
		let targetEl;

		beforeEach( () => {
			// Create and append target element.
			targetEl = document.createElement( 'div' );
			targetEl.style.cssText = 'position: absolute; width: 50px; height: 50px;';
			document.body.appendChild( targetEl );

			// Make sure that viewport has min dimensions.
			document.body.style.minHeight = '350px';
			document.body.style.minWidth = '350px';

			// Set dimensions to balloon panel element and append it to the document.
			view.element.style.width = '150px';
			view.element.style.height = '100px';
			document.body.appendChild( view.element );
		} );

		afterEach( () => {
			document.body.removeChild( targetEl );

			document.body.style.minHeight = null;
			document.body.style.minWidth = null;

			document.body.removeChild( view.element );
		} );

		it( 'should put balloon on on the `south east` side of the target element', () => {
			targetEl.style.top = 0;
			targetEl.style.left = 0;

			view.attachTo( targetEl, limiter );

			expect( view.model.arrow ).to.equal( 'se' );
		} );

		it( 'should put balloon on on the `south west` side of the target element', () => {
			targetEl.style.top = 0;
			targetEl.style.left = '250px';

			view.attachTo( targetEl, limiter );

			expect( view.model.arrow ).to.equal( 'sw' );
		} );

		it( 'should put balloon on on the `north east` side of the target element', () => {
			targetEl.style.top = '250px';
			targetEl.style.left = 0;

			view.attachTo( targetEl, limiter );

			expect( view.model.arrow ).to.equal( 'ne' );
		} );

		it( 'should put balloon on on the `north west` side of the target element', () => {
			targetEl.style.top = '250px';
			targetEl.style.left = '250px';

			view.attachTo( targetEl, limiter );

			expect( view.model.arrow ).to.equal( 'nw' );
		} );
	} );
} );
