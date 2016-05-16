/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import Model from '/ckeditor5/ui/model.js';
import Dropdown from '/ckeditor5/ui/dropdown/dropdown.js';
import DropdownView from '/ckeditor5/ui/dropdown/dropdownview.js';

const model = new Model( {
	label: 'Show dropdown',
	isEnabled: true,
	isOn: false
} );

const view = new DropdownView( model );
const ctrl = new Dropdown( model, view );

ctrl.init();

document.body.appendChild( ctrl.view.element );

// view.regions.get( 'container' ).element.innerHTML = 'Container content';

// import IconManagerView from '/ckeditor5/ui/iconmanagerview.js';
// import IconView from '/ckeditor5/ui/icon/iconview.js';
// import iconManagerModel from '/theme/iconmanagermodel.js';
