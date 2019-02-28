sap.ui.define(["sap/ui/core/mvc/Controller", "pdfviewer/formatter"], 
		
	function (Controller,formatter) {
	
		"use strict";
		
		return Controller.extend("pdfviewer.base64", { 
			
			formatter: formatter,
			
			pageNum: 1,
			
			totalPages: 0,
			
		    pdfData: atob(

					  'JVBERi0xLjcNCiW1tbW1DQoxIDAgb2JqDQo8PC9UeXBlL0NhdGFsb2cvUGFnZXMgMiAwIFIvTGFu' +
					  'ZyhpdC1JVCkgL1N0cnVjdFRyZWVSb290IDEyIDAgUi9NYXJrSW5mbzw8L01hcmtlZCB0cnVlPj4v' +
					  'TWV0YWRhdGEgMjUgMCBSL1ZpZXdlclByZWZlcmVuY2VzIDI2IDAgUj4+DQplbmRvYmoNCjIgMCBv' +
					  'YmoNCjw8L1R5cGUvUGFnZXMvQ291bnQgMi9LaWRzWyAzIDAgUiA5IDAgUl0gPj4NCmVuZG9iag0K' +
					  'MyAwIG9iag0KPDwvVHlwZS9QYWdlL1BhcmVudCAyIDAgUi9SZXNvdXJjZXM8PC9Gb250PDwvRjEg' +
					  'NSAwIFI+Pi9FeHRHU3RhdGU8PC9HUzcgNyAwIFIvR1M4IDggMCBSPj4vUHJvY1NldFsvUERGL1Rl' +
					  'eHQvSW1hZ2VCL0ltYWdlQy9JbWFnZUldID4+L01lZGlhQm94WyAwIDAgNTk1LjMyIDg0MS45Ml0g' +
					  'L0NvbnRlbnRzIDQgMCBSL0dyb3VwPDwvVHlwZS9Hcm91cC9TL1RyYW5zcGFyZW5jeS9DUy9EZXZp' +
					  'Y2VSR0I+Pi9UYWJzL1MvU3RydWN0UGFyZW50cyAwPj4NCmVuZG9iag0KNCAwIG9iag0KPDwvRmls' +
					  'dGVyL0ZsYXRlRGVjb2RlL0xlbmd0aCAxOTM+Pg0Kc3RyZWFtDQp4nK2QTQuCQBiE7wv7H+aoQeu+' +
					  'fqy7IIJfiUFhJHSIjuWpoPr/0Coe8lQH39vA8M4zA69Fkni7oikh0xR5WeDJmRRyOK1jgkRkIhH4' +
					  '0CEJ4+N15ey0woOzvOPM2xCIhAzR3Tgb3BKESAkVIlZSKIXubm31MUb/tp/Rj0pPqubs7LTuOnSy' +
					  '2g2cZu/GTgZyL+i2nFU24cDZAkTGCKNnSCPJBIB5HqpdAXxNQ4tPE2hBvzAWSPOl7Wv+ixtbfwBJ' +
					  'P2QQDQplbmRzdHJlYW0NCmVuZG9iag0KNSAwIG9iag0KPDwvVHlwZS9Gb250L1N1YnR5cGUvVHJ1' +
					  'ZVR5cGUvTmFtZS9GMS9CYXNlRm9udC9CQ0RFRUUrQ2FsaWJyaS9FbmNvZGluZy9XaW5BbnNpRW5j' +
					  'b2RpbmcvRm9udERlc2NyaXB0b3IgNiAwIFIvRmlyc3RDaGFyIDMyL0xhc3RDaGFyIDgwL1dpZHRo' +
					  'cyAyMyAwIFI+Pg0KZW5kb2JqDQo2IDAgb2JqDQo8PC9UeXBlL0ZvbnREZXNjcmlwdG9yL0ZvbnRO' +
					  'YW1lL0JDREVFRStDYWxpYnJpL0ZsYWdzIDMyL0l0YWxpY0FuZ2xlIDAvQXNjZW50IDc1MC9EZXNj' +
					  'ZW50IC0yNTAvQ2FwSGVpZ2h0IDc1MC9BdmdXaWR0aCA1MjEvTWF4V2lkdGggMTc0My9Gb250V2Vp' +
					  'Z2h0IDQwMC9YSGVpZ2h0IDI1MC9TdGVtViA1Mi9Gb250QkJveFsgLTUwMyAtMjUwIDEyNDAgNzUw' +
					  'XSAvRm9udEZpbGUyIDI0IDAgUj4+DQplbmRvYmoNCjcgMCBvYmoNCjw8L1R5cGUvRXh0R1N0YXRl' +
					  'L0JNL05vcm1hbC9jYSAxPj4NCmVuZG9iag0KOCAwIG9iag0KPDwvVHlwZS9FeHRHU3RhdGUvQk0v' +
					  'Tm9ybWFsL0NBIDE+Pg0KZW5kb2JqDQo5IDAgb2JqDQo8PC9UeXBlL1BhZ2UvUGFyZW50IDIgMCBS' +
					  'L1Jlc291cmNlczw8L0ZvbnQ8PC9GMSA1IDAgUj4+L0V4dEdTdGF0ZTw8L0dTNyA3IDAgUi9HUzgg' +
					  'OCAwIFI+Pi9Qcm9jU2V0Wy9QREYvVGV4dC9JbWFnZUIvSW1hZ2VDL0ltYWdlSV0gPj4vTWVkaWFC' +
					  'b3hbIDAgMCA1OTUuMzIgODQxLjkyXSAvQ29udGVudHMgMTAgMCBSL0dyb3VwPDwvVHlwZS9Hcm91' +
					  'cC9TL1RyYW5zcGFyZW5jeS9DUy9EZXZpY2VSR0I+Pi9UYWJzL1MvU3RydWN0UGFyZW50cyAxPj4N' +
					  'CmVuZG9iag0KMTAgMCBvYmoNCjw8L0ZpbHRlci9GbGF0ZURlY29kZS9MZW5ndGggMTY3Pj4NCnN0' +
					  'cmVhbQ0KeJytjr0KwjAAhPdA3uHGRDBN2jQ/UAr9s1RQKgYcxFE7KajvD7alS3dv++C4+xD1yLLo' +
					  'UHU1ZJ6jrCu8KZFCTnHOKkikPhVJDKeV8DE+d0ouG7woKQMl0U5BKSE1woOSqS2hkBphNKyRwhiE' +
					  '51hrzxbDd1zGMJNbqKXkynq+1axoecK6I7esQMxvCHtKmvHhRMkfjLwX3q2UZpNFAOs/NIcKP6FQ' +
					  'NisNCmVuZHN0cmVhbQ0KZW5kb2JqDQoxMSAwIG9iag0KPDwvQXV0aG9yKE1hbnVlbCBCZWxsZXQp' +
					  'IC9DcmVhdG9yKP7/AE0AaQBjAHIAbwBzAG8AZgB0AK4AIABXAG8AcgBkACAAcABlAHIAIABPAGYA' +
					  'ZgBpAGMAZQAgADMANgA1KSAvQ3JlYXRpb25EYXRlKEQ6MjAxOTAyMjgxNjA0MjErMDEnMDAnKSAv' +
					  'TW9kRGF0ZShEOjIwMTkwMjI4MTYwNDIxKzAxJzAwJykgL1Byb2R1Y2VyKP7/AE0AaQBjAHIAbwBz' +
					  'AG8AZgB0AK4AIABXAG8AcgBkACAAcABlAHIAIABPAGYAZgBpAGMAZQAgADMANgA1KSA+Pg0KZW5k' +
					  'b2JqDQoxOSAwIG9iag0KPDwvVHlwZS9PYmpTdG0vTiAxMC9GaXJzdCA2Ny9GaWx0ZXIvRmxhdGVE' +
					  'ZWNvZGUvTGVuZ3RoIDMzNj4+DQpzdHJlYW0NCniclVLBisIwEL0L/sP8QZrUugoiLKuyi1hKK+xB' +
					  'PMQ6W4ttIjEF/fvN2Ipx2cPuJZk3M+9N8hL+AgGIACIOggMPBPAh8CgELkBQJoTQhXwA0WDkChCN' +
					  'AuAjiMaRq8PQFSYTlhArgJRlLGHr6wlZZk2T23mFNVtuINgCSwoIqWc67ff+QOH/p3RTxs8U0VFm' +
					  'Om9qVPbXYeRCSj7cNk7bFjoNr39tEFOtLUt1hSt5IntIPZHGKVOVnKIMiQ5bGa8a48Uu8Qqik144' +
					  'LaUtspiWudo/wNq17vSFZZhb9o5yj6aNiXOPP1RVKswOkk5IiVflFKQtteqwseWXdMENfWpz3Gl9' +
					  'fHhBmfMB0dIhLVvJ3GgPvx3c6uFZKStdeImsKvfo9bZzXFthZM0WZdEY7O4aN/XZvRF9HjKZ0/fx' +
					  'bY5ljedNC3+8yBYodX+Wfu8bhRHJHw0KZW5kc3RyZWFtDQplbmRvYmoNCjIzIDAgb2JqDQpbIDIy' +
					  'NiAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDUwNyA1MDcgMCAwIDAgMCAwIDAgMCAw' +
					  'IDAgMCAwIDAgMCAwIDU3OSAwIDAgMCAwIDAgNjMxIDAgMjUyIDAgMCAwIDAgNjQ2IDAgNTE3XSAN' +
					  'CmVuZG9iag0KMjQgMCBvYmoNCjw8L0ZpbHRlci9GbGF0ZURlY29kZS9MZW5ndGggMjUyODgvTGVu' +
					  'Z3RoMSA5MDEzNj4+DQpzdHJlYW0NCnic7H0HeJRV2vY57zstU5KZZCaZZJLMJEMSIIHQCUUykEIv' +
					  'AQYSIJCQQsBQpEjH2EAjKK69rGIvWCYDSrBi79hYda2467ruCqirWBCY/z7vMwcCn7L7f5/fuv7/' +
					  'PMk9932ec87znnPe03IZDOOMMTs+dKymbFjp5HcDp7sYH3yYMb2pbNiYkh8/W1nD+IBvGFNN4ycV' +
					  '9rrmieoHGOMXoFZN3fzaRXX3113K2NwVyL+17sylvp2L3unL2I19UP+RxkVz5q/7UO3P2Px0xmz5' +
					  'c5pXNl4/46xLGLv1S8YKL29qqK3/7tLvHkU8K+L1a4LDdm/6fqRLke7UNH/piuf3uHsi/Rljcy5u' +
					  'XlhXO+baqa8ztuc8xvoUza9dsajgcM4HyG9Ced/8hqW179+SPp7xYTrRvgW18xsufPLp/oybHmGs' +
					  'p2vRwiVLIx62Hv3ZI8ovWtywKGlOdipjq0bgcZ8zMRaGvk/169bcPCth8EGWamLCHv58zcuC39p0' +
					  'aNWPh460xO0z9UMyjimMDPUM7CjjT5u3/Hjo0Ja4fVqkDpZ6j/CkeVgLs7MA6ingQraBscR+2nM5' +
					  'U3X5fDPTM5P+Gn1vhMwkVl9j6xVmYkqCXlEUnaro9rKukV2s02qtBbCxk3w+xGQ5L1MbjDcouT7G' +
					  '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' +
					  '49Ow3dEjb/Dh/sUjppTtEv3J8XFdoY5LHpr16nQ7vAfnwiLZvbrF2gfFKI/FknO03++PhUD+B+BV' +
					  '2gwNCmVuZHN0cmVhbQ0KZW5kb2JqDQoyNSAwIG9iag0KPDwvVHlwZS9NZXRhZGF0YS9TdWJ0eXBl' +
					  'L1hNTC9MZW5ndGggMzA4Mz4+DQpzdHJlYW0NCjw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVN' +
					  'ME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+PHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRh' +
					  'LyIgeDp4bXB0az0iMy4xLTcwMSI+CjxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5v' +
					  'cmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CjxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0' +
					  'PSIiICB4bWxuczpwZGY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGRmLzEuMy8iPgo8cGRmOlByb2R1' +
					  'Y2VyPk1pY3Jvc29mdMKuIFdvcmQgcGVyIE9mZmljZSAzNjU8L3BkZjpQcm9kdWNlcj48L3JkZjpE' +
					  'ZXNjcmlwdGlvbj4KPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgIHhtbG5zOmRjPSJodHRw' +
					  'Oi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+CjxkYzpjcmVhdG9yPjxyZGY6U2VxPjxyZGY6' +
					  'bGk+TWFudWVsIEJlbGxldDwvcmRmOmxpPjwvcmRmOlNlcT48L2RjOmNyZWF0b3I+PC9yZGY6RGVz' +
					  'Y3JpcHRpb24+CjxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiICB4bWxuczp4bXA9Imh0dHA6' +
					  'Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iPgo8eG1wOkNyZWF0b3JUb29sPk1pY3Jvc29mdMKuIFdv' +
					  'cmQgcGVyIE9mZmljZSAzNjU8L3htcDpDcmVhdG9yVG9vbD48eG1wOkNyZWF0ZURhdGU+MjAxOS0w' +
					  'Mi0yOFQxNjowNDoyMSswMTowMDwveG1wOkNyZWF0ZURhdGU+PHhtcDpNb2RpZnlEYXRlPjIwMTkt' +
					  'MDItMjhUMTY6MDQ6MjErMDE6MDA8L3htcDpNb2RpZnlEYXRlPjwvcmRmOkRlc2NyaXB0aW9uPgo8' +
					  'cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9i' +
					  'ZS5jb20veGFwLzEuMC9tbS8iPgo8eG1wTU06RG9jdW1lbnRJRD51dWlkOkJEODgwRkE5LUZCRTIt' +
					  'NEVEMS05MTlDLTczMEM3RTQ2OTY3QzwveG1wTU06RG9jdW1lbnRJRD48eG1wTU06SW5zdGFuY2VJ' +
					  'RD51dWlkOkJEODgwRkE5LUZCRTItNEVEMS05MTlDLTczMEM3RTQ2OTY3QzwveG1wTU06SW5zdGFu' +
					  'Y2VJRD48L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg' +
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
					  'ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAg' +
					  'ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg' +
					  'ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAg' +
					  'ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg' +
					  'ICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg' +
					  'ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg' +
					  'ICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg' +
					  'ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCjwvcmRmOlJE' +
					  'Rj48L3g6eG1wbWV0YT48P3hwYWNrZXQgZW5kPSJ3Ij8+DQplbmRzdHJlYW0NCmVuZG9iag0KMjYg' +
					  'MCBvYmoNCjw8L0Rpc3BsYXlEb2NUaXRsZSB0cnVlPj4NCmVuZG9iag0KMjcgMCBvYmoNCjw8L1R5' +
					  'cGUvWFJlZi9TaXplIDI3L1dbIDEgNCAyXSAvUm9vdCAxIDAgUi9JbmZvIDExIDAgUi9JRFs8QTkw' +
					  'Rjg4QkRFMkZCRDE0RTkxOUM3MzBDN0U0Njk2N0M+PEE5MEY4OEJERTJGQkQxNEU5MTlDNzMwQzdF' +
					  'NDY5NjdDPl0gL0ZpbHRlci9GbGF0ZURlY29kZS9MZW5ndGggMTAwPj4NCnN0cmVhbQ0KeJw1zcsN' +
					  'QEAQBuDZh7UrLqIovWyiAHVoQZThrBAVuLPG/zOH+TKZl4hGKUZzJ/KykgOYE9gLuAX4meyEvdCS' +
					  'W6d1vRdPKhJITRz5JqPuxfRXhliStJc2nG4GMGYw6fcHHSUN/Q0KZW5kc3RyZWFtDQplbmRvYmoN' +
					  'CnhyZWYNCjAgMjgNCjAwMDAwMDAwMTIgNjU1MzUgZg0KMDAwMDAwMDAxNyAwMDAwMCBuDQowMDAw' +
					  'MDAwMTY2IDAwMDAwIG4NCjAwMDAwMDAyMjggMDAwMDAgbg0KMDAwMDAwMDQ5OCAwMDAwMCBuDQow' +
					  'MDAwMDAwNzY1IDAwMDAwIG4NCjAwMDAwMDA5MzIgMDAwMDAgbg0KMDAwMDAwMTE3MSAwMDAwMCBu' +
					  'DQowMDAwMDAxMjI0IDAwMDAwIG4NCjAwMDAwMDEyNzcgMDAwMDAgbg0KMDAwMDAwMTU0OCAwMDAw' +
					  'MCBuDQowMDAwMDAxNzkwIDAwMDAwIG4NCjAwMDAwMDAwMTMgNjU1MzUgZg0KMDAwMDAwMDAxNCA2' +
					  'NTUzNSBmDQowMDAwMDAwMDE1IDY1NTM1IGYNCjAwMDAwMDAwMTYgNjU1MzUgZg0KMDAwMDAwMDAx' +
					  'NyA2NTUzNSBmDQowMDAwMDAwMDE4IDY1NTM1IGYNCjAwMDAwMDAwMTkgNjU1MzUgZg0KMDAwMDAw' +
					  'MDAyMCA2NTUzNSBmDQowMDAwMDAwMDIxIDY1NTM1IGYNCjAwMDAwMDAwMjIgNjU1MzUgZg0KMDAw' +
					  'MDAwMDAwMCA2NTUzNSBmDQowMDAwMDAyNDk0IDAwMDAwIG4NCjAwMDAwMDI2MzEgMDAwMDAgbg0K' +
					  'MDAwMDAyODAxMCAwMDAwMCBuDQowMDAwMDMxMTc2IDAwMDAwIG4NCjAwMDAwMzEyMjEgMDAwMDAg' +
					  'bg0KdHJhaWxlcg0KPDwvU2l6ZSAyOC9Sb290IDEgMCBSL0luZm8gMTEgMCBSL0lEWzxBOTBGODhC' +
					  'REUyRkJEMTRFOTE5QzczMEM3RTQ2OTY3Qz48QTkwRjg4QkRFMkZCRDE0RTkxOUM3MzBDN0U0Njk2' +
					  'N0M+XSA+Pg0Kc3RhcnR4cmVmDQozMTUyMg0KJSVFT0YNCnhyZWYNCjAgMA0KdHJhaWxlcg0KPDwv' +
					  'U2l6ZSAyOC9Sb290IDEgMCBSL0luZm8gMTEgMCBSL0lEWzxBOTBGODhCREUyRkJEMTRFOTE5Qzcz' +
					  'MEM3RTQ2OTY3Qz48QTkwRjg4QkRFMkZCRDE0RTkxOUM3MzBDN0U0Njk2N0M+XSAvUHJldiAzMTUy' +
					  'Mi9YUmVmU3RtIDMxMjIxPj4NCnN0YXJ0eHJlZg0KMzIyMzkNCiUlRU9G'
			    
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
			
		/**
		* Called when a controller is instantiated and its View controls (if available) are already created.
		* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		* @memberOf pdfviewer.main
		*/
			onInit: function() {				
				
				this.pageNum = 1;
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
					      var scale = 1.5;
					      var realToCSSPixels = window.devicePixelRatio;
					      var viewport = page.getViewport(scale);    
					      // Prepare canvas using PDF page dimensions.
					      var canvas = document.getElementById('the-canvas');
					      var context = canvas.getContext('2d');
					      canvas.height = viewport.height;
					      canvas.width = viewport.width; 
					      canvas.style.height = canvas.height + "px";
					      canvas.style.width = canvas.width + "px";
					      context.scale(scale,scale);
					      // display width
					      var displayWidth  = Math.floor(canvas.clientWidth  * realToCSSPixels);
					      var displayHeight = Math.floor(canvas.clientHeight * realToCSSPixels);        
					      // adjust
						  if (canvas.width  !== displayWidth ||
						      canvas.height !== displayHeight) {
						    // Make the canvas the same size
						    canvas.width  = displayWidth;
						    canvas.height = displayHeight;
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