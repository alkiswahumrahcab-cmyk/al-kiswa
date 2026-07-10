# Phase 7: Tokenize neutral colors (slate/gray → warm n-* ramp)
# Skips admin panel. Run from repo root: .\scripts\theme\phase7-neutrals.ps1

$srcPath = "d:\with data base\umrah cab\al kiswa umrah transport\src"

# Exclude admin panel as per user preference
$files = Get-ChildItem -Path $srcPath -Recurse -Include "*.tsx","*.ts","*.css" | Where-Object {
    $_.FullName -notmatch "node_modules" -and
    $_.FullName -notmatch "\\admin\\"
}

$totalReplacements = 0

# Mapping: old hex → nearest warm n-* Tailwind token
$neutralMap = @{
    # bg-[#hex] → bg-n-NNN
    'bg-\[#(?i)(0f172a|111827)\]' = 'bg-n-900'
    'bg-\[#(?i)(1e293b)\]'        = 'bg-n-800'
    'bg-\[#(?i)(334155)\]'        = 'bg-n-700'
    'bg-\[#(?i)(475569|4b5563)\]' = 'bg-n-600'
    'bg-\[#(?i)(64748b|6b7280)\]' = 'bg-n-500'
    'bg-\[#(?i)(94a3b8|9ca3af)\]' = 'bg-n-400'
    'bg-\[#(?i)(cbd5e1)\]'        = 'bg-n-300'
    'bg-\[#(?i)(e2e8f0|e5e7eb)\]' = 'bg-n-200'
    'bg-\[#(?i)(f1f5f9)\]'        = 'bg-n-100'
    'bg-\[#(?i)(f8fafc|f9fafb)\]' = 'bg-n-50'
    # text-[#hex] → text-n-NNN
    'text-\[#(?i)(0f172a|111827)\]' = 'text-n-900'
    'text-\[#(?i)(1e293b)\]'        = 'text-n-800'
    'text-\[#(?i)(334155)\]'        = 'text-n-700'
    'text-\[#(?i)(475569|4b5563)\]' = 'text-n-600'
    'text-\[#(?i)(64748b|6b7280)\]' = 'text-n-500'
    'text-\[#(?i)(94a3b8|9ca3af)\]' = 'text-n-400'
    'text-\[#(?i)(cbd5e1)\]'        = 'text-n-300'
    'text-\[#(?i)(e2e8f0|e5e7eb)\]' = 'text-n-200'
    'text-\[#(?i)(f1f5f9)\]'        = 'text-n-100'
    'text-\[#(?i)(f8fafc|f9fafb)\]' = 'text-n-50'
    # border-[#hex]
    'border-\[#(?i)(0f172a|111827)\]' = 'border-n-900'
    'border-\[#(?i)(1e293b)\]'        = 'border-n-800'
    'border-\[#(?i)(334155)\]'        = 'border-n-700'
    'border-\[#(?i)(475569|4b5563)\]' = 'border-n-600'
    'border-\[#(?i)(64748b|6b7280)\]' = 'border-n-500'
    'border-\[#(?i)(94a3b8|9ca3af)\]' = 'border-n-400'
    'border-\[#(?i)(cbd5e1)\]'        = 'border-n-300'
    'border-\[#(?i)(e2e8f0|e5e7eb)\]' = 'border-n-200'
}

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $original = $content

    foreach ($pattern in $neutralMap.Keys) {
        $content = $content -replace $pattern, $neutralMap[$pattern]
    }

    if ($content -ne $original) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        $totalReplacements++
        Write-Host "Updated: $($file.Name)"
    }
}

Write-Host "`nTotal files updated (neutral tokens): $totalReplacements"
