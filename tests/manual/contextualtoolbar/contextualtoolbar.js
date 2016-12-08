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

const arrowVOffset = BalloonPanelView.arrowVerticalOffset;
const positions = {
	//     [text range]
	//                ^
	//       +-----------------+
	//       |     Balloon     |
	//       +-----------------+
	forwardSelection: ( targetRect, balloonRect ) => ( {
		top: targetRect.bottom + arrowVOffset,
		left: targetRect.right - balloonRect.width / 2,
		name: 's'
	} ),

	//	+-----------------+
	//	|     Balloon     |
	//	+-----------------+
	//	        V
	//	        [text range]
	backwardSelection: ( targetRect, balloonRect ) => ( {
		top: targetRect.top - balloonRect.height - arrowVOffset,
		left: targetRect.left - balloonRect.width / 2,
		name: 'n'
	} )
};

ClassicEditor.create( document.querySelector( '#editor' ), {
	plugins: [ Enter, Typing, Paragraph, Undo, Bold, Italic ],
	toolbar: [ 'bold', 'italic', 'undo', 'redo' ]
} )
.then( editor => {
	createContextualToolbar( editor );
	window.editor = editor;
} )
.catch( err => {
	console.error( err.stack );
} );

function createContextualToolbar( editor ) {
	// Create a plain toolbar instance.
	const toolbar = new ToolbarView();

	// Create a BalloonPanelView instance.
	const panel = new BalloonPanelView( editor.locale );

	Template.extend( panel.template, {
		attributes: {
			class: [
				'ck-toolbar_contextual',
			]
		}
	} );

	// Putting the toolbar inside of the balloon panel.
	panel.content.add( toolbar );

	editor.ui.view.body.add( panel ).then( () => {
		const editingView = editor.editing.view;

		// Fill the toolbar with some buttons. Simply copy default editor toolbar.
		for ( let name of editor.config.get( 'toolbar' ) ) {
			toolbar.items.add( editor.ui.componentFactory.create( name ) );
		}

		// Let the focusTracker know about new focusable UI element.
		editor.ui.focusTracker.add( panel.element );

		// Hide the panel when editor loses focus but no the other way around.
		panel.listenTo( editor.ui.focusTracker, 'change:isFocused', ( evt, name, is, was ) => {
			if ( was && !is ) {
				panel.hide();
			}
		} );

		editingView.addObserver( ClickObserver );

		// Position the panel each time the user clicked in editable.
		editor.listenTo( editingView, 'click', () => {
			// This implementation assumes that only non–collapsed selections gets the contextual toolbar.
			if ( !editingView.selection.isCollapsed ) {
				const isBackward = editingView.selection.isBackward;

				// getBoundingClientRect() makes no sense when the selection spans across number
				// of lines of text. Using getClientRects() allows us to browse micro–ranges
				// that would normally make up the bounding client rect.
				const rangeRects = editingView.domConverter.viewRangeToDom( editingView.selection.getFirstRange() ).getClientRects();

				// Select the proper range rect depending on the direction of the selection.
				const rangeRect = isBackward ? rangeRects.item( 0 ) : rangeRects.item( rangeRects.length - 1 );

				panel.attachTo( {
					target: rangeRect,
					positions: [
						positions[ isBackward ? 'backwardSelection' : 'forwardSelection' ]
					]
				} );
			} else {
				panel.hide();
			}
		} );
	} );
}
