
//   mason_viewer_55_configDisplayOptionDefaults.js

//   Mason Viewer

//   defaults for Display options used in rendering the viewer on the page.


//   These values are merged using $.extend with the values passed in to the function call
//        MasonViewer.createMasonViewer( ... ) in the parameter 'configParams' which is the 3rd parameter.


//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";

	/////////////////////////////////////////////////

	///    Configuration Defaults

	MasonViewerPerInstanceRenderOnPage.prototype.configDisplayOptionDefaults = {

		TOP_ROW_OFFSET_FROM_TOP_OF_IMAGE : 2,

		LABEL_FONT_SIZE : 12,
		
		ROW_HEIGHT : 15, //  Adjust the ROW_HEIGHT to accommodate the height of the label

		BLOCK_HEIGHT : 14,  //  Adjust the BLOCK_HEIGHT to accommodate the height of the label


		LABEL_WIDTH : 100,  //  Adjust the LABEL_WIDTH to accommodate the width of the longest label

		ICON_EXPAND_ROW_STARTING_POSITION : 1,
		ICON_EXPAND_ROW_WIDTH : 15,

		ICON_EXPAND_ROW_SPACE_AFTER : 2,

		ROW_TOTALS_BAR_RIGHT_MAX_WIDTH : 30,

		ROW_TOTAL_BLOCK_MINIMUM_SIZE : 1,

		ROW_TOTALS_BAR_RIGHT_SPACE_FROM_MAIN_GRID : 10,

		ROW_TOTALS_BAR_RIGHT_SPACE_FROM_RIGHT_EDGE : 4,


		BORDER_COLOR : "black",

		BORDER_WIDTH : 1,

		FOOTER_HEIGHT : 2,



		//  Tool tip text


		CLICK_TO_CONTRACT_TO_HIDE_INDIVIDUAL_BLOCKS_TOOLTIP_TEXT_PREFIX : "Click to hide individual ",

		CLICK_TO_EXPAND_TO_SHOW_INDIVIDUAL_BLOCKS_TOOLTIP_TEXT_PREFIX : "Click to show individual ",


		blockTypeLabelPlural : "blocks",

		BLOCK_HIGHLIGHT_BORDER_COLOR : "pink",
		BLOCK_HIGHLIGHT_BORDER_WIDTH : 2,


		createCombinedLineOnly : undefined,  //  set to true to only create combined line

		skipCreateCombinedLine : undefined,  //  set to true to skip create combined line

		combinedLineLabel : "Combined",  //  label on left for combined line

		combinedLineTooltipHTML : undefined,  //  tool tip for label on left for combined line

		ALIGNMENT_LINE_COLOR : "black",
		ALIGNMENT_LINE_WIDTH : 2

	};
