const fs = require('fs');
const path = require('path');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const getProductosData = () => {
    const productsFilePath = path.join(__dirname, '../data/productosData.json');
    return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
};

const getProductosAll = () => {
	const productssFilePath = path.join(__dirname, '../data/productosAll.json');
	const products = JSON.parse(fs.readFileSync(productssFilePath, 'utf-8'));
	return products;
}

const controller = {
    index: (req, res) => {
        const productosData = getProductosData();
        const recents = productosData.filter(product => product.category == "recientes");
        const news = productosData.filter(product => product.category == "nuevos");
        res.render("index", {recents, news, toThousand});
    },
    contact: (req, res) => {
        res.render("contact");
    },
    search: (req, res) => {
        const { keywords } = req.query;
        const allProducts = getProductosAll();
        const result = allProducts.filter(product => product.name.toLowerCase().includes(keywords.toLowerCase()));
        return res.render('search', {result, keywords, toThousand});
    },

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
};

module.exports = controller;
