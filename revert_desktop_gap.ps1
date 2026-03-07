$dir = "c:\Users\danie\OneDrive\Desktop\univers-livre"
$files = Get-ChildItem -Path $dir -Filter "*.html" -File | Where-Object { $_.Name -ne "404.html" }

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    $original = $content
    
    # We want to change "gap: 100px;" back to "gap: 60px;" in the main .footer-main block
    # Note: Mobile gap has !important so it will not match "gap: 100px;" exactly depending on regex,
    # but we explicitly target "100px" here since that's what we changed earlier today.
    
    $content = [regex]::Replace($content, '(\.footer-main\s*\{[^\}]*)gap:\s*100px;', '$1gap: 60px;')
    
    if ($content -cne $original) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        Write-Host "Updated $($file.Name)"
    }
}
