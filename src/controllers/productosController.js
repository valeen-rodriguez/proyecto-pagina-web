const fs = require('fs');
const path = require('path');
const productos = require('../data/productosAll.json');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const calcularPrecioTotal = (carrito) => {
	let totalPrice = 0;
	carrito.forEach(item => {
	  totalPrice += item.price;
	});
	return totalPrice;
};

const getCart = () => {
    const cartFilePath = path.join(__dirname, '../data/cart.json');
    try {
        const cartData = fs.readFileSync(cartFilePath, 'utf-8');
        return JSON.parse(cartData);
    } catch (error) {
        return [];
    }
};

const saveCart = (cart) => {
    const cartFilePath = path.join(__dirname, '../data/cart.json');
    fs.writeFileSync(cartFilePath, JSON.stringify(cart, null, 2));
};

let carrito = getCart();

//////////////////////////////
const getProductosAll = () => {
	const productssFilePath = path.join(__dirname, '../data/productosAll.json');
	const products = JSON.parse(fs.readFileSync(productssFilePath, 'utf-8'));
	return products;
}
/////////////////////////////

const getJson = () => {
	const productsFilePath = path.join(__dirname, '../data/productosData.json');
	const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	return products;
}

const keepJson = () => {
	const productFilePath = path.join(__dirname, '../data/productosManga.json');
	const products = JSON.parse(fs.readFileSync(productFilePath, 'utf-8'));
	return products;
}

const nowJson = () => {
	const productoFilePath = path.join(__dirname, '../data/productosRopa.json');
	const products = JSON.parse(fs.readFileSync(productoFilePath, 'utf-8'));
	return products;
}

const controller = {
	//INICIO & DETALLE//
	index: (req, res) => {
		const products = getJson();
		return res.render('products', {products, toThousand});
	},

	detail: (req, res) => {
		const {id} = req.params;
		const products = getJson();
		const product = products.find(product => product.id == id);
		res.render("detail", { title: product.name, product, toThousand });
	},

	//FIGURAS//
    figures: (req, res) => {
		const products = getJson();
		const recents = products.filter(product => product.category == "recientes")
		const news = products.filter(product => product.category == "nuevos")
		res.render("figuras",{recents,news,toThousand})
	},

	//MANGAS & DETALLE//
	manga: (req, res) => {
		const products = keepJson();
		const romance = products.filter(product => product.category == "romance")
		const shonen = products.filter(product => product.category == "shonen")
		res.render("manga",{romance,shonen,toThousand})
	},

	detailManga: (req, res) => {
		const {id} = req.params;
		const products = keepJson();
		const product = products.find(product => product.id == id);
		res.render("detailManga", { title: product.name, product, toThousand });
	},

	//ROPA & DETALLE//
	clothes: (req, res) => {
		const products = nowJson();
		const remera = products.filter(product => product.category === "remera");
		res.render("clothes", { remera, toThousand });
	},

	detailClothes: (req, res) => {
		const {id} = req.params;
		const products = nowJson();
		const product = products.find(product => product.id == id);
		res.render("detailClothes", { title: product.name, product, toThousand });
	},

	//	PRODUCTOS //
	products: (req,res) => {
        const productosData = getProductosAll();
        const producto = productosData.filter(product => product.category == "producto");
        res.render("productos", {producto, toThousand});
    },

    detailProducto: (req, res) => {
		const {id} = req.params;
		const products = getProductosAll();
		const product = products.find(product => product.id == id);
		res.render("detailProducto", { title: product.name, product, toThousand });
	},

	
	//CARRITO//
	carrito: (req, res) => {
		const productsJson = getJson();
		const productManga = keepJson();
		const productClothes = nowJson();
		const productsAll = getProductosAll();
		const products = [...productsJson, ...productsAll, ...productManga, ...productClothes];
		const totalPrice = calcularPrecioTotal(carrito);
		res.render('carrito', { cart: carrito, products: products, toThousand, totalPrice });
	},
	
	addToCart: (req, res) => {
		const productId = req.body.productId;
		const productsJson = getJson();
		const productManga = keepJson();
		const productClothes = nowJson();
		const productsAll = getProductosAll();
		const products = [...productsJson, ...productsAll, ...productManga, ...productClothes];
		const productoEncontrado = products.find(producto => producto.id == productId);
	
		if (productoEncontrado) {
			carrito.push(productoEncontrado);
			saveCart(carrito);
			res.redirect('/products/carrito');
		} else {
			res.status(404).send('Producto no encontrado');
		}
	}

};

module.exports = controller;