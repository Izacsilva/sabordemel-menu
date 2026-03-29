const fs = require('fs');

const rawContent = fs.readFileSync('clean_menu.csv', 'utf8');
const csvContent = Buffer.from(rawContent, 'latin1').toString('utf8');
const lines = csvContent.split('\n');

function parseCsvLine(line) {
    const result = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(cur);
            cur = '';
        } else {
            cur += char;
        }
    }
    result.push(cur);
    return result;
}

function parsePrice(priceStr) {
    if (!priceStr) return 0;
    // Fix formats: "R$ 12,00" or "R$12.00"
    return parseFloat(priceStr.replace('R$', '').replace('.', '').replace(',', '.').trim());
}

function normalizeCategory(cat) {
    if (!cat) return 'outros';
    const cleanCat = cat.trim();
    const map = {
        'Sandu\u00EDches': 'sanduiches',
        'Past\u00E9is': 'pasteis',
        'Bebidas': 'bebidas',
        'Cuscuz': 'salgados-outros',
        'Salgados': 'salgados-outros',
        'Batata Frita': 'salgados-outros',
        'A\u00E7a\u00ED': 'acai-sorvetes',
        'Milk-Shake': 'acai-sorvetes',
        'Sorvete': 'acai-sorvetes'
    };
    return map[cleanCat] || 'outros';
}

function getIcon(normCat) {
    const map = {
        'sanduiches': 'lunch_dining',
        'pasteis': 'bakery_dining',
        'bebidas': 'liquor',
        'salgados-outros': 'flatware',
        'acai-sorvetes': 'icecream'
    };
    return map[normCat] || 'restaurant';
}

const products = [];
const grouped = {};

// Keywords to ignore when grouping (items that should always be independent)
const independentKeywords = ['Misto Quente', 'Hamb\u00FArguer', 'Cuscuz'];

for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    let [name, description, priceStr, category] = parseCsvLine(line);
    if (!name) continue;

    name = name.trim();
    description = description ? description.trim() : '';
    category = category ? category.trim() : '';

    const normCat = normalizeCategory(category);
    const price = parsePrice(priceStr);
    const icon = getIcon(normCat);

    // Dynamic grouping logic:
    // We check if it matches a size pattern: 200ml, 1,5L, P/M/G at the end.
    const sizePattern = /\s+(\d+(?:,\d+)?(?:ml|L|l)|P|M|G|KS|Lata|Pet|Mini Pet|LS\s+Retorn\u00E1vel|Pet\s+2L|KS\s+290ml|Lata\s+350ml|c\/\s+G\u00E1s)\s*$/i;
    const match = name.match(sizePattern);
    
    const isExcluded = independentKeywords.some(k => name.includes(k));

    if (match && !isExcluded && !name.includes('Suco de polpa')) {
        const sizeLabel = match[1].trim();
        const baseName = name.replace(match[0], '').trim();

        if (!grouped[baseName]) {
            grouped[baseName] = {
                id: 'prod-' + Math.random().toString(36).substr(2, 7),
                category: normCat,
                name: baseName,
                description: description,
                icon: icon,
                prices: {}
            };
        }
        grouped[baseName].prices[sizeLabel] = price;

        // Custom features
        if (category === 'A\u00E7a\u00ED') {
            grouped[baseName].hasCustomization = true;
            if (!grouped[baseName].limits) grouped[baseName].limits = {};
            
            const mlMatch = sizeLabel.match(/(\d+)/);
            const ml = mlMatch ? parseInt(mlMatch[0]) : 0;
            const comp = ml >= 500 ? 5 : (ml >= 300 ? 4 : 3);
            
            grouped[baseName].limits[sizeLabel] = {
                complementos: comp, cremes: 1, frutas: 1, coberturas: 1
            };
        }
        
        // Flavors
        if (category === 'Milk-Shake' || category === 'Sorvete') {
            if (description.toLowerCase().includes('sabores')) {
                const flavorsPart = description.split(':').pop();
                grouped[baseName].flavors = flavorsPart.split(',').map(s => s.trim());
            }
        }
    } else {
        products.push({
            id: 'prod-' + Math.random().toString(36).substr(2, 7),
            category: normCat,
            name: name,
            description: description,
            price: price,
            icon: icon
        });
    }
}

// Merge grouped
Object.values(grouped).forEach(g => {
    // If a group only has 1 price, maybe it shouldn't have been a group? 
    // Actually, keep it as prices object for UI consistency if needed, 
    // but the original code handled it.
    products.push(g);
});

fs.writeFileSync('products.json', JSON.stringify(products, null, 4));
console.log(`Finalizado! ${products.length} itens gerados no products.json.`);
