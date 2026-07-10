# Phase 7: Tokenize neutral colors (slate/gray → warm n-* ramp)
# Skips admin panel. Run from repo root: .\scripts\theme\phase7-neutrals.ps1

$srcPath = "d:\with data base\umrah cab\al kiswa umrah transport\src"

# Exclude admin panel as per user preference
$files = Get-ChildItem -Path $srcPath -Recurse -Include "*.tsx","*.ts","*.css" | Where-Object {
    $_.FullName -notmatch "node_modules" -and
    $_.FullName -notmatch "\\admin\\"
}

$totalReplacements = 0

foreach ($file in $files) {
    try {
        $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    } catch {
        continue
    }
    $original = $content

    # bg-[#hex] → bg-n-NNN
    $content = $content -replace 'bg-\[#(?i)(0f172a|111827)\]', 'bg-n-900'
    $content = $content -replace 'bg-\[#(?i)(1e293b)\]', 'bg-n-800'
    $content = $content -replace 'bg-\[#(?i)(334155)\]', 'bg-n-700'
    $content = $content -replace 'bg-\[#(?i)(475569|4b5563)\]', 'bg-n-600'
    $content = $content -replace 'bg-\[#(?i)(64748b|6b7280)\]', 'bg-n-500'
    $content = $content -replace 'bg-\[#(?i)(94a3b8|9ca3af)\]', 'bg-n-400'
    $content = $content -replace 'bg-\[#(?i)(cbd5e1)\]', 'bg-n-300'
    $content = $content -replace 'bg-\[#(?i)(e2e8f0|e5e7eb)\]', 'bg-n-200'
    $content = $content -replace 'bg-\[#(?i)(f1f5f9)\]', 'bg-n-100'
    $content = $content -replace 'bg-\[#(?i)(f8fafc|f9fafb)\]', 'bg-n-50'

    # text-[#hex] → text-n-NNN
    $content = $content -replace 'text-\[#(?i)(0f172a|111827)\]', 'text-n-900'
    $content = $content -replace 'text-\[#(?i)(1e293b)\]', 'text-n-800'
    $content = $content -replace 'text-\[#(?i)(334155)\]', 'text-n-700'
    $content = $content -replace 'text-\[#(?i)(475569|4b5563)\]', 'text-n-600'
    $content = $content -replace 'text-\[#(?i)(64748b|6b7280)\]', 'text-n-500'
    $content = $content -replace 'text-\[#(?i)(94a3b8|9ca3af)\]', 'text-n-400'
    $content = $content -replace 'text-\[#(?i)(cbd5e1)\]', 'text-n-300'
    $content = $content -replace 'text-\[#(?i)(e2e8f0|e5e7eb)\]', 'text-n-200'
    $content = $content -replace 'text-\[#(?i)(f1f5f9)\]', 'text-n-100'
    $content = $content -replace 'text-\[#(?i)(f8fafc|f9fafb)\]', 'text-n-50'

    # border-[#hex] → border-n-NNN
    $content = $content -replace 'border-\[#(?i)(0f172a|111827)\]', 'border-n-900'
    $content = $content -replace 'border-\[#(?i)(1e293b)\]', 'border-n-800'
    $content = $content -replace 'border-\[#(?i)(334155)\]', 'border-n-700'
    $content = $content -replace 'border-\[#(?i)(475569|4b5563)\]', 'border-n-600'
    $content = $content -replace 'border-\[#(?i)(64748b|6b7280)\]', 'border-n-500'
    $content = $content -replace 'border-\[#(?i)(94a3b8|9ca3af)\]', 'border-n-400'
    $content = $content -replace 'border-\[#(?i)(cbd5e1)\]', 'border-n-300'
    $content = $content -replace 'border-\[#(?i)(e2e8f0|e5e7eb)\]', 'border-n-200'

    # from-[#hex] / to-[#hex] / via-[#hex]
    $content = $content -replace 'from-\[#(?i)(0f172a|111827)\]', 'from-n-900'
    $content = $content -replace 'from-\[#(?i)(1e293b)\]', 'from-n-800'
    $content = $content -replace 'to-\[#(?i)(0f172a|111827)\]', 'to-n-900'
    $content = $content -replace 'to-\[#(?i)(1e293b)\]', 'to-n-800'

    if ($content -ne $original) {
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        $totalReplacements++
        Write-Host "Updated: $($file.Name)"
    }
}

Write-Host "`nTotal files updated (neutral tokens): $totalReplacements"
