sap.ui.define(["sap/ui/core/mvc/Controller", "pdfviewer/formatter"], 
		
	function (Controller,formatter) {
	
		"use strict";
		
		return Controller.extend("pdfviewer.base64", { 
			
			formatter: formatter,
			
			pageNum: 1,
			
			totalPages: 0,
			
			scale: 1,
			
			step: 0.1,
			
		    pdfData: atob(

		    		'JVBERi0xLjcNCiW1tbW1DQoxIDAgb2JqDQo8PC9UeXBlL0NhdGFsb2cvUGFnZXMgMiAwIFIvTGFu' +
		    		'ZyhpdC1JVCkgL1N0cnVjdFRyZWVSb290IDEyIDAgUi9NYXJrSW5mbzw8L01hcmtlZCB0cnVlPj4v' +
		    		'TWV0YWRhdGEgMjQgMCBSL1ZpZXdlclByZWZlcmVuY2VzIDI1IDAgUj4+DQplbmRvYmoNCjIgMCBv' +
		    		'YmoNCjw8L1R5cGUvUGFnZXMvQ291bnQgMi9LaWRzWyAzIDAgUiA5IDAgUl0gPj4NCmVuZG9iag0K' +
		    		'MyAwIG9iag0KPDwvVHlwZS9QYWdlL1BhcmVudCAyIDAgUi9SZXNvdXJjZXM8PC9Gb250PDwvRjEg' +
		    		'NSAwIFI+Pi9FeHRHU3RhdGU8PC9HUzcgNyAwIFIvR1M4IDggMCBSPj4vUHJvY1NldFsvUERGL1Rl' +
		    		'eHQvSW1hZ2VCL0ltYWdlQy9JbWFnZUldID4+L01lZGlhQm94WyAwIDAgNTk1LjUgODQyLjI1XSAv' +
		    		'Q29udGVudHMgNCAwIFIvR3JvdXA8PC9UeXBlL0dyb3VwL1MvVHJhbnNwYXJlbmN5L0NTL0Rldmlj' +
		    		'ZVJHQj4+L1RhYnMvUy9TdHJ1Y3RQYXJlbnRzIDA+Pg0KZW5kb2JqDQo0IDAgb2JqDQo8PC9GaWx0' +
		    		'ZXIvRmxhdGVEZWNvZGUvTGVuZ3RoIDUyMz4+DQpzdHJlYW0NCnic7d1Pi9NAGMfxeyDv4Tmq4NN5' +
		    		'ZuaZP7As2HZdFBYUCx6WPeqeFNT3D6a1B2UXvVQpzreHJmmSTiEfJj8mw1NZvZGLi9XN5tVWwuWl' +
		    		'rLcb+TJPQcP+1VrNEsS7q0vLUaPL1w/z9P6ZfJ6n9W6eVi9NzPaf7z7Oky0HBzHxqqG61GJqVXaf' +
		    		'luOu31W5/7Z8s9wfttpx63qebp+8ePo8hj++5zL66r9t8k52r+fparnKb+fpBChS0B5/RnGwcCSw' +
		    		'PnlzR4O5qPmD5hB3juIOq3/JQTLtMBiegVUtCQfDOwgRBziQ0pom4gEOalaDwfAMvGtoOBjeQc7a' +
		    		'iAc4SEGdeIADcxzgQEpY9pAPhnfgbVmSD3BQIwiGR7AsK+EABzlpfvhkEwejOYgNBzgQt6zEg+EZ' +
		    		'5N61Ew9w0PJ+/hMORndQgxb6Axx40QyD4Rlk08SQMg5iVWNIGQcWtREPhneQetMCg+EZtKTOYCIO' +
		    		'StdEPMCBuwbiAQ5ywAEOJEXXSj7AwbLHyQfDO4i9KLcFGLTDGTgY3UGp2okHOPDIJBQcSExN6Q5g' +
		    		'ELNm5iLhIHQc4EBsOY8qaTiwFqiSBgMrro05aThwo0oaDsRSpUoaDsRixAEOxEKjTBoOpCdtPGXC' +
		    		'QW1KbzC8gpIfq5G2OXVrJf2mtf8C3dn8kPOT9uM/JB6/9ttfW5Orm418B6KKM/YNCmVuZHN0cmVh' +
		    		'bQ0KZW5kb2JqDQo1IDAgb2JqDQo8PC9UeXBlL0ZvbnQvU3VidHlwZS9UcnVlVHlwZS9OYW1lL0Yx' +
		    		'L0Jhc2VGb250L0JDREVFRStDYWxpYnJpL0VuY29kaW5nL1dpbkFuc2lFbmNvZGluZy9Gb250RGVz' +
		    		'Y3JpcHRvciA2IDAgUi9GaXJzdENoYXIgMzIvTGFzdENoYXIgNjgvV2lkdGhzIDIyIDAgUj4+DQpl' +
		    		'bmRvYmoNCjYgMCBvYmoNCjw8L1R5cGUvRm9udERlc2NyaXB0b3IvRm9udE5hbWUvQkNERUVFK0Nh' +
		    		'bGlicmkvRmxhZ3MgMzIvSXRhbGljQW5nbGUgMC9Bc2NlbnQgNzUwL0Rlc2NlbnQgLTI1MC9DYXBI' +
		    		'ZWlnaHQgNzUwL0F2Z1dpZHRoIDUyMS9NYXhXaWR0aCAxNzQzL0ZvbnRXZWlnaHQgNDAwL1hIZWln' +
		    		'aHQgMjUwL1N0ZW1WIDUyL0ZvbnRCQm94WyAtNTAzIC0yNTAgMTI0MCA3NTBdIC9Gb250RmlsZTIg' +
		    		'MjMgMCBSPj4NCmVuZG9iag0KNyAwIG9iag0KPDwvVHlwZS9FeHRHU3RhdGUvQk0vTm9ybWFsL2Nh' +
		    		'IDE+Pg0KZW5kb2JqDQo4IDAgb2JqDQo8PC9UeXBlL0V4dEdTdGF0ZS9CTS9Ob3JtYWwvQ0EgMT4+' +
		    		'DQplbmRvYmoNCjkgMCBvYmoNCjw8L1R5cGUvUGFnZS9QYXJlbnQgMiAwIFIvUmVzb3VyY2VzPDwv' +
		    		'Rm9udDw8L0YxIDUgMCBSPj4vRXh0R1N0YXRlPDwvR1M3IDcgMCBSL0dTOCA4IDAgUj4+L1Byb2NT' +
		    		'ZXRbL1BERi9UZXh0L0ltYWdlQi9JbWFnZUMvSW1hZ2VJXSA+Pi9NZWRpYUJveFsgMCAwIDU5NS41' +
		    		'IDg0Mi4yNV0gL0NvbnRlbnRzIDEwIDAgUi9Hcm91cDw8L1R5cGUvR3JvdXAvUy9UcmFuc3BhcmVu' +
		    		'Y3kvQ1MvRGV2aWNlUkdCPj4vVGFicy9TL1N0cnVjdFBhcmVudHMgMT4+DQplbmRvYmoNCjEwIDAg' +
		    		'b2JqDQo8PC9GaWx0ZXIvRmxhdGVEZWNvZGUvTGVuZ3RoIDIwND4+DQpzdHJlYW0NCnic7dQ9C8Iw' +
		    		'EAbgPZD/8I4qmObSpkmhFOyHRaGgWHAQR+2koP5/MC0uDuIiOKQZwl047oZ7CIIN0jRoilUJmWXI' +
		    		'ywI3zqSQ/bHWRJDQiRYaNlJCadxPnO1nuHKWt5wFSwJR/96eOSNXLEHQRkijYWISZNBeXF29M+ge' +
		    		'rjO6IbOvrObsMFlM50p+vaPY9/API49o15xVbtVbzn4nI4oF6UHGAGJ04KmDkEQyMvCeARkRh6MD' +
		    		'7x1INTrw2kHoPgLzyQHex6FqCjwBtG4Mwg0KZW5kc3RyZWFtDQplbmRvYmoNCjExIDAgb2JqDQo8' +
		    		'PC9BdXRob3IoTWFudWVsIEJlbGxldCkgL0NyZWF0b3Io/v8ATQBpAGMAcgBvAHMAbwBmAHQArgAg' +
		    		'AFcAbwByAGQAIABwAGUAcgAgAE8AZgBmAGkAYwBlACAAMwA2ADUpIC9DcmVhdGlvbkRhdGUoRDoy' +
		    		'MDE5MDMwNDE1NDU1OCswMScwMCcpIC9Nb2REYXRlKEQ6MjAxOTAzMDQxNTQ1NTgrMDEnMDAnKSAv' +
		    		'UHJvZHVjZXIo/v8ATQBpAGMAcgBvAHMAbwBmAHQArgAgAFcAbwByAGQAIABwAGUAcgAgAE8AZgBm' +
		    		'AGkAYwBlACAAMwA2ADUpID4+DQplbmRvYmoNCjE5IDAgb2JqDQo8PC9UeXBlL09ialN0bS9OIDkv' +
		    		'Rmlyc3QgNjAvRmlsdGVyL0ZsYXRlRGVjb2RlL0xlbmd0aCAzMjY+Pg0Kc3RyZWFtDQp4nI1SUWvC' +
		    		'MBB+F/wP9w/SpK1OEGFMZUMspRX2ID7E9laLbSIxBf33y60VM9jDICT33d33JXcXPoUARAAxBz4B' +
		    		'Hgjgbk1C4CGIOAIeQTQLgMcQCxd4gTicguAQRzOYz1lKrAAylrOU7e4XZLk1XWFXDbZss4fgACyt' +
		    		'IKScxWI8+j9l9psiBspSF12Lyv7F5FRLRtW44wAD2UvcGcRMa8sy3eBWXqhIkk2lcZIUpXrJQ2qT' +
		    		'XsaLJnizG7yDGKTXTktpiyyhbaXKJ9i51KO+sRwLy95Rlmh6mzgP+0M1tcL8JOmF5HhVTkHaWqsB' +
		    		'G1t/SWf8oE9tzketz88mkOd6QrT0SMu2sjDaw28nt3t4WctGV54jb+oSvdz+HpdWGdmydV11Boda' +
		    		'k669uuHQF6Amc/oEfpsT2eJ138PHKA5A9mMe49E33eG34g0KZW5kc3RyZWFtDQplbmRvYmoNCjIy' +
		    		'IDAgb2JqDQpbIDIyNiAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAw' +
		    		'IDAgMCAwIDAgMCAwIDAgMCAwIDAgNTc5IDU0NCA1MzMgNjE1XSANCmVuZG9iag0KMjMgMCBvYmoN' +
		    		'Cjw8L0ZpbHRlci9GbGF0ZURlY29kZS9MZW5ndGggMjE5MzgvTGVuZ3RoMSA4NDM4MD4+DQpzdHJl' +
		    		'YW0NCnic7H0HfFRV2v45985kJlOSmTSSTJKZMKTAJAQIgVAzkAIBKYEMTAKBhFQwdBBEwCgKGkVx' +
		    		'7Q2xF1AnA0jAhoq9K2tvuK66q1h2rSDJ95z7zqH91e/b8q2fv/+8yTPPc95T7rnnnvPeN2vYMM4Y' +
		    		's+FDx2pLR5dU3r/hsY8Zz3YxpraUjj6l+KoPp5cznrGJMWXTpKl5A65+pGYnY/w89Kqtn1+3SP+a' +
		    		'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' +
		    		'Q4rXpXhNij9KsV+KV6V4RYqXpXhJiheleEGK56V4TopnpXhGiqeleEqKJ6V4QorHpdgnxWNSPCrF' +
		    		'I1LsleJhKR6S4kEpHpDifin2SLFbik4pdklxnxQ7pdghxXYpglJ0SBGQ4l4p7pHibim2SbFViruk' +
		    		'uFOKO6S4XYrbpLhVilukuFmKm6S4UYotUtwgxWYprpfiOimuleIaKa6W4ioprpTiCikul+IyKS6V' +
		    		'4g9SXCLFJikuluIiKTZKcaEUF0jRLsX5UpwnxQYp1ktxrhQy7eEy7eEy7eEy7eEy7eEy7eEy7eEy' +
		    		'7eEy7eEy7eEy7eEy7eEy7eEy7eEy7eEy7eEy7eEy7eFLpJD5D5f5D5f5D5f5D5f5D5f5D5f5D5f5' +
		    		'D5f5D5f5D5f5D5f5D5f5D5f5D5f5D5f5D5f5D5f5D5f5D5f5D5f5D5f5D5f5D5f5D5f5D5f5D5f5' +
		    		'D5f5D5f5D5f5D5f5D5f5D5dpD5dpD5dpD5fZDpfZDpfZDpfZDpfZDpfZDpfZDpfZDpfZDi/eLkSn' +
		    		'ck4wbaQTOXMwLR50NpXOCqYNBbVR6UyitcE0C2gNlVYTnUG0iuj0YOoo0MpgajFoBdFpRMupbhmV' +
		    		'lhItIefiYOpo0CKihUQLqMl8olaiU4MppaB5RHOJWoiaiZqCKSWgRio1ENUTzSGqI6olmk00i/rV' +
		    		'UGkm0QyiaqIqIj/RdKJpRD6iSqKpRFOIKogmE00imkg0gegUovFE44KOclA50digYxxoDFFZ0DEe' +
		    		'VBp0nAIqISomGk11o6ifl6iI+o0kGkE0nFoOIxpK3YcQFRINJhpEVECDDSTKp1EGEPUn6keD5RH1' +
		    		'pX65RDlEHqI+RL2JsomyaOhMogwasxeRm6gnDZ1O5KJ+TqI0olSiFCIHUXIweSIoiSgxmDwJ1IMo' +
		    		'gZzxRHHkjCWKIbJTnY0ompxRRFYiC9WZiUxEkVRnJDIQRQSTJoP0waQKkI5IJadCJU7ENOLdRF1a' +
		    		'E36ESj8RHSY6RHU/UukHou+JviP6NphYCfommDgV9Hcq/Y3oa6KvqO5LKn1BdJDoc6r7jOiv5PwL' +
		    		'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' +
		    		'bcCZwFpgDbAaOANYBZwOrARWAKcBy4FlwFJgMbAIWAgsAOYDrcCpwDxgLtACNANNQCPQANQDc4A6' +
		    		'oBaYDcwCaoCZwAygGqgC/MB0YBrgAyqBqcAUoAKYDEwCJgITgFOA8cA4oBwYC4wByoBSoAQoBkYD' +
		    		'owAvUASMBEYAw4FhwFBgCFAIDAYGAQXAQCAfGAD0B/oBeUBfIBfIATxAH6A3kA1kAZlABtALcAM9' +
		    		'gXTABTiBNCAVSAEcQDKQBCQCPYAEIB6IA2KBGMAO2IBoIAqwAhbADJiASMAIGIAIQA/oRnXjUwUU' +
		    		'gAOMNXD4eBdwBPgJOAwcAn4EfgC+B74DvgW+Af4O/A34GvgK+BL4AjgIfA58BvwV+AvwKfAJ8DHw' +
		    		'Z+Aj4E/Ah8AB4APgfeA94F3gHeBt4C3gTeAN4HXgNeCPwH7gVeAV4GXgJeBF4AXgeeA54FngGeBp' +
		    		'4CngSeAJ4HFgH/AY8CjwCLAXeBh4CHgQeAC4H9gD7AY6gV3AfcBOYAewHQgCHUAAuBe4B7gb2AZs' +
		    		'Be4C7gTuAG4HbgNuBW4BbgZuAm4EtgA3AJuB64HrgGuBa4CrgauAK4ErgMuBy4BLgT8AlwCbgIuB' +
		    		'i4CNwIXABUA7cD5wHrABWA+cyxpGtXGcf47zz3H+Oc4/x/nnOP8c55/j/HOcf47zz3H+Oc4/x/nn' +
		    		'OP8c55/j/HOcf47zz5cAiAEcMYAjBnDEAI4YwBEDOGIARwzgiAEcMYAjBnDEAI4YwBEDOGIARwzg' +
		    		'iAEcMYAjBnDEAI4YwBEDOGIARwzgiAEcMYAjBnDEAI4YwBEDOGIARwzgOP8c55/j/HOcfY6zz3H2' +
		    		'Oc4+x9nnOPscZ5/j7HOcfY6z/1vH4d+5Vf3WE/idG1u69LjETFji7FmMMcNmxrouPeFfjkxm89hS' +
		    		'1oav9Wwju5Q9zN5mc9g6qKvZFnYbu5MF2CPsafb6P/tPZH7Ouk7Xz2cWdReLYLGMdR/qPth1G9Cp' +
		    		'jzrOcylKsTrXMU+3rfuLk3xfdF3abevqjIhhJq2vVXkF3r/zI92H8MpFuXuQKCsboKO1Hl8bNnfd' +
		    		'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' +
		    		'Y9IQT3h490yGJ5hUgKEHvMb4Rih+u7KfPxL8w8UiUS20TcrxjMLLC+9Xhr2HX5ET4/NilobqNVxd' +
		    		'17wqHeR62EkdpGGF0b66WUh6TnGXRJX7TY4lt3XHTEJONIS+VwPVDfTqhfHrx8xYj6VdSQkUJlh6' +
		    		'SrEU+xsrIHKMOxZzSn2uDa9mpr5Z03zTuNAXBmsQEzVrXAiwxXkMrvAl+YSxrktCI6tSWCzO1ivZ' +
		    		'u2UN9/uu/HqqSUliMC46qjPIftVNo06N4Zjn8BssntvjIaJ1GNH0BBGXpvXWNwIE+iclZT9DDQpl' +
		    		'bmRzdHJlYW0NCmVuZG9iag0KMjQgMCBvYmoNCjw8L1R5cGUvTWV0YWRhdGEvU3VidHlwZS9YTUwv' +
		    		'TGVuZ3RoIDMwODM+Pg0Kc3RyZWFtDQo8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENl' +
		    		'aGlIenJlU3pOVGN6a2M5ZCI/Pjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6' +
		    		'eG1wdGs9IjMuMS03MDEiPgo8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5' +
		    		'OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgo8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiAg' +
		    		'eG1sbnM6cGRmPSJodHRwOi8vbnMuYWRvYmUuY29tL3BkZi8xLjMvIj4KPHBkZjpQcm9kdWNlcj5N' +
		    		'aWNyb3NvZnTCriBXb3JkIHBlciBPZmZpY2UgMzY1PC9wZGY6UHJvZHVjZXI+PC9yZGY6RGVzY3Jp' +
		    		'cHRpb24+CjxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiICB4bWxuczpkYz0iaHR0cDovL3B1' +
		    		'cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iPgo8ZGM6Y3JlYXRvcj48cmRmOlNlcT48cmRmOmxpPk1h' +
		    		'bnVlbCBCZWxsZXQ8L3JkZjpsaT48L3JkZjpTZXE+PC9kYzpjcmVhdG9yPjwvcmRmOkRlc2NyaXB0' +
		    		'aW9uPgo8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiAgeG1sbnM6eG1wPSJodHRwOi8vbnMu' +
		    		'YWRvYmUuY29tL3hhcC8xLjAvIj4KPHhtcDpDcmVhdG9yVG9vbD5NaWNyb3NvZnTCriBXb3JkIHBl' +
		    		'ciBPZmZpY2UgMzY1PC94bXA6Q3JlYXRvclRvb2w+PHhtcDpDcmVhdGVEYXRlPjIwMTktMDMtMDRU' +
		    		'MTU6NDU6NTgrMDE6MDA8L3htcDpDcmVhdGVEYXRlPjx4bXA6TW9kaWZ5RGF0ZT4yMDE5LTAzLTA0' +
		    		'VDE1OjQ1OjU4KzAxOjAwPC94bXA6TW9kaWZ5RGF0ZT48L3JkZjpEZXNjcmlwdGlvbj4KPHJkZjpE' +
		    		'ZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29t' +
		    		'L3hhcC8xLjAvbW0vIj4KPHhtcE1NOkRvY3VtZW50SUQ+dXVpZDoyODNFRUMxNC01MzNDLTQ4OEQt' +
		    		'OUQ0Ni0wQzhCNERGNTZDRTQ8L3htcE1NOkRvY3VtZW50SUQ+PHhtcE1NOkluc3RhbmNlSUQ+dXVp' +
		    		'ZDoyODNFRUMxNC01MzNDLTQ4OEQtOUQ0Ni0wQzhCNERGNTZDRTQ8L3htcE1NOkluc3RhbmNlSUQ+' +
		    		'PC9yZGY6RGVzY3JpcHRpb24+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg' +
		    		'ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg' +
		    		'ICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg' +
		    		'ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAg' +
		    		'ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg' +
		    		'ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAg' +
		    		'ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg' +
		    		'ICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg' +
		    		'ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg' +
		    		'ICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg' +
		    		'ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAg' +
		    		'ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg' +
		    		'ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAg' +
		    		'ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg' +
		    		'ICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAg' +
		    		'ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg' +
		    		'ICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg' +
		    		'ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg' +
		    		'ICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg' +
		    		'ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAg' +
		    		'ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg' +
		    		'ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAg' +
		    		'ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg' +
		    		'ICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg' +
		    		'ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg' +
		    		'ICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg' +
		    		'ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAg' +
		    		'ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg' +
		    		'ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAg' +
		    		'ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg' +
		    		'ICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg' +
		    		'ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg' +
		    		'ICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg' +
		    		'ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAK' +
		    		'ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg' +
		    		'ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8L3JkZjpSREY+PC94' +
		    		'OnhtcG1ldGE+PD94cGFja2V0IGVuZD0idyI/Pg0KZW5kc3RyZWFtDQplbmRvYmoNCjI1IDAgb2Jq' +
		    		'DQo8PC9EaXNwbGF5RG9jVGl0bGUgdHJ1ZT4+DQplbmRvYmoNCjI2IDAgb2JqDQo8PC9UeXBlL1hS' +
		    		'ZWYvU2l6ZSAyNi9XWyAxIDQgMl0gL1Jvb3QgMSAwIFIvSW5mbyAxMSAwIFIvSURbPDE0RUMzRTI4' +
		    		'M0M1MzhENDg5RDQ2MEM4QjRERjU2Q0U0PjwxNEVDM0UyODNDNTM4RDQ4OUQ0NjBDOEI0REY1NkNF' +
		    		'ND5dIC9GaWx0ZXIvRmxhdGVEZWNvZGUvTGVuZ3RoIDEwMj4+DQpzdHJlYW0NCnicY2AAgv//GYGk' +
		    		'IAMDiFoGoZ6AKcaPYIrFDUK9BVOsd8AUG0QDG0SOPQRMcWQzMDABtQszMEMoFgjFCqHYIBQThIKq' +
		    		'ZAfq4yyD8RghFAdQkFsBbCZ3N5hKnAGmcr8xMAAA/aMMZg0KZW5kc3RyZWFtDQplbmRvYmoNCnhy' +
		    		'ZWYNCjAgMjcNCjAwMDAwMDAwMTIgNjU1MzUgZg0KMDAwMDAwMDAxNyAwMDAwMCBuDQowMDAwMDAw' +
		    		'MTY2IDAwMDAwIG4NCjAwMDAwMDAyMjggMDAwMDAgbg0KMDAwMDAwMDQ5NyAwMDAwMCBuDQowMDAw' +
		    		'MDAxMDk0IDAwMDAwIG4NCjAwMDAwMDEyNjEgMDAwMDAgbg0KMDAwMDAwMTUwMCAwMDAwMCBuDQow' +
		    		'MDAwMDAxNTUzIDAwMDAwIG4NCjAwMDAwMDE2MDYgMDAwMDAgbg0KMDAwMDAwMTg3NiAwMDAwMCBu' +
		    		'DQowMDAwMDAyMTU1IDAwMDAwIG4NCjAwMDAwMDAwMTMgNjU1MzUgZg0KMDAwMDAwMDAxNCA2NTUz' +
		    		'NSBmDQowMDAwMDAwMDE1IDY1NTM1IGYNCjAwMDAwMDAwMTYgNjU1MzUgZg0KMDAwMDAwMDAxNyA2' +
		    		'NTUzNSBmDQowMDAwMDAwMDE4IDY1NTM1IGYNCjAwMDAwMDAwMTkgNjU1MzUgZg0KMDAwMDAwMDAy' +
		    		'MCA2NTUzNSBmDQowMDAwMDAwMDIxIDY1NTM1IGYNCjAwMDAwMDAwMDAgNjU1MzUgZg0KMDAwMDAw' +
		    		'Mjg0OCAwMDAwMCBuDQowMDAwMDAyOTU1IDAwMDAwIG4NCjAwMDAwMjQ5ODQgMDAwMDAgbg0KMDAw' +
		    		'MDAyODE1MCAwMDAwMCBuDQowMDAwMDI4MTk1IDAwMDAwIG4NCnRyYWlsZXINCjw8L1NpemUgMjcv' +
		    		'Um9vdCAxIDAgUi9JbmZvIDExIDAgUi9JRFs8MTRFQzNFMjgzQzUzOEQ0ODlENDYwQzhCNERGNTZD' +
		    		'RTQ+PDE0RUMzRTI4M0M1MzhENDg5RDQ2MEM4QjRERjU2Q0U0Pl0gPj4NCnN0YXJ0eHJlZg0KMjg0' +
		    		'OTgNCiUlRU9GDQp4cmVmDQowIDANCnRyYWlsZXINCjw8L1NpemUgMjcvUm9vdCAxIDAgUi9JbmZv' +
		    		'IDExIDAgUi9JRFs8MTRFQzNFMjgzQzUzOEQ0ODlENDYwQzhCNERGNTZDRTQ+PDE0RUMzRTI4M0M1' +
		    		'MzhENDg5RDQ2MEM4QjRERjU2Q0U0Pl0gL1ByZXYgMjg0OTgvWFJlZlN0bSAyODE5NT4+DQpzdGFy' +
		    		'dHhyZWYNCjI5MTk1DQolJUVPRg=='
			    
			  ),

			previousPage: function() {
				this.pageNum--;
				this._renderPage(this.pageNum,this.pdfData);
			},
			
			nextPage: function() {
				this.pageNum++;
				this._renderPage(this.pageNum,this.pdfData);
				},
				
			onBack: function() {
				sap.ui.getCore().byId('pdf').to("main");
			},
			
			zoomIn: function() {
				this.scale = this.scale + this.step;
				this._renderPage(this.pageNum,this.pdfData);
			},
			
			zoomOut: function() {
				this.scale = this.scale - this.step;
				this._renderPage(this.pageNum,this.pdfData);
				},			
			
		/**
		* Called when a controller is instantiated and its View controls (if available) are already created.
		* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		* @memberOf pdfviewer.main
		*/
			onInit: function() {				

		   },
	
		/**
		* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		* (NOT before the first rendering! onInit() is used for that one!).
		* @memberOf pdfviewer.main
		*/
		//	onBeforeRendering: function() {
		//
		//	},
		
		/**
		* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		* This hook is the same one that SAPUI5 controls get after being rendered.
		* @memberOf pdfviewer.main
		*/
			onAfterRendering: function() {			
				this._renderPage(this.pageNum,this.pdfData);
			},
	
		/**
		* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		* @memberOf pdfviewer.main
		*/
		//	onExit: function() {
		//
		//	}
			
			_getScrollBarWidth: function() {
				  var inner = document.createElement('p');
				  inner.style.width = "100%";
				  inner.style.height = "200px";
				  var outer = document.createElement('div');
				  outer.style.position = "absolute";
				  outer.style.top = "0px";
				  outer.style.left = "0px";
				  outer.style.visibility = "hidden";
				  outer.style.width = "200px";
				  outer.style.height = "150px";
				  outer.style.overflow = "hidden";
				  outer.appendChild (inner);
				  document.body.appendChild (outer);
				  var w1 = inner.offsetWidth;
				  outer.style.overflow = 'scroll';
				  var w2 = inner.offsetWidth;
				  if (w1 == w2) w2 = outer.clientWidth;
				  document.body.removeChild (outer);
				  return (w1-w2);
				},
				
			_renderPage: function(pageNum,pdfData) {
					  var self = this;
					  //
					  // The workerSrc property shall be specified.
					  //
					  pdfjsLib.GlobalWorkerOptions.workerSrc =
					    '../PDFViewer/pdfjs/build/pdf.worker.js';
					  // Opening PDF by passing its binary data as a string. It is still preferable
					  // to use Uint8Array, but string or array-like structure will work too.
					  var loadingTask = pdfjsLib.getDocument({ data: pdfData });
					  loadingTask.promise.then(function(pdf) {
						// set total
						self.totalPages = pdf.numPages;
						// buttons
						if (self.pageNum == self.totalPages) {
							self.getView().byId('next').setEnabled(false);
							self.getView().byId('prev').setEnabled(true);
						}

						else if (self.pageNum == 1) {
							self.getView().byId('next').setEnabled(true);
							self.getView().byId('prev').setEnabled(false);					
						}		
						
						else
						{
							self.getView().byId('next').setEnabled(true);
							self.getView().byId('prev').setEnabled(true);					
						}						
					    // Fetch the first page.
					    pdf.getPage(pageNum).then(function(page) {
					      // get screen relevant dimensions
					      var realToCSSPixels = window.devicePixelRatio;
					      var viewport = page.getViewport(1);    
					      var displayWidth  = Math.floor($(window).width()*realToCSSPixels);  
					      var displayHeight = Math.floor($(window).height()*realToCSSPixels); 
					      var sbWidth = self._getScrollBarWidth();	
					      // prepare canvas using pdf page dimensions
					      var div = document.getElementById('div-pdf');
					      var canvas = document.getElementById('the-canvas');
					      var context = canvas.getContext('2d');
					      canvas.height = Math.floor(viewport.height*self.scale);
					      canvas.width = Math.floor(viewport.width*self.scale );  
					      if (canvas.width<displayWidth) { 
					    	  self.getView().byId('small').setEnabled(false);
					    	  self.scale = self.scale * (displayWidth/canvas.width) 
						      canvas.height = Math.floor(viewport.height*self.scale);
						      canvas.width = displayWidth;  
					      }
					      else
					    	  { self.getView().byId('small').setEnabled(true); 
					      }
					      if (div.scrollHeight>canvas.height) {
					    	  self.scale = self.scale * ((canvas.width-sbWidth)/canvas.width) 
						      canvas.height = Math.floor(viewport.height*self.scale);
						      canvas.width = (canvas.width-sbWidth); 	    	  
					      }
					      canvas.style.width = canvas.width + "px";
					      canvas.style.height = canvas.height + "px";
					      context.scale(self.scale,self.scale);       
					      // adjust
					      if (canvas.width > displayWidth) {
						    // Make the canvas the same size
					    	div.style.overflow = 'scroll';
					    	div.style.maxWidth = displayWidth + "px";
						  }
					      // Render PDF page into canvas context.
					      var renderContext = {
					        canvasContext: context,
					        viewport: viewport,
					      };
					      page.render(renderContext);
					    });
					  });
					  }			
	
	});
		
});