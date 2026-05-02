import type { Categoria, Genero, Product, Talla } from '../types/product'

export const CATEGORY_LABELS: Record<Categoria, string> = {
    camisas: 'Camisas',
    pantalones: 'Pantalones y Jeans',
    trajes: 'Trajes',
    accesorios: 'Accesorios',
    blusas: 'Blusas',
    'ropa-formal': 'Ropa formal',
}

export const GENDER_LABELS: Record<Genero, string> = {
    hombre: 'Hombre',
    mujer: 'Mujer',
}

export const GENDER_DESCRIPTIONS: Record<Genero, string> = {
    hombre: 'Líneas sobrias, piezas versátiles y acabados elegantes para el día a día y ocasiones formales.',
    mujer: 'Selección femenina con siluetas actuales, básicos refinados y prendas formales con aire premium.',
}

export const CATEGORY_BY_GENDER: Record<Genero, Categoria[]> = {
    hombre: ['camisas', 'pantalones', 'trajes', 'accesorios'],
    mujer: ['blusas', 'pantalones', 'ropa-formal', 'accesorios'],
}

type ProductSeed = {
    nombre: string
    precio: number
    tallas: Talla[]
    colores: string[]
    imagen: string
    descripcion: string
    nuevo?: boolean
}

const createCategoryProducts = (
    genero: Genero,
    categoria: Categoria,
    items: ProductSeed[],
    startingId: number,
): Product[] =>
    items.map((item, index) => ({
        id: startingId + index,
        genero,
        categoria,
        nuevo: item.nuevo ?? false,
        ...item,
    }))

