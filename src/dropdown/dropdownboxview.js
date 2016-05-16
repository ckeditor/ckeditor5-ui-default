/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import View from '../view.js';

/**
 * The basic dropdown box view class.
 *
 * @memberOf ui.dropdown
 * @extends ui.View
 */

export default class DropdownBoxView extends View {
	constructor( model ) {
		super( model );

		const bind = this.attributeBinder;

		this.template = {
			tag: 'div',

			attributes: {
				class: [
					'ck-reset',
					'ck-dropdown__box',
					bind.if( 'isOn', 'ck-dropdown__box-active' )
				]
			},

			children: [
				'Dropdown box content'
			],
		};
	}

	setPosition( relativeElement ) {
		const relRect = relativeElement.getBoundingClientRect();
		const bodyRect = this.element.ownerDocument.body.getBoundingClientRect();

		Object.assign( this.element.style, {
			left: relRect.left - bodyRect.left + 'px',
			top: relRect.bottom - bodyRect.top + 'px',
		} );
	}
}
