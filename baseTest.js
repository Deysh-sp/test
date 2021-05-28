


<script src="https://raw.githubusercontent.com/Deysh-sp/test/main/jquery.js?token=AUHAJWQ6ZE2YQ2Y5MN57P23AWDMQK"></script>



<script>





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
