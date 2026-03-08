$dir = "c:\Users\danie\OneDrive\Desktop\univers-livre"
$files = Get-ChildItem -Path $dir -Filter "*.html" -File | Where-Object { $_.Name -ne "404.html" }

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    $original = $content
    
    # We want to increase the space between the PWA block and the footer-right block.
    # The container that holds these two is .footer-main
    
    # Desktop gap: find "gap: 60px;" directly after ".footer-main {"
    $content = [regex]::Replace($content, '(\.footer-main\s*\{[^\}]*)gap:\s*60px;', '$1gap: 100px;')
    
    # Mobile gap: find "gap: 40px !important;" directly after ".footer-main {"
    $content = [regex]::Replace($content, '(\.footer-main\s*\{[^\}]*)gap:\s*40px\s*!important;', '$1gap: 80px !important;')
    
    if ($content -cne $original) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        Write-Host "Updated $($file.Name)"
    }
}
