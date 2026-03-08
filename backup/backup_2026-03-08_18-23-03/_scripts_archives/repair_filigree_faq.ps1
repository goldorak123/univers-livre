$dir = "c:\Users\danie\OneDrive\Desktop\univers-livre"
$files = Get-ChildItem -Path $dir -Filter "faq*.html" | Where-Object { 
  $_.Name -match "^faq(-(en|es))?\.html$"
}

foreach ($f in $files) {
    if (Test-Path $f.FullName) {
        $content = Get-Content $f.FullName -Raw
        $orig = $content
        
        # 1. Update the original CSS mask alpha
        $content = $content -replace "rgba\(0,\s*0,\s*0,\s*0\.45\)", "rgba(0, 0, 0, 0.95)"
        
        # 2. Update the filter brightness
        $content = $content -replace "contrast\(1\.2\)\s*saturation\(1\.1\)\s*brightness\(1\.8\)", "contrast(1.4) saturation(1.3) brightness(2.5)"
        
        if ($content -cne $orig) {
            Set-Content -Path $f.FullName -Value $content -Encoding UTF8
            Write-Host "Updated $($f.Name)"
        } else {
            Write-Host "No changes for $($f.Name)"
        }
    }
}
