$files = @(
  "c:\Users\danie\OneDrive\Desktop\univers-livre\distribution.html",
  "c:\Users\danie\OneDrive\Desktop\univers-livre\distribution-en.html",
  "c:\Users\danie\OneDrive\Desktop\univers-livre\distribution-es.html"
)

$inject = @"
    @media (max-width: 900px) {
        .hero-subtitle {
            font-size: 0.95rem !important;
            line-height: 1.6 !important;
        }
    }
    </style>
"@

$targetStr = @"
    }
    </style>
"@

foreach ($f in $files) {
    if (Test-Path $f) {
        $content = Get-Content $f -Raw
        
        # We need to make sure we only replace the one we injected
        if ($content -match "\/\*\s*Overrides applied for distribution subtitle styling\s*\*\/") {
            # Let's replace the last </style> of that block
            # Actually, let's use regex to replace it
            $pattern = "(?si)(\/\*\s*Overrides applied for distribution subtitle styling.*?)\}\s*<\/style>"
            $replacement = "`$1}`n    @media (max-width: 900px) {`n        .hero-subtitle {`n            font-size: 0.95rem !important;`n            line-height: 1.6 !important;`n        }`n    }`n    </style>"
            
            if (-not ($content -match "\@media\s*\(max-width:\s*900px\)\s*\{\s*\.hero-subtitle")) {
                $newContent = $content -replace $pattern, $replacement
                Set-Content -Path $f -Value $newContent -Encoding UTF8
                Write-Host "Updated $($f)"
            } else {
                Write-Host "Already updated $($f)"
            }
        }
    }
}
