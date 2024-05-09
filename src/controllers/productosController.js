const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productosData.json');

const getJson = () => {
	const productsFilePath = path.join(__dirname, '../data/productosData.json');
	const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	return products;
}

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		const products = getJson();
		return res.render('products', {
			products,
			toThousand
		});
	},

    figures: (req, res) => {
		const products = getJson();
		const recents = products.filter(product => product.category == "recientes")
		const news = products.filter(product => product.category == "nuevos")
		res.render("figuras",{recents,news,toThousand})
	},

	detail: (req, res) => {
		const {id} = req.params;
		const products = getJson();
		const product = products.find(product => product.id == id);
		res.render("detail", { title: product.name, product, toThousand });
	},
};

module.exports = controller;