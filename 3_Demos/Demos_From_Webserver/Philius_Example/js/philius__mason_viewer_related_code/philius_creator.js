
//   creator_philius.js


//   This is the code that initiates

//   the creation of the Mason Viewer

//   for the Philius viewer on the page


//   Depends on jquery, Modernizr SVG support detection



//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";



 //  constructor
var Create_MasonViewer_Philius = function( params ) {


	this.coverageMapCreated = false; //

	this.proteinCoverageViewers = undefined;

	this.loadingSpinner = undefined;


	this.config = params.config;


	this.$masonViewerRootDiv = this.config.$masonViewerRootDiv;

	this.serviceURLs = {
			base : "http://yeastrc.org/philius/services/",
			submitSequence : "submitSequence/",
			isJobDone : "isJobDone/json/", //  append job token to end
			getPhiliusResults : "getPhiliusResults/json/", //  append job token to end 

			suffixForTypeJSONorJSONP : "jsonp",

			addition_jsonpCallback : "?jsonpCallback=?"   // append to end of total URL for JSONP

			,
			
			//   Requires "/" at the end
			pathToProteinSequence : "Philius_files/"
	};


	
};

//  4 minutes max wait time for Philius job to complete

Create_MasonViewer_Philius.prototype.TOTAL_ALLOWED_WAIT_FOR_PHILIUS_JOB_TO_COMPLETE_TIME = 4 * 60 * 1000;  



Create_MasonViewer_Philius.prototype.VIEWER_ROW_LABEL = "TM and SP";  


Create_MasonViewer_Philius.prototype.PHILIUS_TYPE_CONSTANTS = {
		
			 SP : 0,				// signal peptide segment
			 NON_CYTOPLASMIC : 1,	// non-cytoplastmic segment
			 CYTOPLASMIC : 2,		// cytoplasmic segment
			 TM_HELIX : 3			// transmembrane helix
	};
	
Create_MasonViewer_Philius.prototype.PHILIUS_TYPE_STRINGS = [
		
		"Signal Peptide",
		"Non-Cytoplasmic",
		"Cytoplasmic",
		"Transmembrane Helix"
	];	
	


/////////////

Create_MasonViewer_Philius.prototype.isCoverageMapCreated = function(  ) {

	return this.coverageMapCreated;
};


/////////////

Create_MasonViewer_Philius.prototype.setCoverageMapCreated = function( param ) {

	this.coverageMapCreated = param;
};



Create_MasonViewer_Philius.prototype.createCoverageMapIfNotCreated = function(  ) {

	if ( ! this.isCoverageMapCreated() ) {

		this.createCoverageMap();
	}


};



//////////////////////////////

//

