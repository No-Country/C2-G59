const axios = require("axios");

// Helpers
const { getAmountTotal } = require("./helpers/calculate");
const {
	getRandomInt,
	randomProductId,
	randomDozen,
	getCostOfProduct,
	randomBranchId,
	randomBranchSupplierId,
	randomSupplierInvoice,
	randomTransactionDate,
} = require("./helpers/generate-values");

const urlMockApi =
	"https://61d4b63a8df81200178a8e10.mockapi.io/api/v1/AllProducts";
const api = "http://localhost:4000/api";

const fillProductsTable = async () => {
	const { data: products } = await axios
		.get(urlMockApi)
		.catch((error) => console.warn(error));

	for (let product of products) {
		const { title: product_name, ...restProduct } = product;

		const newProduct = { product_name, ...restProduct };

		const resp = await axios
			.post(`${api}/products`, newProduct)
			.catch((error) => console.warn(error));

		console.log(resp.data);
	}
};

const fillPurchasOrderTable = async (purchaseOrderToAdd) => {
	for (let i = 0; i < purchaseOrderToAdd; i++) {
		console.log(`Generating ${i+1} of ${purchaseOrderToAdd}`);
		let products = [];
		const { trx_date:purchase_date, pay_date } = randomTransactionDate();

		// Generate random list of products
		console.log('Generating random list of products...');
		for (let i = 0; i < getRandomInt(12); i++) {
			const { data } = await axios
				.get(`${api}/products/${randomProductId()}`)
				.catch((error) => console.warn(error));

			const { id, price } = data.product;
			const isProductInList = products.some(
				(product) => product.id === id,
			);

			if (id !== null && price !== null && !isProductInList) {
				products.push({
					product_id: id,
					count: randomDozen(),
					cost: getCostOfProduct(price),
				});
			}
		}

		const purchase_order = {
			purchase_date,
			pay_date,
			payment_status: "complete",
			branch_id: randomBranchId(),
			supplier_id: randomBranchSupplierId(),
			invoice: randomSupplierInvoice(),
			amount: getAmountTotal(products),
			products,
		};

		console.log("Saving purchase order...");
		const resp = await axios.post(`${api}/purchase`, purchase_order);
		console.log(resp.data.purchaseOrder);

		// Lo siguiente se hizo antes de actualizar el controlador de ProductOrder
		// para que actualizara el stock automaticamente
		console.log("Saving updating products stock...");
		for (let product of products) {
			const res = await axios.put(
				`${api}/products/${product.product_id}/stock/${product.count}?action=increment`,
			).catch( (error) => console.log(error));
			console.log(res.data.msg);
		}
	}
};

const fillRetailSaleTable = async (salesToAdd) => {
	for (let i = 0; i < salesToAdd; i++) {
		console.log(`Generating ${i+1} of ${salesToAdd}`);
		let products = [];
		const { trx_date:sale_date, pay_date } = randomTransactionDate();

		// Generate random list of products
		console.log('Generating random list of products...');
		for (let i = 0; i < getRandomInt(6); i++) {
			const { data } = await axios
				.get(`${api}/products/${randomProductId()}`)
				.catch((error) => console.warn(error));

			const { id, price } = data.product;
			const isProductInList = products.some(
				(product) => product.id === id,
			);

			if (id !== null && price !== null && !isProductInList) {
				products.push({
					product_id: id,
					count: getRandomInt(3),
					price,
				});
			}
		}

		const retail_sale = {
			sale_date,
			pay_date,
			payment_status: "complete",
			branch_id: randomBranchId(),
			amount: getAmountTotal(products),
			products,
		};

		console.log("Saving sale...");
		const resp = await axios.post(`${api}/sales`, retail_sale);
		console.log(resp.data.retailSale);

		// Lo siguiente se hizo antes de actualizar el controlador de ProductOrder
		// para que actualizara el stock automaticamente
		// console.log("Saving updating products stock...");
		// for (let product of products) {
		// 	const res = await axios.put(
		// 		`${api}/products/${product.product_id}/stock/${product.count}?action=increment`,
		// 	).catch( (error) => console.log(error));
		// 	console.log(res.data.msg);
		// }
	}
};

// fillProductsTable();
// fillPurchasOrderTable(1);
// fillRetailSaleTable(92);
