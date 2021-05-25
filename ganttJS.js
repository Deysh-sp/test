function getData(whatFacility,callback){
	console.log(whatFacility)
	if(whatFacility == "All Facilities (slow)"){
		var url = "/sites/VHAVISN10/CAPDASH/CAT/_api/web/lists/GetByTitle('tblMain')/items?$top=4000&$filter=(PTRStatus ne 'Completed Project')&$orderby=ProjectNumber"
	}else if(whatFacility == "610 NIHCS"){
		var url = "/sites/VHAVISN10/CAPDASH/CAT/_api/web/lists/GetByTitle('tblMain')/items?$top=4000&$filter=(PTRStatus ne 'Completed Project') and ((Facility eq '610 NIHCS - Marion ') or (Facility eq '610A4 NIHCS - Fort Wayne '))&$orderby=ProjectNumber"
	}else{
		var url = "/sites/VHAVISN10/CAPDASH/CAT/_api/web/lists/GetByTitle('tblMain')/items?$top=4000&$filter=(PTRStatus ne 'Completed Project') and (Facility eq '" + whatFacility + "')&$orderby=ProjectNumber"		
	}
	console.log(whatFacility)
	
	var projectObj = [];	
	$.ajax({  //Gets tblMain Information
				
				url: url,				
				type: "GET",
				headers: {"accept": "application/json;odata=verbose",},
				success: function(data){
				
					//console.log(data)
					$.each(data.d.results, function (key, value) {
													
							var title = value.ProjectTitle.replace(",","");
							var title = title.replace("&","")
							var plannedDesign = value.DesignObligationDateRevised == null ? value.DesignObligationDatePlanned : value.DesignObligationDateRevised;
							var designStart = value.DesignObligationDateActual == null ? plannedDesign : value.DesignObligationDateActual;
							
							var pConst = value.ConstructionObligationDateRevise == null ? value.ConstructionObligationDatePlanne : value.ConstructionObligationDateRevise;
							var constStart = value.ConstructionObligationDateActual == null ? pConst : value.ConstructionObligationDateActual;
							var constEnd = value.ConstructionCompleteDateRevised == null ? value.ConstructionCompleteDatePlanned : value.ConstructionCompleteDateRevised;
							
							if(value.Design_COR != null){
								var preCOR = value.Design_COR.split(",");
								var dCOR = preCOR[0];
							}else{
								dCOR = '';
							}
							
							if(value.Design_CO != null){
								var preCO = value.Design_CO.split(",");
								var dCO = preCO[0];
							}else{
								dCO = '';
							}
							
							if(value.Const_COR != null){
								var preCOR = value.Const_COR.split(",");
								var cCOR = preCOR[0];
							}else{
								cCOR = '';
							}
							
							if(value.Const_CO != null){
								var preCO = value.Const_CO.split(",");
								var cCO = preCO[0];
							}else{
								cCO = '';
							}
							
							
							
							var dPlannedCost = value.PlannedDesign_x0024_ == 0.00 || value.PlannedDesign_x0024_ == null ? 0.00 : value.PlannedDesign_x0024_;
							var designCost = value.TotalDesignObligated_x0024_ == 0.00 || value.TotalDesignObligated_x0024_ == null ? dPlannedCost : value.TotalDesignObligated_x0024_;
							
							var cPlannedCost = value.PlannedConstruction_x0024_ == 0.00 || value.PlannedConstruction_x0024_ == null ? 0.00 : value.PlannedConstruction_x0024_;
							var constCost = value.TotalConstructionObligated_x0024_ == 0.00 || value.TotalConstructionObligated_x0024_ == null ? cPlannedCost : value.TotalConstructionObligated_x0024_;
							
							var totalCost = designCost + constCost
							
							var designEnd = value.ConstSentContracting != null ? value.ConstSentContracting : constStart;
							
							var sowEnd = value.AESentContracting != null ? value.AESentContracting : designStart;
							var created = new Date(designStart) < new Date(value.Created) ? designStart : value.Created;
							var noDesign = new Date(value.ConstructionObligationDatePlanne) < new Date(value.Created) ? constStart : value.Created;
							var aeAward = value.AESentContracting != null ? value.AESentContracting : created;
							
							var dProcPercent = value.DesignObligationDateActual != null || value.AESentContracting != null ? 100 : 0;
							var dProcAward = value.DesignObligationDateActual != null ? 100 : 0;
							
							
								
							
															
							var sdDelivered = value.SDActual != null ? value.SDActual : designEnd;
							var sdReviewed = value.SDReview != null ? value.SDReview : designStart;
							
							var ddDelivered = value.DDActual != null ? value.DDActual : designEnd;
							var ddReviewed = value.DDReview != null ? value.DDReview : designStart;
							
							var cdDelivered = value.CDActual != null ? value.CDActual : designEnd;
							var cdReviewed = value.CDReview != null ? value.CDReview : designStart;
							
							
							var StartConst = value.DesignObligationDatePlanned == null ? noDesign : designEnd;
							
							var StartBOD = value.ConstSentContracting != null ? value.ConstSentContracting : StartConst;
							//if(value.DesignObligationDatePlanned == null) {
							//	var startBOD = value.ConstSentContracting != null ? value.ConstSentContracting : noDcreated;
							//}else{
							//	var startBOD = value.ConstSentContracting != null ? value.ConstSentContracting : noDcreated;
							//}
							
							
							var BOD = value.CAM_Const_BOD != null ? value.CAM_Const_BOD : constStart;
							var constAward = value.CAM_Const_BOD != null ? value.CAM_Const_BOD : designEnd;
							
							var percentBOD = value.CAM_Const_BOD != null || value.ConstructionObligationDateActual != null ? 100 : 0;
							
							
							
							//var constProcStart = 
													
							projectObj.push({
								ID:				value.ID,
								Created:		created,
								Program:		value.Program,
								Facility:		$.trim(value.Facility),
								Title:			title,
								ProjectNumber:	value.ProjectNumber,
								DesignCOR:		dCOR,
								DesignCO:		dCO,
								ConstCOR:		cCOR,
								ConstCO:		cCO,
								DesignPercent:	value.DesignComplete * 100,
								DesignStart:	designStart,
								aeAward:		aeAward,
								sowEnd:			sowEnd,
								dProcPercent:	dProcPercent,
								dProcAward:		dProcAward,
								sdDelivered:	sdDelivered,
								sdReviewed:		sdReviewed,
								ddDelivered:	ddDelivered,
								ddReviewed:		ddReviewed,
								cdDelivered:	cdDelivered,
								cdReviewed:		cdReviewed,
								DesignEnd:		designEnd,
								BOD:			BOD,
								ConstSent:		value.ConstSentContracting,
								ConstObl:		value.ConstructionObligationDateActual,
								ConstPercent:	value.ConstructionComplete * 100,
								percentBOD:		percentBOD,
								ConstAward:		constAward,
								StartConst:		StartConst,
								StartBOD:		StartBOD,
								ConstStart:     constStart,
								ConstEnd:		constEnd,
								dPlanned:		value.DesignObligationDatePlanned,
								cPlanned:		value.ConstructionObligationDatePlanne,
								totalAmount:    totalCost
								
							});							
					});
					
				},
				error: function(error){alert("Get tblMain Info: UpdateArrays" + JSON.stringify(error));},
				complete: function () {	callback(projectObj);}				
			});	
}
function buildChart(projectObj){
	
	
	
	g = new JSGantt.GanttChart(document.getElementById('GanttChartDIV'), 'week');
	//if( g.getDivId() != null ) {
	g.setCaptionType('Complete');
	g.setUseToolTip(0);
	g.setQuarterColWidth(24);
	g.setDateTaskDisplayFormat('day month dd yyyy');
	g.setDayMajorDateDisplayFormat('mon yyyy - Week ww');
	g.setWeekMinorDateDisplayFormat('dd mon');
	g.setDateTaskTableDisplayFormat('mm/dd/yyyy');
	g.setShowTaskInfoLink(1);
	g.setShowEndWeekDate(0);
	g.setUseSingleCell(100);
	//g.setFormatArr('Day', 'Week', 'Month');
	g.setFormatArr('Week', 'Month', 'Quarter');	
	g.setCaptionType('Caption');
	g.setScrollTo('today');
	g.setUseSort(0);
	//}
		
	var CSI_ID = 40000000;
	var NRM_ID = 50000000;
	var Minor_ID = 60000000;
	
	g.AddTaskItem(new JSGantt.TaskItem(Minor_ID,'Minor','','', 'ggroupblack',  '', 0, '', 0, 1, 0,  1, '', '', 'Some Notes text', g));				
		for (var i=0, len = projectObj.length; i< len; i++){
			if(projectObj[i].Program == "Minor"){
				addTasks(Minor_ID,projectObj[i]);			
			}				
		}
						
	g.AddTaskItem(new JSGantt.TaskItem(NRM_ID,'NRM','','',          'ggroupblack',  '',       0, '',    0,   1, 0,  1,     '', '',      'Some Notes text', g));
		for (var i=0, len = projectObj.length; i< len; i++){
			if(projectObj[i].Program == "NRM"){			
				addTasks(NRM_ID,projectObj[i]);	
			}						
		}
						
	g.AddTaskItem(new JSGantt.TaskItem(CSI_ID,'CSI','','',          'ggroupblack',  '',       0, '',    0,   1, 0,  1,     '', '',      'Some Notes text', g));
		for (var i=0, len = projectObj.length; i< len; i++){
			if(projectObj[i].Program == "CSI"){	
				addTasks(CSI_ID,projectObj[i]);	
			}						
		}		 
					
	g.Draw();
	
	console.log(g)
	console.log(g.getXMLProject())
	
	// Create a DOMParser
	var parser = new DOMParser();

	// Use it to turn your xmlString into an XMLDocument
	var xmlDoc = parser.parseFromString(g.getXMLProject(), "application/xml");
	
	console.log(xmlDoc)
	
	//https://github.com/jimmywarting/StreamSaver.js
	
	var fso  = new ActiveXObject("Scripting.FileSystemObject"); 
    var fh = fso.CreateTextFile("c:\\Test.txt", true); 
    fh.WriteLine("Some text goes here..."); 
    fh.Close(); 

	
	
}
function addTasks(ID,projectObj){
	
		 
		g.AddTaskItem(new JSGantt.TaskItem(projectObj.ID,projectObj.ProjectNumber,projectObj.Created,projectObj.ConstEnd,'ggroupblack',  '', 0, '',0,1, ID,  0, '', projectObj.Title, 'Some Notes text', g));	
				
		
		if(projectObj.dPlanned != null){
			
			var ddBottom = projectObj.DesignPercent > 35 && projectObj.DesignPercent < 65 ? projectObj.DesignPercent : 0
			var cdBottom = projectObj.DesignPercent > 65 && projectObj.DesignPercent < 95 ? projectObj.DesignPercent : 0
			var ccBottom = projectObj.DesignPercent > 95 ? projectObj.DesignPercent : 0
			
			var percentSD = projectObj.DesignPercent > 35 || projectObj.ConstObl != null || projectObj.ConstSent != null ? 100 : projectObj.DesignPercent
			var percentDD = projectObj.DesignPercent > 65 || projectObj.ConstObl != null || projectObj.ConstSent != null ? 100 : ddBottom
			var percentCD = projectObj.DesignPercent > 95 || projectObj.ConstObl != null || projectObj.ConstSent != null ? 100 : cdBottom
			var percentCC = projectObj.ConstObl != null || projectObj.ConstSent != null ? 100 : ccBottom
	
			var designProcID = projectObj.ID + 1000000 + ID;
			var dProcSub1 = designProcID + 100000;
			var dProcSub2 = designProcID + 200000;

			//Design
			var designGroupID = projectObj.ID + 2000000 + ID;
			var designSub1 = designGroupID + 100000;
			var designSub1a = designGroupID + 110000;
			var designSub2 = designGroupID + 200000;
			var designSub2a = designGroupID + 210000;
			var designSub3 = designGroupID + 300000;
			var designSub3a = designGroupID + 310000;
				
				g.AddTaskItem(new JSGantt.TaskItem(designGroupID,'Design',projectObj.DesignStart,projectObj.DesignEnd,'ggroupblack',  '', 0, projectObj.DesignCOR,0,1, projectObj.ID,  0, '', projectObj.Title, 'Some Notes text', g));
				
				g.AddTaskItem(new JSGantt.TaskItem(dProcSub1,'SOW Development',projectObj.Created,projectObj.sowEnd,'gtaskblue',  '', 0, projectObj.DesignCOR,projectObj.dProcPercent,0, designGroupID,  0, '', projectObj.Title, 'Some Notes text', g));
				g.AddTaskItem(new JSGantt.TaskItem(dProcSub2,'A/E Award',projectObj.aeAward,projectObj.DesignStart,'gtaskblue',  '', 0, projectObj.DesignCO,projectObj.dProcAward,0, designGroupID,  0, dProcSub1+','+dProcSub2, projectObj.Title, 'Some Notes text', g));				
				g.AddTaskItem(new JSGantt.TaskItem(designSub1,'Schematic Design',projectObj.DesignStart,projectObj.sdDelivered,'gtaskblue',  '', 0, '',percentSD,0, designGroupID,  1, dProcSub2+','+designSub1, projectObj.Title, 'Some Notes text', g));					
				g.AddTaskItem(new JSGantt.TaskItem(designSub2,'Design Development',projectObj.sdReviewed,projectObj.ddDelivered,'gtaskblue',  '', 0, '',percentDD,0, designGroupID,  1, designSub1+','+designSub2, projectObj.Title, 'Some Notes text', g));				
				g.AddTaskItem(new JSGantt.TaskItem(designSub3,'Construction Documents',projectObj.ddReviewed,projectObj.cdDelivered,'gtaskblue',  '', 0, '',percentCD,0, designGroupID,  1, designSub2+','+designSub3, projectObj.Title, 'Some Notes text', g));
				g.AddTaskItem(new JSGantt.TaskItem(designSub3a,'CDs to Contracting',projectObj.cdReviewed,projectObj.DesignEnd,'gtaskblue',  '', 0, '',percentCC,0, designGroupID,  1, designSub3+','+designSub3a, projectObj.Title, 'Some Notes text', g));
				
								
		}
		
		if(projectObj.cPlanned != null){
		
			var constProcID = projectObj.ID + 3000000 + ID;
			var constSub1 = constProcID + 100000;
			var constSub1a = constProcID + 110000;
			var constSub2 = constProcID + 200000;
			var constSub2a = constProcID + 210000;
			var constSub3 = constProcID + 300000;
			var constID = projectObj.ID + 4000000 + ID;
			var const1 = constID + 100000;
			
			var percentAward = projectObj.ConstObl != null ? 100 : 0
			
				g.AddTaskItem(new JSGantt.TaskItem(constID,'Construction',projectObj.StartConst,projectObj.ConstEnd,'ggroupblack',  '', 0, projectObj.ConstCOR,projectObj.ConstPercent,1, projectObj.ID,  0, '', projectObj.Title, 'Some Notes text', g));
			
				g.AddTaskItem(new JSGantt.TaskItem(constSub1,'Bid Opening',projectObj.StartBOD,projectObj.BOD,'gtaskblue',  '', 0,'',projectObj.percentBOD,0, constID,  1, '', projectObj.Title, 'Some Notes text', g));
				g.AddTaskItem(new JSGantt.TaskItem(constSub2,'Award',projectObj.ConstAward,projectObj.ConstStart,'gtaskblue',  '', 0,projectObj.ConstCO,percentAward,0, constID,  1, constSub1+','+constSub2, projectObj.Title, 'Some Notes text', g));			
				g.AddTaskItem(new JSGantt.TaskItem(const1,'Construction',projectObj.ConstStart,projectObj.ConstEnd,'gtaskblue',  '', 0,'',projectObj.ConstPercent,0, constID,  1, constSub2+','+constSub3, projectObj.Title, 'Some Notes text', g));
			
		}
}
function getFormattedDate(date) {
	
	date = (date == "" || date == null)? "" : String.format("{0:d}",new Date(date));
	//date = String.format("{0:d}",new Date(date));
	
	if(date.indexOf("NaN") != -1){date = ""}
	
	return date;
}
function sortJSON(data, key, way) {
    return data.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        if (way === '123' ) { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
        if (way === '321') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
    });
}

function download() {
	
	
  var stupidExample = g.getXMLProject();
 // var file = new File([xml] , "xmlfile.xml", {type:"application/xml"}); 

	var text = g.getXMLProject();
	var data = new Blob([text], {type: 'text/plain'});

	var url = window.URL.createObjectURL(data);

	document.getElementById('download_link').href = url;


}