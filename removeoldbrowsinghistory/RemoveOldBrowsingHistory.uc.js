// ==UserScript==
// @name           removeOldBrowsingHistory.uc.js
// @namespace      http://space.geocities.yahoo.co.jp/gl/alice0775
// @description    remove Old Browsing History
// @include        main
// @compatibility  Firefox 17+
// @author         Alice0775
// @version        2016/06/10 15:00 Bug 1220654 - Replace removeVisitsTimeframe with History.removeVisitsByFilter
// @version        2016/06/03 17:00 nop
// @version        2013/03/03 00:00 
// ==/UserScript==
(function() {
  // Zeitraum für das Löschen der Browser Chronik
  var dMax = 7; //Tage
  //
  var JS_NOW = Date.now();
  if ("removeVisitsByTimeframe" in PlacesUtils.history) {
    // in Milli-Sekunden
    var aBeginTime = JS_NOW*1000 - 10 * 365 * 24 * 3600000000; //10 Jahre
    var aEndTime = JS_NOW*1000 - dMax * 24 * 3600000000;
    PlacesUtils.history.QueryInterface(Components.interfaces.nsIBrowserHistory).
                removeVisitsByTimeframe(aBeginTime, aEndTime);
  } else {
    var filter = {
      // im Datumsformat ( Konvertieren von Milli-Sekunden )
      beginDate: new Date(JS_NOW - 10 * 365 * 24 * 3600000),
      endDate: new Date(JS_NOW - dMax * 24 * 3600000)
    };
    PlacesUtils.history.removeVisitsByFilter(filter);
}
})();