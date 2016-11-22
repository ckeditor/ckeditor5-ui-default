/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import testUtils from '/tests/ui/_utils/utils.js';
import StickyToolbarView from '/ckeditor5/ui/toolbar/sticky/stickytoolbarview.js';

testUtils.createTestUIView( {
	top: '.ck-editor__top'
} ).then( ui => {
	createToolbar( ui.top );
} );

function createToolbar( collection ) {
	const toolbar = new StickyToolbarView();

	toolbar.limiterElement = collection._parentElement.parentNode;

	collection.add( toolbar ).then( () => {
		toolbar.isActive = true;
	} );
}
