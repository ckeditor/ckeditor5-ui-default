/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import CoreToolbar from '../../core/ui/toolbar/toolbar.js';

/**
 * The editor toolbar controller class.
 *
 * @class ui-default.toolbar.Toolbar
 * @extends core.ui.toolbar.Toolbar
 */

export default class Toolbar extends CoreToolbar {
	/**
	 * Creates a new toolbar instance.
	 *
	 * @method constructor
	 */
	constructor( editor, model, view ) {
		super( model, view );

		this.editor = editor;
	}

	addButtons( buttons ) {
		for ( let button of buttons ) {
			this.collections.get( 'buttons' ).add( this.editor.ui.featureComponents.create( button ) );
		}
	}
}
