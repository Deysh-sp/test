


<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>



<script>



console.log("here2")

$(document).ready(function(){ 

console.log("here")
	var browser = JSON.stringify({
	  isAndroid: /Android/.test(navigator.userAgent),
	  isCordova: !!window.cordova,
	  isEdge: /Edge/.test(navigator.userAgent),
	  isFirefox: /Firefox/.test(navigator.userAgent),
	  isChrome: /Google Inc/.test(navigator.vendor),
	  isChromeIOS: /CriOS/.test(navigator.userAgent),
	  isChromiumBased: !!window.chrome && !/Edge/.test(navigator.userAgent),
	  isIE: /Trident/.test(navigator.userAgent),
	  isIOS: /(iPhone|iPad|iPod)/.test(navigator.platform),
	  isOpera: /OPR/.test(navigator.userAgent),
	  isSafari: /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent),
	  isTouchScreen: ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
	  isWebComponentsSupported: 'registerElement' in document && 'import' in document.createElement('link') && 'content' in document.createElement('template')
	}, null, '  ');
	
	
	
	console.log(browser)
	
	
}); //This is the end of the beginning	






</script>
