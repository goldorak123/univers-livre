$dir = "c:\Users\danie\OneDrive\Desktop\univers-livre"
$files = Get-ChildItem -Path $dir -Filter "*.html" | Where-Object { 
  $_.Name -match "^(apropos|contact|livre|resume)(-(en|es))?\.html$"
}

$inject = @"
    <style>
    /* Global Override for Filigree Visibility */
    .leather-reveal-corner {
        -webkit-mask-image: radial-gradient(ellipse at bottom right, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0) 80%) !important;
        mask-image: radial-gradient(ellipse at bottom right, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0) 80%) !important;
        filter: contrast(1.4) saturation(1.3) brightness(2.5) !important;
    }
    .leather-reveal-corner-left {
        -webkit-mask-image: radial-gradient(ellipse at bottom left, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0) 80%) !important;
        mask-image: radial-gradient(ellipse at bottom left, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0) 80%) !important;
        filter: contrast(1.4) saturation(1.3) brightness(2.5) !important;
    }
    @media (max-width: 900px) {
        .leather-reveal-corner {
            -webkit-mask-image: radial-gradient(ellipse at bottom right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 85%) !important;
            mask-image: radial-gradient(ellipse at bottom right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 85%) !important;
        }
        .leather-reveal-corner-left {
            -webkit-mask-image: radial-gradient(ellipse at bottom left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 85%) !important;
            mask-image: radial-gradient(ellipse at bottom left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 85%) !important;
        }
    }
    </style>
"@

foreach ($f in $files) {
    if (Test-Path $f.FullName) {
        $content = Get-Content $f.FullName -Raw
        
        # Check if already injected
        if (-not ($content -match "\/\*\s*Global Override for Filigree Visibility\s*\*\/")) {
            $content = $content -replace "(?i)</head>", "$inject`n</head>"
            Set-Content -Path $f.FullName -Value $content -Encoding UTF8
            Write-Host "Updated $($f.Name)"
        } else {
            Write-Host "Already updated $($f.Name)"
        }
    }
}
