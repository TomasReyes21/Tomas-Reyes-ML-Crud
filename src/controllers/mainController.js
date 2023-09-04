const fs = require('fs');
const path = require('path');

const { readJSON, writeJSON } = require('../data');
const products = readJSON('products.json');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		return res.render('index',{
			productsVisited : products.filter(product => product.category === "visited"),
			productsInsale : products.filter(product => product.category === "in-sale"),
			toThousand			
		})
	},
	search: (req, res) => {
		const results = products.filter(product => product.name.toLowerCase().includes(req.query.keywords.toLowerCase()))
		return res.render('results', {
			results,
			toThousand,
			keywords : req.query.keywords
		})
	}	
};

module.exports = controller;
