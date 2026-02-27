$files = Get-ChildItem -Filter *.html
$copyrightHtml = '      <p class="footer-copyright">&copy; <span id="current-year-footer"></span> simonlero.com &mdash; Tous droits r&eacute;serv&eacute;s</p>'

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName)
    
    # 1. Update CSS: text-align: center on desktop
    if ($content -match '(?s)(\.footer-copyright\s*\{[^}]*?text-align\s*:\s*)(right|center)(.*?\})') {
        $content = $content -replace '(?s)(\.footer-copyright\s*\{[^}]*?text-align\s*:\s*)(right|center)(.*?\})', '$1center$3'
    }

    # 2. Fix the HTML structure
    # Remove any existing corrupted copyright/extra divs from previous attempts
    # We look for the footer section and rebuild the container content carefully
    if ($content -match '(?s)<footer class="footer-pwa">(.*?)</footer>') {
        $footerInner = $matches[1]
        
        # Remove any existing copyright tags
        $footerInner = $footerInner -replace '(?s)<p class=["'']footer-copyright["'']>.*?</p>', ''
        
        # Remove any extra closure tags or messed up divs inside footer-container
        if ($footerInner -match '(?s)(<div class="footer-container">.*?)(</div>\s*</div>|</div>\s*</div>\s*</div>)(.*)$') {
             # This tries to fix the "marde" of closing tags
             $footerInner = $footerInner -replace '(?s)(<div class="footer-container">.*?)(</div>\s*)+', '$1'
        }
        
        # Re-insert the copyright at the very end of footer-container
        # We find where footer-container starts and ends
        if ($footerInner -match '(?s)(<div class="footer-container">)(.*)$') {
            $prefix = $matches[1]
            $body = $matches[2]
            
            # Extract content until the LAST </div> that belongs to footer-container
            # Since we know the structure, we can be aggressive
            $body = $body -replace '(?s)\s*</div>\s*$', ''
            
            $newFooterInner = "$prefix$body`r`n$copyrightHtml`r`n    </div>"
            $content = $content -replace '(?s)<footer class="footer-pwa">.*?</footer>', "<footer class=""footer-pwa"">`r`n$newFooterInner`r`n  </footer>"
        }
    }
    
    [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
    Write-Host "Corrected: $($file.Name)"
}
