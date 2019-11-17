# "homepage": "https://epehr.s2m.online/sites/Administration/SiteAssets/personnel-datasheet"
Write-Host "+++ BATBUILD-REACT (CRA) +++"

Write-Host "+ Removing old build files"
Remove-Item build\* -recurse

Write-Host "+ Creating new build"
npm run build

Write-Host "+ Renaming index.html to originator.html"
Rename-Item -Path ".\build\index.html" -NewName "originator.html"

Write-Host "+ Copying jquery and MSAjax "
Copy-Item .\src\lib\js\MicrosoftAjax.js .\build\static\js 
#Copy-Item .\src\lib\js\jquery.min.js .\build\static\js

Write-Host "+ Removing asset-manifest.json and manifest.json"
Remove-Item build\asset-manifest.json
Remove-Item build\manifest.json

Write-Host "+++ BUILD COMPLETED +++ "