const hombreCamisas: ProductSeed[] = [
    { nombre: 'Camisa Oxford Blanca', precio: 21990, tallas: ['M', 'L', 'XL'], colores: ['Blanco'], imagen: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Camisa clásica para oficina o eventos.', nuevo: true },
    { nombre: 'Camisa Lino Arena', precio: 24990, tallas: ['S', 'M', 'L'], colores: ['Arena'], imagen: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Prenda fresca con acabado ligero.' },
    { nombre: 'Camisa Manga Larga Azul', precio: 22990, tallas: ['M', 'L'], colores: ['Azul'], imagen: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Camisa versátil para uso diario.' },
    { nombre: 'Camisa Cuello Mao Verde Oliva', precio: 23990, tallas: ['S', 'M', 'L'], colores: ['Verde oliva'], imagen: 'https://images.unsplash.com/photo-1602810316693-3667c854239a?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Corte moderno con cuello mao.' },
    { nombre: 'Camisa Formal Celeste', precio: 25990, tallas: ['M', 'L', 'XL'], colores: ['Celeste'], imagen: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Camisa sobria para reuniones y oficina.', nuevo: true },
    { nombre: 'Camisa Slim Fit Azul Claro', precio: 26990, tallas: ['S', 'M', 'L'], colores: ['Azul claro'], imagen: 'https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Ajuste slim con presencia elegante.' },
    { nombre: 'Camisa Denim Casual', precio: 24490, tallas: ['M', 'L'], colores: ['Azul denim'], imagen: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Camisa casual de apariencia moderna.' },
    { nombre: 'Camisa Casual Azul Índigo', precio: 27990, tallas: ['M', 'L', 'XL'], colores: ['Índigo'], imagen: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Camisa de estilo casual con estructura suave.' },
    { nombre: 'Camisa Lino Blanca Premium', precio: 28990, tallas: ['S', 'M', 'L'], colores: ['Blanco'], imagen: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Lino premium de apariencia limpia.' },
    { nombre: 'Camisa Casual Terracota', precio: 23490, tallas: ['S', 'M', 'L'], colores: ['Terracota'], imagen: 'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Toque cálido para outfits casuales.' },
    { nombre: 'Camisa Formal Azul Marino', precio: 25990, tallas: ['M', 'L', 'XL'], colores: ['Azul marino'], imagen: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Popelina firme para un look pulido.' },
    { nombre: 'Camisa Casual Beige', precio: 24990, tallas: ['M', 'L'], colores: ['Beige'], imagen: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Diseño suave para combinar con chinos.' },
    { nombre: 'Camisa Formal Gris', precio: 26990, tallas: ['M', 'L', 'XL'], colores: ['Gris humo'], imagen: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Prenda formal de tono neutro.' },
    { nombre: 'Camisa Casual Mostaza', precio: 22990, tallas: ['S', 'M'], colores: ['Mostaza'], imagen: 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Camisa casual con color destacado.' },
    { nombre: 'Camisa Regular Fit Blanca', precio: 21990, tallas: ['M', 'L', 'XL'], colores: ['Blanco'], imagen: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Básico masculino de corte regular.' },
]

const hombrePantalones: ProductSeed[] = [
    { nombre: 'Jean Recto Índigo', precio: 25990, tallas: ['M', 'L', 'XL'], colores: ['Índigo'], imagen: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Jeans rectos de uso diario.', nuevo: true },
    { nombre: 'Pantalón Chino Caqui', precio: 26990, tallas: ['S', 'M', 'L'], colores: ['Caqui'], imagen: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Chino premium de estilo pulido.' },
    { nombre: 'Pantalón Slim Negro', precio: 27990, tallas: ['M', 'L', 'XL'], colores: ['Negro'], imagen: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Corte slim para looks urbanos.' },
    { nombre: 'Jeans Azul Marino Moderno', precio: 28990, tallas: ['M', 'L'], colores: ['Azul marino'], imagen: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Denim oscuro con ajuste cómodo.' },
    { nombre: 'Pantalón Sastre Gris', precio: 30990, tallas: ['M', 'L', 'XL'], colores: ['Gris'], imagen: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Pantalón sastre para oficina.', nuevo: true },
    { nombre: 'Chino Azul Profundo', precio: 28490, tallas: ['S', 'M', 'L'], colores: ['Azul profundo'], imagen: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Chino con tono elegante y sobrio.' },
    { nombre: 'Jean Slim Carbón', precio: 26990, tallas: ['M', 'L', 'XL'], colores: ['Carbón'], imagen: 'https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Jean slim con lavado oscuro.' },
    { nombre: 'Pantalón Casual Arena', precio: 24990, tallas: ['S', 'M', 'L'], colores: ['Arena'], imagen: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Pantalón ligero para diario.' },
    { nombre: 'Jeans Recto Azul Claro', precio: 25990, tallas: ['M', 'L'], colores: ['Azul claro'], imagen: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Jean de silueta recta y look relajado.' },
    { nombre: 'Pantalón Stretch Negro', precio: 29990, tallas: ['M', 'L', 'XL'], colores: ['Negro'], imagen: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Comodidad extra con presencia formal.' },
    { nombre: 'Chino Verde Oliva', precio: 27490, tallas: ['S', 'M', 'L'], colores: ['Verde oliva'], imagen: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Tono actual para estilismos casuales.' },
    { nombre: 'Pantalón Corte Moderno Azul', precio: 28990, tallas: ['M', 'L', 'XL'], colores: ['Azul'], imagen: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Corte moderno con acabado sobrio.' },
    { nombre: 'Jeans Negro Recto', precio: 26990, tallas: ['M', 'L'], colores: ['Negro'], imagen: 'https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Denim recto en negro intenso.' },
    { nombre: 'Pantalón Sastre Azul Marino', precio: 31990, tallas: ['M', 'L', 'XL'], colores: ['Azul marino'], imagen: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Sastre masculino para eventos y oficina.' },
    { nombre: 'Pantalón Chino Beige Claro', precio: 25990, tallas: ['S', 'M', 'L'], colores: ['Beige'], imagen: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Básico premium para combinar fácil.' },
]

const hombreTrajes: ProductSeed[] = [
    { nombre: 'Traje Dos Piezas Azul Marino', precio: 82990, tallas: ['M', 'L', 'XL'], colores: ['Azul marino'], imagen: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Traje elegante y versátil.', nuevo: true },
    { nombre: 'Traje Formal Gris Grafito', precio: 89990, tallas: ['M', 'L'], colores: ['Gris grafito'], imagen: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Ideal para oficina y eventos.' },
    { nombre: 'Traje Corte Italiano Negro', precio: 94990, tallas: ['L', 'XL'], colores: ['Negro'], imagen: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Silueta estilizada de corte italiano.' },
    { nombre: 'Traje Lana Ligera Azul Acero', precio: 102990, tallas: ['M', 'L', 'XL'], colores: ['Azul acero'], imagen: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Lana ligera con acabado refinado.' },
    { nombre: 'Traje Slim Gris Humo', precio: 91990, tallas: ['M', 'L'], colores: ['Gris humo'], imagen: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Slim fit de aire contemporáneo.', nuevo: true },
    { nombre: 'Traje Ceremonia Azul Profundo', precio: 104990, tallas: ['L', 'XL'], colores: ['Azul profundo'], imagen: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Diseñado para eventos formales.' },
    { nombre: 'Traje Oficina Premium Negro', precio: 96990, tallas: ['M', 'L', 'XL'], colores: ['Negro'], imagen: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Prenda formal de presencia sobria.' },
    { nombre: 'Traje Clásico Gris Claro', precio: 87990, tallas: ['M', 'L'], colores: ['Gris claro'], imagen: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Corte clásico con apariencia limpia.' },
    { nombre: 'Traje Elegante Carbón', precio: 98990, tallas: ['L', 'XL'], colores: ['Carbón'], imagen: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Textura suave y presencia premium.' },
    { nombre: 'Traje Regular Azul Marino', precio: 85990, tallas: ['M', 'L', 'XL'], colores: ['Azul marino'], imagen: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Base segura para armario formal.' },
    { nombre: 'Traje Sastre Negro Intenso', precio: 99990, tallas: ['M', 'L'], colores: ['Negro'], imagen: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Traje sobrio con caída definida.' },
    { nombre: 'Traje Formal Piedra', precio: 88990, tallas: ['M', 'L', 'XL'], colores: ['Piedra'], imagen: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Tono claro para un look formal actual.' },
    { nombre: 'Traje Premium Azul Noche', precio: 106990, tallas: ['L', 'XL'], colores: ['Azul noche'], imagen: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Acabado premium con tono profundo.' },
    { nombre: 'Traje Ceremonia Gris Acero', precio: 101990, tallas: ['M', 'L'], colores: ['Gris acero'], imagen: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Opción refinada para ceremonias.' },
    { nombre: 'Traje Ejecutivo Azul Medio', precio: 92990, tallas: ['M', 'L', 'XL'], colores: ['Azul medio'], imagen: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Traje ejecutivo de silueta limpia.' },
]

const hombreAccesorios: ProductSeed[] = [
    { nombre: 'Cinturón de Cuero Negro', precio: 14990, tallas: ['M', 'L', 'XL'], colores: ['Negro'], imagen: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Cinturón de cuero con hebilla sobria.', nuevo: true },
    { nombre: 'Corbata Satinada Azul', precio: 12990, tallas: ['S', 'M'], colores: ['Azul'], imagen: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Corbata satinada para trajes formales.' },
    { nombre: 'Billetera Clásica Café', precio: 18990, tallas: ['S', 'M'], colores: ['Café'], imagen: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Billetera compacta de estilo clásico.' },
    { nombre: 'Pañuelo de Bolsillo Vino', precio: 11990, tallas: ['S', 'M'], colores: ['Vino'], imagen: 'https://images.unsplash.com/photo-1589756823695-278bc923f962?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Detalle elegante para blazers.', nuevo: false },
    { nombre: 'Bufanda Ligera Gris', precio: 16990, tallas: ['M', 'L'], colores: ['Gris'], imagen: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Bufanda liviana para clima fresco.', nuevo: true },
    { nombre: 'Pulsera Minimal Negra', precio: 13990, tallas: ['S', 'M'], colores: ['Negro'], imagen: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Pulsera discreta de acabado moderno.' },
    { nombre: 'Corbata Tejida Verde', precio: 14990, tallas: ['S', 'M'], colores: ['Verde'], imagen: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Corbata con textura y color actual.' },
    { nombre: 'Cinturón Café Oscuro', precio: 15990, tallas: ['M', 'L', 'XL'], colores: ['Café oscuro'], imagen: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Cinturón clásico para jeans y chinos.' },
    { nombre: 'Billetera Negra Premium', precio: 20990, tallas: ['S', 'M'], colores: ['Negro'], imagen: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Billetera premium de apariencia pulida.' },
    { nombre: 'Pañuelo Azul Marino', precio: 11990, tallas: ['S', 'M'], colores: ['Azul marino'], imagen: 'https://images.unsplash.com/photo-1589756823695-278bc923f962?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Accesorio fino para combinaciones formales.' },
    { nombre: 'Llavero de Cuero Negro', precio: 9990, tallas: ['S', 'M'], colores: ['Negro'], imagen: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Accesorio pequeño de cuero sobrio.' },
    { nombre: 'Corbata Vino Clásica', precio: 13990, tallas: ['S', 'M'], colores: ['Vino'], imagen: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Corbata de tono profundo y elegante.' },
    { nombre: 'Pulsera Trenzada Café', precio: 12990, tallas: ['S', 'M'], colores: ['Café'], imagen: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Pulsera casual con textura trenzada.' },
    { nombre: 'Bufanda Azul Carbón', precio: 17990, tallas: ['M', 'L'], colores: ['Azul carbón'], imagen: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Bufanda suave para looks de temporada.' },
    { nombre: 'Porta Tarjetas Grafito', precio: 14990, tallas: ['S', 'M'], colores: ['Grafito'], imagen: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Porta tarjetas compacto y elegante.' },
]

const mujerBlusas: ProductSeed[] = [
    { nombre: 'Blusa Satín Roja', precio: 23990, tallas: ['S', 'M', 'L'], colores: ['Rojo'], imagen: 'https://images.unsplash.com/photo-1603217192097-13c306522271?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Blusa satín con caída elegante.', nuevo: true },
    { nombre: 'Blusa Casual Marfil', precio: 21990, tallas: ['S', 'M', 'L'], colores: ['Marfil'], imagen: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Blusa ligera para uso diario.' },
    { nombre: 'Blusa Manga Globo Negra', precio: 24990, tallas: ['M', 'L'], colores: ['Negro'], imagen: 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Diseño actual con volumen suave.' },
    { nombre: 'Blusa Oficina Verde Salvia', precio: 25990, tallas: ['S', 'M', 'L'], colores: ['Verde salvia'], imagen: 'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Prenda refinada para oficina.' },
    { nombre: 'Blusa Rosa Palo Fluida', precio: 22990, tallas: ['S', 'M', 'L'], colores: ['Rosa palo'], imagen: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Silueta suave con aire femenino.', nuevo: true },
    { nombre: 'Blusa Blanca Corte Recto', precio: 21990, tallas: ['M', 'L'], colores: ['Blanco'], imagen: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Básico limpio para combinar fácil.' },
    { nombre: 'Blusa Azul Cielo Ligera', precio: 23490, tallas: ['S', 'M', 'L'], colores: ['Azul cielo'], imagen: 'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Tono suave y tela ligera.' },
    { nombre: 'Blusa Estampado Sutil Beige', precio: 24990, tallas: ['S', 'M'], colores: ['Beige'], imagen: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Detalle sutil con perfil elegante.' },
    { nombre: 'Blusa Negra Escote Suave', precio: 25990, tallas: ['M', 'L'], colores: ['Negro'], imagen: 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Prenda sobria de acabado actual.' },
    { nombre: 'Blusa Marfil Manga Corta', precio: 20990, tallas: ['S', 'M', 'L'], colores: ['Marfil'], imagen: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Ideal para clima cálido y oficina.' },
    { nombre: 'Blusa Coral Casual', precio: 22990, tallas: ['S', 'M'], colores: ['Coral'], imagen: 'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Color vivo con corte relajado.' },
    { nombre: 'Blusa Verde Oscuro Elegante', precio: 26990, tallas: ['M', 'L'], colores: ['Verde oscuro'], imagen: 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Tono profundo para looks premium.' },
    { nombre: 'Blusa Crema Satín', precio: 23990, tallas: ['S', 'M', 'L'], colores: ['Crema'], imagen: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Satín suave para outfits refinados.' },
    { nombre: 'Blusa Vino Formal', precio: 25990, tallas: ['M', 'L'], colores: ['Vino'], imagen: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Ideal para oficina o cena.' },
    { nombre: 'Blusa Negra Manga Plisada', precio: 27990, tallas: ['S', 'M', 'L'], colores: ['Negro'], imagen: 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Detalle plisado con presencia elegante.' },
]

const mujerPantalones: ProductSeed[] = [
    { nombre: 'Jean High Rise Azul', precio: 24990, tallas: ['S', 'M', 'L'], colores: ['Azul'], imagen: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Jean femenino de tiro alto.', nuevo: true },
    { nombre: 'Pantalón Recto Beige', precio: 26990, tallas: ['S', 'M', 'L', 'XL'], colores: ['Beige'], imagen: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Pantalón recto de look premium.' },
    { nombre: 'Pantalón Sastre Gris Claro', precio: 28990, tallas: ['M', 'L'], colores: ['Gris claro'], imagen: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Sastre para blusas y blazers.' },
    { nombre: 'Wide Leg Negro', precio: 30990, tallas: ['S', 'M', 'L'], colores: ['Negro'], imagen: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Silueta amplia y actual.' },
    { nombre: 'Jean Slim Índigo', precio: 25990, tallas: ['S', 'M', 'L'], colores: ['Índigo'], imagen: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Denim slim para uso diario.', nuevo: true },
    { nombre: 'Pantalón Blanco Roto', precio: 27990, tallas: ['S', 'M', 'L'], colores: ['Blanco roto'], imagen: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Tono claro con aire sofisticado.' },
    { nombre: 'Pantalón Casual Azul Oscuro', precio: 24990, tallas: ['M', 'L'], colores: ['Azul oscuro'], imagen: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Comodidad con acabado limpio.' },
    { nombre: 'Jean Recto Negro', precio: 26990, tallas: ['S', 'M', 'L'], colores: ['Negro'], imagen: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Recto clásico para combinar fácil.' },
    { nombre: 'Pantalón Sastre Camel', precio: 29990, tallas: ['M', 'L', 'XL'], colores: ['Camel'], imagen: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Pieza sobria con silueta elegante.' },
    { nombre: 'Pantalón Verde Salvia', precio: 28490, tallas: ['S', 'M', 'L'], colores: ['Verde salvia'], imagen: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Color actual para outfits suaves.' },
    { nombre: 'Wide Leg Marfil', precio: 31990, tallas: ['S', 'M', 'L'], colores: ['Marfil'], imagen: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Wide leg de acabado refinado.' },
    { nombre: 'Jean Azul Claro Moderno', precio: 25990, tallas: ['S', 'M'], colores: ['Azul claro'], imagen: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Denim ligero con perfil casual.' },
    { nombre: 'Pantalón Negro Stretch', precio: 29990, tallas: ['M', 'L', 'XL'], colores: ['Negro'], imagen: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Comodidad extra para uso continuo.' },
    { nombre: 'Pantalón Beige Suave', precio: 27490, tallas: ['S', 'M', 'L'], colores: ['Beige'], imagen: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Básico femenino de tono neutro.' },
    { nombre: 'Pantalón Gris Urbano', precio: 28990, tallas: ['M', 'L'], colores: ['Gris'], imagen: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Silueta urbana con textura sutil.' },
]

const mujerFormal: ProductSeed[] = [
    { nombre: 'Conjunto Formal Negro', precio: 51990, tallas: ['S', 'M', 'L'], colores: ['Negro'], imagen: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Conjunto formal de presencia sobria.', nuevo: true },
    { nombre: 'Vestido Ejecutivo Azul Profundo', precio: 55990, tallas: ['S', 'M', 'L'], colores: ['Azul profundo'], imagen: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Vestido ejecutivo para oficina.' },
    { nombre: 'Blazer y Falda Champaña', precio: 59990, tallas: ['M', 'L'], colores: ['Champaña'], imagen: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Set femenino elegante.' },
    { nombre: 'Set Elegante Vino', precio: 64990, tallas: ['S', 'M', 'L'], colores: ['Vino'], imagen: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Conjunto de ceremonia premium.' },
    { nombre: 'Conjunto Sastre Gris Humo', precio: 56990, tallas: ['S', 'M', 'L'], colores: ['Gris humo'], imagen: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Sastre femenino para eventos.', nuevo: true },
    { nombre: 'Vestido Negro Recto', precio: 52990, tallas: ['M', 'L'], colores: ['Negro'], imagen: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Vestido recto de estilo sobrio.' },
    { nombre: 'Blazer Crema Premium', precio: 49990, tallas: ['S', 'M', 'L'], colores: ['Crema'], imagen: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Blazer premium de tono suave.' },
    { nombre: 'Set Oficina Azul Acero', precio: 57990, tallas: ['M', 'L'], colores: ['Azul acero'], imagen: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Conjunto refinado para oficina.' },
    { nombre: 'Vestido Ceremonia Marfil', precio: 66990, tallas: ['S', 'M', 'L'], colores: ['Marfil'], imagen: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Vestido elegante con aire premium.' },
    { nombre: 'Blazer y Pantalón Negro', precio: 60990, tallas: ['M', 'L', 'XL'], colores: ['Negro'], imagen: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Set ejecutivo de silueta definida.' },
    { nombre: 'Conjunto Rosa Palo Formal', precio: 55990, tallas: ['S', 'M'], colores: ['Rosa palo'], imagen: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Formal femenino con tono suave.' },
    { nombre: 'Set Gris Claro Oficina', precio: 54990, tallas: ['M', 'L'], colores: ['Gris claro'], imagen: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Conjunto sobrio para reuniones.' },
    { nombre: 'Vestido Azul Noche Elegante', precio: 62990, tallas: ['S', 'M', 'L'], colores: ['Azul noche'], imagen: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Vestido de presencia refinada.' },
    { nombre: 'Conjunto Arena Premium', precio: 58990, tallas: ['S', 'M', 'L'], colores: ['Arena'], imagen: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Set premium de tono neutro.' },
    { nombre: 'Blazer Estructurado Blanco', precio: 51990, tallas: ['M', 'L'], colores: ['Blanco'], imagen: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Blazer estructurado para un look pulido.' },
]

const mujerAccesorios: ProductSeed[] = [
    { nombre: 'Bolso Estructurado Camel', precio: 21990, tallas: ['S', 'M'], colores: ['Camel'], imagen: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Bolso estructurado de estilo sobrio.', nuevo: true },
    { nombre: 'Cartera Compacta Marfil', precio: 17990, tallas: ['S', 'M'], colores: ['Marfil'], imagen: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Cartera pequeña de acabado limpio.' },
    { nombre: 'Cinturón Fino Dorado', precio: 15990, tallas: ['S', 'M', 'L'], colores: ['Dorado'], imagen: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Cinturón fino para marcar silueta.' },
    { nombre: 'Collar Delicado Rosado', precio: 13990, tallas: ['S', 'M'], colores: ['Rosado'], imagen: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Accesorio sutil para conjuntos femeninos.' },
    { nombre: 'Aretes Dorados Minimal', precio: 12990, tallas: ['S', 'M'], colores: ['Dorado'], imagen: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Aretes pequeños de perfil minimal.', nuevo: true },
    { nombre: 'Bolso Negro Premium', precio: 23990, tallas: ['S', 'M'], colores: ['Negro'], imagen: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Bolso compacto para looks formales.' },
    { nombre: 'Pañuelo Estampado Beige', precio: 11990, tallas: ['S', 'M'], colores: ['Beige'], imagen: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Pañuelo suave con estampado discreto.' },
    { nombre: 'Cartera Rosada Soft', precio: 16990, tallas: ['S', 'M'], colores: ['Rosado'], imagen: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Cartera compacta de tono suave.' },
    { nombre: 'Cinturón Negro Hebilla Oval', precio: 14990, tallas: ['S', 'M', 'L'], colores: ['Negro'], imagen: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Cinturón sobrio con hebilla decorativa.' },
    { nombre: 'Collar Dorado Largo', precio: 15990, tallas: ['S', 'M'], colores: ['Dorado'], imagen: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Collar largo para estilismos elegantes.' },
    { nombre: 'Bolso Marfil Estructurado', precio: 22990, tallas: ['S', 'M'], colores: ['Marfil'], imagen: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Bolso claro de apariencia premium.' },
    { nombre: 'Aretes Perla Moderna', precio: 13990, tallas: ['S', 'M'], colores: ['Perla'], imagen: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Detalle clásico con lectura actual.' },
    { nombre: 'Pañuelo Seda Azul', precio: 12990, tallas: ['S', 'M'], colores: ['Azul'], imagen: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Pañuelo ligero para bolso o cuello.' },
    { nombre: 'Cartera Camel Premium', precio: 18990, tallas: ['S', 'M'], colores: ['Camel'], imagen: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Cartera premium con tono cálido.' },
    { nombre: 'Pulsera Delicada Dorada', precio: 11990, tallas: ['S', 'M'], colores: ['Dorado'], imagen: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=400&h=500&q=80', descripcion: 'Pulsera fina para complementar looks.' },
]

export const products: Product[] = [
    ...createCategoryProducts('hombre', 'camisas', hombreCamisas, 1),
    ...createCategoryProducts('hombre', 'pantalones', hombrePantalones, 16),
    ...createCategoryProducts('hombre', 'trajes', hombreTrajes, 31),
    ...createCategoryProducts('hombre', 'accesorios', hombreAccesorios, 46),
    ...createCategoryProducts('mujer', 'blusas', mujerBlusas, 61),
    ...createCategoryProducts('mujer', 'pantalones', mujerPantalones, 76),
    ...createCategoryProducts('mujer', 'ropa-formal', mujerFormal, 91),
    ...createCategoryProducts('mujer', 'accesorios', mujerAccesorios, 106),
]

export const getProductsByGender = (genero: Genero) => products.filter((product) => product.genero === genero)

export const getProductsByCategory = (genero: Genero, categoria: Categoria) =>
    products.filter((product) => product.genero === genero && product.categoria === categoria)
