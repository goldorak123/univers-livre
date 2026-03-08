$dir = "c:\Users\danie\OneDrive\Desktop\univers-livre"
$files = Get-ChildItem -Path $dir -Filter "*.html" | Where-Object { 
  $_.Name -match "^(contact|livre|resume)(-(en|es))?\.html$"
}

foreach ($f in $files) {
    if (Test-Path $f.FullName) {
        $content = Get-Content $f.FullName -Raw
        
        # 1. Remove the injected block we added earlier
        $content = $content -replace "(?si)<style>\s*/\*\s*Global Override for Filigree Visibility\s*\*/.*?</style>\s*", ""
        
        # 2. Update the original CSS mask alpha
        $content = $content -replace "rgba\(0,\s*0,\s*0,\s*0\.45\)", "rgba(0, 0, 0, 0.95)"
        
        # 3. Update the filter brightness
        $content = $content -replace "contrast\(1\.2\)\s*saturation\(1\.1\)\s*brightness\(1\.8\)", "contrast(1.4) saturation(1.3) brightness(2.5)"
        
        Set-Content -Path $f.FullName -Value $content -Encoding UTF8
        Write-Host "Repaired and updated $($f.Name)"
    }
}
