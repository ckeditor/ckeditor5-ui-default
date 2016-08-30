/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import View from '../view.js';
import Template from '../template.js';

/**
 * The box view class.
 *
 * See {@link ui.box.Box}.
 *
 * @memberOf ui.box
 * @extends ui.View
 */
export default class BoxView extends View {
	/**
	 * @inheritDoc
	 */
	constructor( locale ) {
		super( locale );

		const bind = this.bind;

		this.template = new Template( {
			tag: 'div',
			attributes: {
				class: [
					'ck-box',
					bind.if( 'alignRight', 'ck-box_align_right' )
				]
			}
		} );

		this.register( 'content', el => el );

		/**
		 * Model of this box view.
		 *
		 * @member {ui.box.BoxViewModel} ui.box.boxView#model
		 */
	}
}

/**
 * The box view {@link ui.Model} interface.
 *
 * @interface ui.box.BoxViewModel
 */

/**
 * (Optional) When `true` then children will be aligned to the right. When `false` then alignment will be inherited.
 *
 * @observable
 * @member {String} ui.box.BoxViewModel#alignRight
 */