Create_MasonViewer_Philius.prototype.createCoverageMap = function(  ) {

	var objectThis = this;

	var svgSupport = Modernizr.svg;

	if ( ! svgSupport ) {  //  is false if SVG not supported


		var $svgNotSupported = this.config.$svgNotSupportedDiv;

		$svgNotSupported.show();
		
//		this.$root_block.hide();


		return null;
	}

	var loadMatchingProteinSequenceParams = {
			

			folderName: this.serviceURLs.pathToProteinSequence,
			
			callbackFcn: function( callbackFcnParam ) {
				
				objectThis.createCoverageMapMain( callbackFcnParam );
			}
	};
	
	loadMatchingProteinSequence( loadMatchingProteinSequenceParams );
	
//	this.createCoverageMapMain(  );


	
//	//  Update button
//
//	this.$root_block.find(".protein-coverage-update-coverage-viewer-button-jq").click(function( event, ui ) {
//
//		objectThis.createCoverageMapMain(  );
//	});
//
//	//  Reset button
//
//	this.$root_block.find(".protein-coverage-reset-form-button-jq").click(function( event, ui ) {
//
//		
//		var $qvalueCutoffReset = objectThis.$root_block.find(".protein-coverage-q-value-cutoff-reset-jq");
//		var $uniquePeptidesReset = objectThis.$root_block.find(".protein-coverage-unique-peptides-reset-jq");
//		var $minPSMcountReset = objectThis.$root_block.find(".protein-coverage-min-psm-count-reset-jq");
//
//		var $qvalueCutoff = objectThis.$root_block.find(".protein-coverage-q-value-cutoff-jq");
//		var $uniquePeptides = objectThis.$root_block.find(".protein-coverage-unique-peptides-jq");
//		var $minPSMcount = objectThis.$root_block.find(".protein-coverage-min-psm-count-jq");
//	
//		var qvalueCutoffReset = undefined;
//		var uniquePeptidesReset = undefined;
//		var minPSMcountReset = undefined;
//	
//	
//		if ( $qvalueCutoffReset.length > 0 ) {
//			
//			qvalueCutoffReset = $qvalueCutoffReset.val();
//			$qvalueCutoff.val( qvalueCutoffReset );
//		}
//		
//		if ( $uniquePeptidesReset.length > 0 ) {
//	
//			uniquePeptidesReset = $uniquePeptidesReset.val();
//			$uniquePeptides.val( uniquePeptidesReset );
//		}
//		
//		if ( $minPSMcountReset.length > 0 ) {
//			
//			minPSMcountReset = $minPSMcountReset.val();
//			$minPSMcount.val( minPSMcountReset );
//		}
//	
//	});
//	
//
//	//  Checkbox for show/hide vertical lines for trypsin cut points.  Initial show/hide set below
//
//	this.$root_block.find(".protein-coverage-show-hide-vertical-data-lines-checkbox-jq").change(function( event, ui ) {
//
//		var $this = $(this);
//
//		if ( $this.attr('checked') ) {
//
//			objectThis.proteinCoverageViewers.masonViewer.showVerticalDataLines();
//
//		} else {
//
//			objectThis.proteinCoverageViewers.masonViewer.hideVerticalDataLines();
//		}
//	});
//	
};



Create_MasonViewer_Philius.prototype.createCoverageMapMain = function( param ) {


	var objectThis = this;


	this.createLoadingSpinner( );


//	var $noDataFoundDiv = this.$root_block.find(".peptide-coverage-viewer-none-found-jq");
//	
//	$noDataFoundDiv.hide();

	
	var proteinSequenceData = param.data;


	//  Create context for the AJAX call back
	var context = { proteinSequenceData: proteinSequenceData  };



//	var ajaxData = { proteinId: proteinId, qvalueCutoff: qvalueCutoff, uniquePeptides: uniquePeptides, minPSMcount: minPSMcount };


//	var $proteinId = this.$root_block.find(".protein-coverage-protein-id-jq");
//
//	var proteinId = undefined;
//
//	if ( $proteinId.length > 0 ) {
//		
//		proteinId = $proteinId.val();
//		ajaxData.yrcNrseqProteinId = proteinId;
//	}
//
//	var $rootDivPeptide_coverage = this.$root_block.find(".peptide-coverage-viewer");
//
//	$rootDivPeptide_coverage.empty();
//
//			
//	var $noDataFoundDiv = this.$root_block.find(".peptide-coverage-viewer-none-found-jq");
//	
//	$noDataFoundDiv.hide();
	

	var ajaxData = { sequence: proteinSequenceData };
	
	

	var startTimeTracking = (new Date).getTime();

	var url = this.serviceURLs.base + this.serviceURLs.submitSequence + this.serviceURLs.suffixForTypeJSONorJSONP +
				this.serviceURLs.addition_jsonpCallback;

	$.ajax(
		{ url : url,
			type : "POST",

			success :  function( data ) {

				var timeTrackingDiffDataRetrieved = (new Date).getTime() - startTimeTracking;

				// Changed to Jersey web service so no status
				
//				testStatusOnReturnedJSON( data );

				objectThis.createCoverageMapMainProcessSubmitResponse( { data: data, context: context } );

//				var timeTrackingDiffViewersCreated = (new Date).getTime() - startTimeTracking;

//				alert( "timeTrackingDiffDataRetrieved: " + timeTrackingDiffDataRetrieved + ", timeTrackingDiffViewersCreated: " + timeTrackingDiffViewersCreated );


			},

			error: function(jqXHR, textStatus, errorThrown) {

				objectThis.deleteLoadingSpinner(  );

				handleGeneralServerError( { exception: errorThrown, jqXHR: jqXHR, textStatus: textStatus } );

			},
			data: ajaxData,  //  The data sent 
			dataType : "jsonp"
		});

};

