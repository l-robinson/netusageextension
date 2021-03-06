# Net Usage Extension
## Description
Simple Net Usage Extension inspired by the Net Usage Item for Firefox (http://netusage.iau5.com/)

[Extension gallery page](https://chrome.google.com/extensions/detail/dcoehgalcmebfjgkbhbpllfhjcclkjan)

## Supported ISPs
* Adam Internet
* Internode
* Orcon

## Release Information
###Version 0.5.0:
* Added Internode support

### Version 0.4.1:
* Fixed link to show response details on error.
* Added additional Adam usage types (Freezone and Uploads).
* Added handling for usage types that have no quota.

### Version 0.4.0:
* Upgrade to new manifest.
* Updated for new Adam API (again, newsgroups are no longer supported for now).

### Version 0.3.0:
* Refactored for greater customisation of usageTypes.
* Updated for new Adam API.

### Version 0.2.2:
* Fixed bug in Date handling code, affecting Dates prior to the 10th each month.

### Version 0.2.0:
**NOTE:** Updating to this version requires you to re-save your Options.
* Added Units/day display on info popup (calculations are per whole day, eg 2d 6h will be rounded up to 3d).
* Added support for datablocks, now added to quota.
* Added Newsgroup usage to Adam info.
* Added Orcon (NZ) support.
* Added Automatic refresh on configurable interval.
* Fixed bug where extension would hang if initial setup was not performed.

### Version 0.1.1:
* Fixed random failures due to using global request.
* Better error handling and display.
* Added refresh button on popup, data now only refreshes when this is selected.
* Added some basic download stats to tooltip.
* Added additional information in popup below graph.
* Current position in month indicator arrow implemented.
* Added loading mask.

### Version 0.1.0:
* Very basic graph/percentage display functionality. Only works against Adam Internet usage feed.
