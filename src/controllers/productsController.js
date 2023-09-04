const fs = require('fs');
const path = require('path');
const { readJSON, writeJSON } = require('../data');
const products = readJSON('products.json');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		return res.render('products', {
			products,
			toThousand			
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const product = products.find(product => product.id === +req.params.id)
		return res.render('detail', {
			...product,
			toThousand 
		})
	},

	// Create - Form to create
	create: (req, res) => {
		return res.render('product-create-form', {
			
		})
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const {name, price, discount, description, category} = req.body
		let newproduct = {
			id : products[products.length - 1].id + 1,
			name : name.trim(),
			price : +price,
			discount : +discount,
			category,
			description : description.trim(),
			image: req.file ? req.file.filename : null,
		}

		products.push(newproduct);

		writeJSON(products, 'products.json')

		return res.redirect("/products")
	},

	// Update - Form to edit
	edit: (req, res) => {
		const product = products.find(product => product.id === +req.params.id)
		return res.render('product-edit-form', {
			...product
		})
	},
	// Update - Method to update
	update: (req, res) => {

		const {name, price, discount, description, category} = req.body;
		const productsModify = products.map(product => {

			if (product.id === +req.params.id){

				product.name = name.trim();
				product.price = +price;
				product.discount = +discount;
				product.category = category;
				product.description = description.trim();
			}

			return product
		})

		writeJSON(productsModify, 'products.json')

		return res.redirect("/products")
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		
		const productsDelete = products.filter(product => product.id !== +req.params.id);

		
		writeJSON(productsDelete, 'products.json')

		return res.redirect("/products")
	}
	
};

module.exports = controller;