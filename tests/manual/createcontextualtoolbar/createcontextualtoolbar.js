/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* globals window, document, console:false */

import ClassicEditor from 'ckeditor5/editor-classic/classic.js';
import ClickObserver from 'ckeditor5/engine/view/observer/clickobserver.js';
import Enter from 'ckeditor5/enter/enter.js';
import Typing from 'ckeditor5/typing/typing.js';
import Paragraph from 'ckeditor5/paragraph/paragraph.js';
import Undo from 'ckeditor5/undo/undo.js';
import Bold from 'ckeditor5/basic-styles/bold.js';
import Italic from 'ckeditor5/basic-styles/italic.js';

import Template from 'ckeditor5/ui/template.js';
import ToolbarView from 'ckeditor5/ui/toolbar/toolbarview.js';
import BalloonPanelView from 'ckeditor5/ui/balloonpanel/balloonpanelview.js';

const positions = {
	//	     [ Target ]
	//	         ^
	//	+-----------------+
	//	|     Balloon     |
	//	+-----------------+
	s: ( targetRect, balloonRect ) => ( {
		top: targetRect.bottom + 15,
		left: targetRect.left + targetRect.width / 2 - balloonRect.width / 2,
		name: 's'
	} ),

	//	+-----------------+
	//	|     Balloon     |
	//	+-----------------+
	//	        V
	//	    [ Target ]
	n: ( targetRect, balloonRect ) => ( {
		top: targetRect.top - balloonRect.height - 15,
		left: targetRect.left + targetRect.width / 2 - balloonRect.width / 2,
		name: 'n'
	} ),

	//	     [ Target ]
	//	              ^
	//	     +-----------------+
	//	     |     Balloon     |
	//	     +-----------------+
	forwardSelection: ( targetRect, balloonRect ) => ( {
		top: targetRect.bottom + 15,
		left: targetRect.right - balloonRect.width / 2,
		name: 's'
	} ),

	//	+-----------------+
	//	|     Balloon     |
	//	+-----------------+
	//	        V
	//	        [ Target ]
	backwardSelection: ( targetRect, balloonRect ) => ( {
		top: targetRect.top - balloonRect.height - 15,
		left: targetRect.left - balloonRect.width / 2,
		name: 'n'
	} )
};

ClassicEditor.create( document.querySelector( '#editor' ), {
	plugins: [ Enter, Typing, Paragraph, Undo, Bold, Italic ],
	toolbar: [ 'bold', 'italic', 'undo', 'redo' ]
} )
.then( editor => {
	const viewDocument = editor.editing.view;
	const toolbarView = new ToolbarView();
	const balloonPanelView = new BalloonPanelView( editor.locale );

	Template.extend( balloonPanelView.template, {
		attributes: {
			class: [
				'ck-toolbar_contextual',
			]
		}
	} );

	balloonPanelView.content.add( toolbarView );
	viewDocument.addObserver( ClickObserver );

	editor.ui.view.body.add( balloonPanelView ).then( () => {
		for ( let name of editor.config.get( 'toolbar' ) ) {
			toolbarView.items.add( editor.ui.componentFactory.create( name ) );
		}

		editor.listenTo( viewDocument, 'click', () => {
			if ( !viewDocument.selection.isCollapsed ) {
				balloonPanelView.attachTo( {
					target: viewDocument.domConverter.viewRangeToDom( viewDocument.selection.getFirstRange() ),
					positions: [ positions[ viewDocument.selection.isBackward ? 'backwardSelection' : 'forwardSelection' ] ]
				} );
			} else {
				balloonPanelView.hide();
			}
		} );
	} );

	window.editor = editor;
} )
.catch( err => {
	console.error( err.stack );
} );