////////////////////////////////

Create_MasonViewer_Philius.prototype.createCoverageMapMainProcessSubmitResponse = function( param ) {

	
	var objectThis = this;


	try {

		var data = param.data;

		var calledContext = param.context;
		
		// Changed to Jersey web service

//		var results = data.results;
//
//		if ( results === undefined || results === null ) {
//
//			var msg = "Error retrieving Submit Response data.  results === undefined || results === null";
//
//			this.deleteLoadingSpinner(  );
//
//			handleGeneralServerError( { msg: msg  });
//		}
//		
//		var philiusResult = results.philiusResult;
		
		
		var philiusResult = data.philiusResult;
			
		
		if ( philiusResult !== undefined && philiusResult !== null ) {
			
			//  The philius result is returned so display it
			objectThis.createCoverageMapMainProcessGetPhiliusResultsResponse( { philiusResult: philiusResult, context: calledContext } );
			
		} else {
			
			//  The server has to process the sequence with Philius so have to wait for it
			
			// Changed to Jersey web service

//			var token = results.token;

			var token = data.token;

			//  compute a time past not check for Philius job done
			
			var now = new Date().getTime();
	        var maxFinishTime  = now + this.TOTAL_ALLOWED_WAIT_FOR_PHILIUS_JOB_TO_COMPLETE_TIME;
	
			var callingContext = { token: token, maxFinishTime: maxFinishTime };
			
			this.createCoverageMapMainCheckIfPhiliusJobDone( { context: callingContext } );
			
		}

	} finally {

		this.deleteLoadingSpinner(  );
	}	
};
		
		

////////////////////////////////

Create_MasonViewer_Philius.prototype.createCoverageMapMainCheckIfPhiliusJobDone = function( param ) {

	
	var objectThis = this;

	var calledContext = param.context;
	
	var token = calledContext.token;
	

	
	var ajaxURL = this.serviceURLs.base + this.serviceURLs.isJobDone + this.serviceURLs.suffixForTypeJSONorJSONP + "/"  + token;
	
	var ajaxData = { };

	$.ajax(
		{ url : ajaxURL,
			
			cache: false,

			success :  function( data ) {

//				var timeTrackingDiffDataRetrieved = (new Date).getTime() - startTimeTracking;

				// Changed to Jersey web service

//				testStatusOnReturnedJSON( data );

				objectThis.createCoverageMapMainProcessIfPhiliusJobDoneResponse( { data: data, context: calledContext } );

//				var timeTrackingDiffViewersCreated = (new Date).getTime() - startTimeTracking;


//				alert( "timeTrackingDiffDataRetrieved: " + timeTrackingDiffDataRetrieved + ", timeTrackingDiffViewersCreated: " + timeTrackingDiffViewersCreated );


			},

			error: function(jqXHR, textStatus, errorThrown) {

				objectThis.deleteLoadingSpinner(  );

				handleGeneralServerError( { exception: errorThrown, jqXHR: jqXHR, textStatus: textStatus } );

			},
			data: ajaxData,  //  The data sent as params on the URL
			dataType : "jsonp"
		});
};
		
		

////////////////////////////////

