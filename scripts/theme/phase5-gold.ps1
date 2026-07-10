# Phase 5: Unify all gold hex values to design tokens
# Run from repo root: .\scripts\theme\phase5-gold.ps1

$srcPath = "d:\with data base\umrah cab\al kiswa umrah transport\src"

# Files to process (tsx, ts, css - excluding node_modules)
$files = Get-ChildItem -Path $srcPath -Recurse -Include "*.tsx","*.ts","*.css" | Where-Object { $_.FullName -notmatch "node_modules" }

$totalReplacements = 0

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $original = $content

    # ---- GOLD (primary) hex → token class mappings ----
    # In CSS files: replace with hsl(var(--gold))
    # In TSX/TS: replace hex strings with token class names

    if ($file.Extension -eq ".css") {
        # Gold primary
        $content = $content -replace '#(?i)(d4af37|e2a336|efbf5b|f59e0b|fbbf24)', 'hsl(var(--gold))'
        # Gold light
        $content = $content -replace '#(?i)(f3d383|fcd34d)', 'hsl(var(--gold-light))'
        # Gold dark
        $content = $content -replace '#(?i)(c8891f|b4932f|bfa35a|daa520)', 'hsl(var(--gold-dark))'
    } else {
        # TSX/TS: replace in className strings and style objects
        # Gold primary → 'gold' token (in bg-[#hex] and text-[#hex] patterns)
        $content = $content -replace "bg-\[#(?i)(d4af37|e2a336|efbf5b|f59e0b|fbbf24)\]", 'bg-gold'
        $content = $content -replace "text-\[#(?i)(d4af37|e2a336|efbf5b|f59e0b|fbbf24)\]", 'text-gold'
        $content = $content -replace "border-\[#(?i)(d4af37|e2a336|efbf5b|f59e0b|fbbf24)\]", 'border-gold'
        $content = $content -replace "from-\[#(?i)(d4af37|e2a336|efbf5b|f59e0b|fbbf24)\]", 'from-gold'
        $content = $content -replace "to-\[#(?i)(d4af37|e2a336|efbf5b|f59e0b|fbbf24)\]", 'to-gold'
        $content = $content -replace "via-\[#(?i)(d4af37|e2a336|efbf5b|f59e0b|fbbf24)\]", 'via-gold'

        # Gold light → 'gold-light' token
        $content = $content -replace "bg-\[#(?i)(f3d383|fcd34d)\]", 'bg-gold-light'
        $content = $content -replace "text-\[#(?i)(f3d383|fcd34d)\]", 'text-gold-light'

        # Gold dark → 'gold-dark' token
        $content = $content -replace "bg-\[#(?i)(c8891f|b4932f|bfa35a|daa520)\]", 'bg-gold-dark'
        $content = $content -replace "text-\[#(?i)(c8891f|b4932f|bfa35a|daa520)\]", 'text-gold-dark'
        $content = $content -replace "from-\[#(?i)(c8891f|b4932f|bfa35a|daa520)\]", 'from-gold-dark'
        $content = $content -replace "to-\[#(?i)(c8891f|b4932f|bfa35a|daa520)\]", 'to-gold-dark'

        # Replace remaining bare hex strings (in style={{ color: '#...' }} etc.)
        $content = $content -replace "'#(?i)(d4af37|e2a336|efbf5b|f59e0b|fbbf24)'", "'hsl(var(--gold))'"
        $content = $content -replace '"#(?i)(d4af37|e2a336|efbf5b|f59e0b|fbbf24)"', '"hsl(var(--gold))"'
        $content = $content -replace "'#(?i)(f3d383|fcd34d)'", "'hsl(var(--gold-light))'"
        $content = $content -replace '"#(?i)(f3d383|fcd34d)"', '"hsl(var(--gold-light))"'
        $content = $content -replace "'#(?i)(c8891f|b4932f|bfa35a|daa520)'", "'hsl(var(--gold-dark))'"
        $content = $content -replace '"#(?i)(c8891f|b4932f|bfa35a|daa520)"', '"hsl(var(--gold-dark))"'
    }

    # Replace gold-primary Tailwind class → gold
    $content = $content -replace '\bgold-primary\b', 'gold'

    if ($content -ne $original) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        $totalReplacements++
        Write-Host "Updated: $($file.Name)"
    }
}

Write-Host "`nTotal files updated: $totalReplacements"
