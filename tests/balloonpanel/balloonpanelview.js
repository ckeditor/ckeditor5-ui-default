/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* global document, Event */
/* bender-tags: ui, balloonPanel, browser-only */

import BalloonPanel from '/ckeditor5/ui/balloonpanel/balloonpanel.js';
import BalloonPanelView from '/ckeditor5/ui/balloonpanel/balloonpanelview.js';
import Model from '/ckeditor5/ui/model.js';

describe( 'BalloonPanelView', () => {
	let model, view;

	beforeEach( () => {
		model = new Model( {
			maxWidth: 200
		} );

		view = new BalloonPanelView();

		return new BalloonPanel( model, view ).init();
	} );

	describe( 'constructor', () => {
		it( 'should creates element from template', () => {
			expect( view.element.tagName ).to.equal( 'DIV' );
			expect( view.element.classList.contains( 'ck-balloon-panel' ) ).to.true;
			expect( view.element.classList.contains( 'ck-link-balloon-panel' ) ).to.true;
		} );

		it( 'should registers "content" region', () => {
			expect( view.regions.get( 0 ).name ).to.equal( 'content' );
			expect( view.regions.get( 0 ).element ).to.equal( view.element );
		} );
	} );

	describe( 'keyboard support', () => {
		it( 'should handle `keydown` event only when balloon is open', () => {
			const escPressSpy = sinon.spy( view, '_closeOnEscPress' );

			view.model.isVisible = true;

			document.dispatchEvent( new Event( 'keydown' ) );

			expect( escPressSpy.calledOnce ).to.true;

			view.model.isVisible = false;

			document.dispatchEvent( new Event( 'keydown' ) );

			// Still called only once.
			expect( escPressSpy.calledOnce ).to.true;
		} );

		it( 'should hide balloon on `Esc` press', () => {
			const hideSpy = sinon.spy( view, 'hide' );
			const fakeEventInfo = {};
			const fakeKeydownEvent = { keyCode: 27 };

			view._closeOnEscPress( fakeEventInfo, fakeKeydownEvent );

			view.model.isVisible = false;

			expect( hideSpy.calledOnce ).to.true;
		} );
	} );

	describe( 'DOM bindings', () => {
		describe( 'arrow', () => {
			it( 'should reacts on view.model#arrow', () => {
				expect( view.element.classList.contains( 'ck-balloon-panel_arrow_se' ) ).to.true;

				view.model.set( 'arrow', 'sw' );

				expect( view.element.classList.contains( 'ck-balloon-panel_arrow_sw' ) ).to.true;
			} );
		} );

		describe( 'isVisible', () => {
			it( 'should reacts on view.model#isvisible', () => {
				expect( view.element.classList.contains( 'ck-balloon-panel_visible' ) ).to.false;

				view.model.isVisible = true;

				expect( view.element.classList.contains( 'ck-balloon-panel_visible' ) ).to.true;
			} );
		} );

		describe( 'styles', () => {
			it( 'should reacts on view.model#top', () => {
				expect( view.element.style.top ).to.equal( '0px' );

				view.model.top = 10;

				expect( view.element.style.top ).to.equal( '10px' );
			} );

			it( 'should reacts on view.model#left', () => {
				expect( view.element.style.left ).to.equal( '0px' );

				view.model.left = 10;

				expect( view.element.style.left ).to.equal( '10px' );
			} );

			it( 'should reacts on view.model#maxWidth', () => {
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

		it( 'should set view.model#isVisible as false', () => {
			it( 'should fires view.model#hide event', () => {
				const hideSpy = sinon.spy();

				view.model.on( 'hide', hideSpy );

				view.hide();

				expect( hideSpy.calledOnce ).to.true;
			} );
		} );
	} );

	describe( 'attachTo', () => {
		const targetEl = document.createElement( 'div' );
		targetEl.style.cssText = 'position: absolute; width: 50px; height: 50px;';

		const limiter = { left: 0, top: 0, right: 300, bottom: 300 };

		before( () => {
			document.body.appendChild( targetEl );

			document.body.style.minHeight = '350px';
			document.body.style.minWidth = '350px';
		} );

		after( () => {
			document.body.removeChild( targetEl );

			document.body.style.minHeight = null;
			document.body.style.minWidth = null;
		} );

		beforeEach( () => {
			// Add some appearance to balloon panel element and append to document.
			view.element.style.width = '150px';
			view.element.style.height = '100px';
			view.element.style.position = 'absolute';
			document.body.appendChild( view.element );
		} );

		afterEach( () => {
			document.body.removeChild( view.element );
		} );

		it( 'should put balloon on on the `south east` side of the target element', () => {
			targetEl.style.top = 0;
			targetEl.style.left = 0;

			document.body.appendChild( targetEl );

			view.attachTo( targetEl, limiter );

			expect( view.model.arrow ).to.equal( 'se' );
		} );

		it( 'should put balloon on on the `south west` side of the target element', () => {
			targetEl.style.top = 0;
			targetEl.style.left = '250px';

			document.body.appendChild( targetEl );

			view.attachTo( targetEl, limiter );

			expect( view.model.arrow ).to.equal( 'sw' );
		} );

		it( 'should put balloon on on the `north east` side of the target element', () => {
			targetEl.style.top = '250px';
			targetEl.style.left = 0;

			document.body.appendChild( targetEl );

			view.attachTo( targetEl, limiter );

			expect( view.model.arrow ).to.equal( 'ne' );
		} );

		it( 'should put balloon on on the `north west` side of the target element', () => {
			targetEl.style.top = '250px';
			targetEl.style.left = '250px';

			document.body.appendChild( targetEl );

			view.attachTo( targetEl, limiter );

			expect( view.model.arrow ).to.equal( 'nw' );
		} );
	} );
} );
