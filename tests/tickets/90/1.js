/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* globals console:false, document, window */

import ClassicEditor from '/ckeditor5/editor-classic/classic.js';
import Model from '/ckeditor5/ui/model.js';
import BalloonPanel from '/ckeditor5/ui/balloonpanel/balloonpanel.js';
import BalloonPanelView from '/ckeditor5/ui/balloonpanel/balloonpanelview.js';

ClassicEditor.create( document.querySelector( '#editor' ), {
	features: [ 'enter', 'typing', 'heading' ],
	toolbar: [ 'headings' ]
} )
.then( editor => {
	window.editor = editor;

	const document = editor.editing.view;
	const selection = document.selection;
	const domEditableElement = document.domConverter.getCorrespondingDomElement( document.selection.editableElement );
	const balloonPanel = new BalloonPanel( new Model(), new BalloonPanelView() );

	editor.ui.add( 'body', balloonPanel );

	document.on( 'render', () => {
		if ( selection.isCollapsed ) {
			balloonPanel.view.attachTo(
				document.domConverter.viewRangeToDom( document.selection.getFirstRange() ),
				domEditableElement
			);
		} else {
			balloonPanel.view.hide();
		}
	} );
} )
.catch( err => {
	console.error( err.stack );
} );