Create_MasonViewer_Philius.prototype.createCoverageMapMainProcessIfPhiliusJobDoneResponse = function( param ) {

	
	var objectThis = this;


	try {

		var data = param.data;

		var calledContext = param.context;	


		// Changed to Jersey web service

//		var results = data.results;
//
//		if ( results === undefined || results === null ) {
//
//			var msg = "Error retrieving Submit Response data.  results === undefined || results === null";
//
//			this.deleteLoadingSpinner(  );
//
//			handleGeneralServerError( { msg: msg  });
//		}
		
		var token = calledContext.token;

		
		if ( data["return"] !== true ) {
			
			var nowTime = new Date().getTime()
			
			if ( nowTime > calledContext.maxFinishTime ) {
				
				//  Have waited too long so do something to display message and then delete spinner.
				

				var $tookTooLongDiv = this.$root_block.find(".coverage-map-took-too-long-jq");
				
				$tookTooLongDiv.show();
				
				this.deleteLoadingSpinner(  );
				
			} else {
			
				setTimeout( function() {  //  Check again on a 5 second delay
					
					objectThis.createCoverageMapMainCheckIfPhiliusJobDone( { context: calledContext } );
					
				},5000 /*  delay */ /*,param1,param2 */);  
			}
				
				
		} else {
			this.createCoverageMapMainProcessGetPhiliusResults( { context: calledContext } );
		}	

	} catch ( error ) {

		this.deleteLoadingSpinner(  );
		
		throw error;
	}	
};
		
		
		

////////////////////////////////

Create_MasonViewer_Philius.prototype.createCoverageMapMainProcessGetPhiliusResults = function( param ) {

	

	var objectThis = this;

	var calledContext = param.context;
	
	var token = calledContext.token;
	
	var ajaxURL = this.serviceURLs.base + this.serviceURLs.getPhiliusResults +  + this.serviceURLs.suffixForTypeJSONorJSONP + "/" + token;
	
	var ajaxData = { };


	try {
		
	
		$.ajax(
			{ url : ajaxURL,
				
				cache: false,

				success :  function( data ) {
	
//					var timeTrackingDiffDataRetrieved = (new Date).getTime() - startTimeTracking;
	
					// Changed to Jersey web service

//					testStatusOnReturnedJSON( data );
	
					objectThis.createCoverageMapMainProcessGetPhiliusResultsResponse( { philiusResult: data["return"], context: calledContext } );
	
//					var timeTrackingDiffViewersCreated = (new Date).getTime() - startTimeTracking;
	
	
	//				alert( "timeTrackingDiffDataRetrieved: " + timeTrackingDiffDataRetrieved + ", timeTrackingDiffViewersCreated: " + timeTrackingDiffViewersCreated );
	
	
				},
	
				error: function(jqXHR, textStatus, errorThrown) {
	
					objectThis.deleteLoadingSpinner(  );
	
					handleGeneralServerError( { exception: errorThrown, jqXHR: jqXHR, textStatus: textStatus } );
	
				},
				data: ajaxData,  //  The data sent as params on the URL
				dataType : "json"
			});
		
		

	} catch ( error ) {

		this.deleteLoadingSpinner(  );
	}	
};


////////////////////////////////

