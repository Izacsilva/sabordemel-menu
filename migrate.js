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

const beverageMenu = {
    titulo: 'Bebidas',
    grupos: [
        {
            id: 'refrigerantes_ns',
            nome: 'Refrigerantes NS',
            produtos: [
                { nome: 'Coca Cola NS', preco: 4.0 },
                { nome: 'Fanta NS', preco: 4.0 }
            ]
        },
        {
            id: 'refrigerantes_mini_pet',
            nome: 'Refrigerantes Mini Pet',
            produtos: [
                { nome: 'Coca Cola Mini Pet', preco: 4.5 },
                { nome: 'Fanta Mini Pet', preco: 4.0 }
            ]
        },
        {
            id: 'refrigerantes_ks_290ml',
            nome: 'Refrigerantes KS 290ml',
            produtos: [
                { nome: 'Coca Cola KS 290ml', preco: 6.0 },
                { nome: 'Fanta KS 290ml', preco: 5.0 }
            ]
        },
        {
            id: 'bebidas_em_lata',
            nome: 'Bebidas em Lata',
            produtos: [
                { nome: 'Coca Cola Lata 350ml', preco: 6.0 },
                { nome: 'Fanta Lata 350ml', preco: 5.0 },
                { nome: 'Kuat Lata 350ml', preco: 5.0 },
                { nome: 'Sprite Lata 350ml', preco: 5.0 },
                { nome: 'Coca Cola Zero Lata 350ml', preco: 6.0 },
                { nome: 'Schweppes Citrus Lata 350ml', preco: 6.0 },
                { nome: 'Monster Energy Lata 269ml', preco: 10.0 }
            ]
        },
        {
            id: 'refrigerantes_pet',
            nome: 'Refrigerantes Pet',
            produtos: [
                { nome: 'Coca Cola 1 Litro Pet', preco: 11.0 },
                { nome: 'Fanta 1 Litro Pet', preco: 9.0 },
                { nome: 'Coca Cola 2 Litros Pet', preco: 15.0 },
                { nome: 'Fanta 2 Litros Pet', preco: 13.0 },
                { nome: 'Coca Cola 500ml', preco: 6.5 },
                { nome: 'Sprite Fresh Limão 510ml', preco: 6.0 }
            ]
        },
        {
            id: 'refrigerantes_retornaveis_ls',
            nome: 'Refrigerantes Retornáveis LS',
            produtos: [
                { nome: 'Coca Cola Retornável', preco: 7.5 },
                { nome: 'Fanta Retornável', preco: 7.5 }
            ]
        },
        {
            id: 'agua_mineral',
            nome: 'Água Mineral',
            produtos: [
                { nome: 'Água Mineral Sem Gás 350ml', preco: 4.0 },
                { nome: 'Água Mineral Sem Gás 500ml', preco: 4.0 },
                { nome: 'Água Mineral Com Gás 500ml', preco: 4.0 },
                { nome: 'Água Mineral Sem Gás 1,5 Litro', preco: 4.0 }
            ]
        },
        {
            id: 'sucos_del_valle',
            nome: 'Sucos Del Valle',
            produtos: [
                { nome: 'Suco Del Valle Uva 450ml', preco: 4.0 },
                { nome: 'Suco Del Valle Laranja 450ml', preco: 4.0 },
                { nome: 'Suco Del Valle Frutas Cítricas 450ml', preco: 4.0 }
            ]
        },
        {
            id: 'sucos_da_fruta',
            nome: 'Sucos da Fruta',
            produtos: [
                { nome: 'Suco de Laranja', preco: 7.5 },
                { nome: 'Suco de Limão', preco: 7.5 }
            ]
        },
        {
            id: 'sucos_de_polpas_400ml',
            nome: 'Sucos de Polpas 400ml',
            produtos: [
                { nome: 'Acerola', preco: 4.0 },
                { nome: 'Abacaxi com Hortelã', preco: 4.0 },
                { nome: 'Graviola', preco: 4.0 },
                { nome: 'Goiaba', preco: 4.0 },
                { nome: 'Cajá', preco: 4.0 },
                { nome: 'Maracujá', preco: 4.0 }
            ]
        }
    ]
};

const beverageNames = new Set(beverageMenu.grupos.flatMap(function(grupo) {
    return grupo.produtos.map(function(produto) {
        return produto.nome;
    });
}));

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
    // Suco da Polpa logic
    const sucoMatch = name.match(/^Suco de (.+?) (com|sem) leite/i);
    if (sucoMatch) {
        const flavor = sucoMatch[1].trim();
        const milkOption = sucoMatch[2].toLowerCase() === 'com' ? 'Com Leite' : 'Sem Leite';
        
        if (!grouped['Suco da Polpa']) {
            grouped['Suco da Polpa'] = {
                id: 'prod-' + Math.random().toString(36).substr(2, 7),
                category: normCat,
                name: 'Suco da Polpa',
                description: 'Copo de 300ml.', // Can be simple, as flavors will be visible
                icon: icon,
                prices: {},
                pricesTitle: 'Sua Opção:',
                flavors: []
            };
        }
        
        grouped['Suco da Polpa'].prices[milkOption] = price;
        if (!grouped['Suco da Polpa'].flavors.includes(flavor)) {
            grouped['Suco da Polpa'].flavors.push(flavor);
        }
        continue;
    }

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
    products.push(g);
});

const filteredProducts = products.filter(function(product) {
    // Remove ALL individual items and brand-level groupings from the 'bebidas' category.
    // We will only show the top-level groups created below.
    return product.category !== 'bebidas';
});

// Create a product for each drink group
beverageMenu.grupos.forEach(function(grupo) {
    const minPrice = Math.min(...grupo.produtos.map(p => p.preco));
    
    filteredProducts.push({
        id: 'bebida-' + grupo.id,
        category: 'bebidas',
        name: grupo.nome,
        description: 'Escolha a sua opção de ' + grupo.nome.toLowerCase(),
        icon: 'liquor',
        price: minPrice,
        prices: {
            "A partir de": minPrice
        },
        beverageMenu: {
            titulo: grupo.nome,
            grupos: [grupo]
        }
    });
});

fs.writeFileSync('products.json', JSON.stringify(filteredProducts, null, 4));
console.log(`Finalizado! ${filteredProducts.length} itens gerados no products.json.`);

// Prepara arquivos para o Vercel (que tenta servir a pasta /public quando detecta um build)
const path = require('path');
const publicDir = path.join(__dirname, 'public');

if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
}

// Copia o index.html e o products.json gerado para a pasta public
fs.copyFileSync(path.join(__dirname, 'index.html'), path.join(publicDir, 'index.html'));
fs.copyFileSync(path.join(__dirname, 'products.json'), path.join(publicDir, 'products.json'));
console.log('✔ Arquivos preparados na pasta /public para o deploy no Vercel!');
