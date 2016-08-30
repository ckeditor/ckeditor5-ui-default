/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, balloonPanel */

import BalloonPanel from '/ckeditor5/ui/balloonpanel/balloonpanel.js';
import BalloonPanelView from '/ckeditor5/ui/balloonpanel/balloonpanelview.js';
import Model from '/ckeditor5/ui/model.js';

describe( 'BalloonPanel', () => {
	let model, balloonPanel, view;

	beforeEach( () => {
		model = new Model( {
			maxWidth: 200
		} );

		view = new BalloonPanelView();
		balloonPanel = new BalloonPanel( model, view );

		return balloonPanel.init();
	} );

	describe( 'constructor', () => {
		it( 'should binds view#model attributes to the BalloonPanel#model', () => {
			expect( view.model.maxWidth ).to.equal( model.maxWidth ).to.equal( 200 );
		} );

		it( 'should delegates view#hide model', () => {
			const spy = sinon.spy();

			model.on( 'hide', spy );

			view.model.fire( 'hide' );

			expect( spy.calledOnce ).to.be.true;
		} );

		it( 'should set default values to view#model', () => {
			expect( view.model.top ).to.equal( 0 );
			expect( view.model.left ).to.equal( 0 );
			expect( view.model.arrow ).to.equal( 'se' );
			expect( view.model.isVisible ).to.equal( false );
		} );

		it( 'should create empty content collection', () => {
			expect( balloonPanel.collections.get( 'content' ) ).to.have.length( 0 );
		} );
	} );
} );
