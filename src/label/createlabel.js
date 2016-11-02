/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import LabelView from './labelview.js';

/**
 * Creates an instance of {@link ui.label.labelView} class using defined model.
 *
 * @param {ui.label.LabelModel} model Model of this label.
 * @param {utils.Locale} locale The {@link core.editor.Editor#locale editor's locale} instance.
 * @returns {ui.label.LabelView} The label view instance.
 */
export default function createLabel( model, locale ) {
	const labelView = new LabelView( locale );

	labelView.bind( 'text', 'for' ).to( model );

	return labelView;
}

/**
 * The basic label model interface.
 *
 * @interface ui.label.LabelModel
 */

/**
 * The text of the label.
 *
 * @observable
 * @member {String} ui.label.LabelModel#text
 */

/**
 * The `for` attribute of the label (i.e. to pair with an `<input>` element).
 *
 * @observable
 * @member {String} ui.label.LabelModel#for
 */
