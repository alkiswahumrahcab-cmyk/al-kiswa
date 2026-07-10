# Phase 6: Tokenize gold-glow rgba transparency + frosted glass panels
# Run from repo root: .\scripts\theme\phase6-transparency.ps1

$srcPath = "d:\with data base\umrah cab\al kiswa umrah transport\src"
$files = Get-ChildItem -Path $srcPath -Recurse -Include "*.tsx","*.ts","*.css" | Where-Object { $_.FullName -notmatch "node_modules" }

$totalReplacements = 0

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $original = $content

    # rgba(212,175,55, α) → hsl(var(--gold-glow) / α)
    $content = $content -replace 'rgba\(\s*212\s*,\s*175\s*,\s*55\s*,\s*([\d.]+)\s*\)', 'hsl(var(--gold-glow) / $1)'
    $content = $content -replace "rgba\(\s*212\s*,\s*175\s*,\s*55\s*,\s*([\d.]+)\s*\)", 'hsl(var(--gold-glow) / $1)'

    # rgba(239,191,91, α) → hsl(var(--gold-glow) / α)
    $content = $content -replace 'rgba\(\s*239\s*,\s*191\s*,\s*91\s*,\s*([\d.]+)\s*\)', 'hsl(var(--gold-glow) / $1)'
    $content = $content -replace "rgba\(\s*239\s*,\s*191\s*,\s*91\s*,\s*([\d.]+)\s*\)", 'hsl(var(--gold-glow) / $1)'

    # rgba(226,163,54, α) variants → hsl(var(--gold-glow) / α)
    $content = $content -replace 'rgba\(\s*226\s*,\s*163\s*,\s*54\s*,\s*([\d.]+)\s*\)', 'hsl(var(--gold-glow) / $1)'

    if ($content -ne $original) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        $totalReplacements++
        Write-Host "Updated: $($file.Name)"
    }
}

Write-Host "`nTotal files updated (rgba gold → token): $totalReplacements"
