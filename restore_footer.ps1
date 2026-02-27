$files = Get-ChildItem -Filter *.html
$copyrightHtml = '<p class="footer-copyright">© <span id="current-year-footer"></span> simonlero.com — Tous droits réservés</p>'

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # 1. Remove any existing copyright (empty or full) from anywhere in the footer
    $cleanedContent = $content -replace '(?s)<p class=["'']footer-copyright["'']>.*?</p>', ''
    
    # 2. Insert the correct copyright at the end of the footer-container
    if ($cleanedContent -match '(?s)(<div class="footer-container">.*?)(</div>\s*</footer>)') {
        $newContent = $cleanedContent -replace '(?s)(<div class="footer-container">.*?)(</div>\s*</footer>)', "`$1`r`n      $copyrightHtml`r`n    `$2"
        Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8
        Write-Host "Manually restored: $($file.Name)"
    }
}