Create_MasonViewer_Philius.prototype.createCoverageMapMainProcessGetPhiliusResultsResponse = function( param ) {



	var objectThis = this;

	var calledContext = param.context;

	var philiusResult = param.philiusResult;


	try {
		var $rootDivPeptide_coverage = this.$masonViewerRootDiv;

//		var $rootDivPeptide_coverage = this.$root_block.find(".peptide-coverage-viewer");


		var masonViewerInputData = this.createMasonViewerInputData( philiusResult );

		
		var requestParams = { inputData: masonViewerInputData };
		
		var configParams = {};

		
		var callbackFunctionsObj = masonViewerPeptipediaPhiliusCallbacksCreator( { config: null } );



		var masonViewer = MasonViewer.createMasonViewer( $rootDivPeptide_coverage, requestParams, configParams, callbackFunctionsObj );

		if ( this.config.masonViewerRegistry ) {
			
			//   itemKey has to be unique across all the viewers registered with a specific registry
			this.config.masonViewerRegistry.addMasonViewer( { itemKey: "philius", masonViewer: masonViewer } );
		}
		
		this.proteinCoverageViewers = { masonViewer: masonViewer };

		
		//  Commented out since no vertical lines for this viewer

		//  Show/hide the vertical lines based on initial setting of the checkbox

//		var $showHideVerticalLinesCheckbox = this.$root_block.find(".protein-coverage-show-hide-vertical-data-lines-checkbox-jq");
//
//		if ( $showHideVerticalLinesCheckbox.attr('checked') ) {
//
//			this.proteinCoverageViewers.masonViewer.showVerticalDataLines();
//
//		} else {
//
//			this.proteinCoverageViewers.masonViewer.hideVerticalDataLines();
//		}


		
		
		this.setCoverageMapCreated( true );

		return this.proteinCoverageViewers;

//	} catch ( error ) {
//
//		throw error;

	} finally {

		this.deleteLoadingSpinner(  );

	}

};


////////////////////////////////////

//        Take the Philius data from the Philius web app and reformat as needed for the Mason coverage viewer

//            Always have one row, even if empty

Create_MasonViewer_Philius.prototype.createMasonViewerInputData = function( philiusResult ) {
	
	var sequenceLength = philiusResult.sequence.length;
	
	var segments = philiusResult.segments;
	
	
	
	var blockItems = new Array();
	
	var masonViewerPeptipediaDriverParams 
		= { maxSequenceLength: sequenceLength , 
			rowItems: [ { label: this.VIEWER_ROW_LABEL, blockItems: blockItems } ]
			
		  };
	
	
	for ( var segmentIndex = 0; segmentIndex < segments.length; segmentIndex++ ) {
		
		var segment = segments[ segmentIndex ];
		
		var type = segment.type;
		
		if ( type === this.PHILIUS_TYPE_CONSTANTS.TM_HELIX || type == this.PHILIUS_TYPE_CONSTANTS.SP) {

			var blockData = { segment: segment };

			var blockItem = { startPos: segment.start , endPos: segment.end , blockData: blockData };

			blockItems.push( blockItem );
		}
		
		var z = 0;
		
		
	}
	
	
//	Create_MasonViewer_Philius.prototype.PHILIUS_TYPE_CONSTANTS = {
//		
//			 SP : 0,				// signal peptide segment
//			 NON_CYTOPLASMIC : 1,	// non-cytoplastmic segment
//			 CYTOPLASMIC : 2,		// cytoplasmic segment
//			 TM_HELIX : 3			// transmembrane helix
//	};
	
//   Input format to viewer core
//
//	var inputData
//		= {"maxSequenceLength": 255,
//			"rowItems": [
//							{"label":"BBpilabel1",
//							"blockItems": [
//											{
//											"blockData":{"level":42,"id":85,"otherData":"TheOtherData"},
//											"startPos":25,
//											"endPos":37
//											}
//										]
//							}
//						  ]
//			}

	
	return masonViewerPeptipediaDriverParams;
};





///////////////////////////////////

Create_MasonViewer_Philius.prototype.createLoadingSpinner = function() {

//	var $spinnerContainer = this.$root_block.find(".coverage-map-loading-spinner-block");
//	
//	$spinnerContainer.show();
//
//	var $spinnerDiv = $spinnerContainer.find(".coverage-map-loading-spinner");
//	
//
//	var spinnerDiv = $spinnerDiv.get( 0 );
//
//	this.loadingSpinner = new Spinner( SPINNER_OPTIONS ).spin( spinnerDiv );
//
//	return this.loadingSpinner;
};


Create_MasonViewer_Philius.prototype.deleteLoadingSpinner = function(  ) {
	
//	this.loadingSpinner.stop();
//
//	var $spinnerContainer = this.$root_block.find(".coverage-map-loading-spinner-block");
//
//	$spinnerContainer.hide();

};