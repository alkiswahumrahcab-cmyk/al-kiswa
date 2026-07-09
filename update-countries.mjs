import fs from 'fs';
import https from 'https';

https.get('https://raw.githubusercontent.com/mledoze/countries/master/countries.json', (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        const json = JSON.parse(data);
        const countries = json.map(c => {
            const dialCode = c.idd.root + (c.idd.suffixes && c.idd.suffixes.length === 1 ? c.idd.suffixes[0] : '');
            return {
                code: c.cca2,
                name: c.name.common,
                dialCode: (dialCode && dialCode !== 'undefined') ? dialCode : ''
            };
        }).sort((a,b) => a.name.localeCompare(b.name));
        
        let content = fs.readFileSync('src/data/countries.ts', 'utf-8');
        
        const startIdx = content.indexOf('export const COUNTRIES');
        const endIdx = content.indexOf('];', startIdx) + 2;
        
        const newCountriesStr = 'export const COUNTRIES: { code: string; name: string; dialCode?: string; disabled?: boolean }[] = ' + JSON.stringify(countries, null, 4) + ';';
        
        const extraCode = `
export const TOP_NATIONALITIES = [
    'Indonesia', 'Pakistan', 'India', 'United Kingdom', 'United States', 
    'Malaysia', 'France', 'Germany', 'Netherlands', 'Belgium', 
    'South Africa', 'Saudi Arabia', 'Bangladesh', 'Egypt', 'Nigeria'
];

export function getFlagEmoji(countryCode: string) {
    if (!countryCode) return '';
    return [...countryCode.toUpperCase()].map(c => String.fromCodePoint(c.charCodeAt(0) + 127397)).join('');
}
`;

        content = content.substring(0, startIdx) + newCountriesStr + '\n\n' + extraCode + content.substring(endIdx);
        
        // Also update getSortedCountries to return the new fields
        content = content.replace(
            `export function getSortedCountries(): { code: string, name: string, disabled?: boolean }[]`,
            `export function getSortedCountries(): { code: string, name: string, dialCode?: string, disabled?: boolean }[]`
        );
        
        fs.writeFileSync('src/data/countries.ts', content);
        console.log('Updated countries.ts');
    });
});
