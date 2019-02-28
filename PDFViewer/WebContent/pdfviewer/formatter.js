sap.ui.define([], function () {
	
	"use strict";
	
	return {
		
		showPDF: function(file) {
				
				var sFrame="<iframe src='../PDFViewer/pdfjs/web/viewer.html?file=" + file + "' width='100%' height='100%'/>";
				
				return sFrame;				
				
				}
		}
});