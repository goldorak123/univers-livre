$files = @(
  "c:\Users\danie\OneDrive\Desktop\univers-livre\distribution.html",
  "c:\Users\danie\OneDrive\Desktop\univers-livre\distribution-en.html",
  "c:\Users\danie\OneDrive\Desktop\univers-livre\distribution-es.html"
)

$inject = @"
    <style>
    /* Overrides applied for distribution subtitle styling */
    .hero-subtitle {
        text-align: justify !important;
        hyphens: auto !important;
        -webkit-hyphens: auto !important;
        -ms-hyphens: auto !important;
        text-transform: uppercase !important;
        line-height: 2 !important;
        font-size: 1.15rem !important;
    }
    </style>
"@

foreach ($f in $files) {
    if (Test-Path $f) {
        $content = Get-Content $f -Raw
        
        if (-not ($content -match "Overrides applied for distribution subtitle styling")) {
            $content = $content -replace "(?i)</head>", "$inject`n</head>"
            Set-Content -Path $f -Value $content -Encoding UTF8
            Write-Host "Updated $($f)"
        }
    }
}
