const axios = require("axios");

// Helpers
const { getAmountTotal } = require("./helpers/calculate");
const {
	getRandomInt,
	getRandomIntBetween,
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
// const api = "https://no-country-c2g59.herokuapp.com/";

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
		const { trx_date:sale_date, pay_date } = randomTransactionDate('2022-01-11', '2022-01-28');

		// Generate random list of products
		console.log('Generating random list of products...');
		for (let i = 0; i < getRandomInt(6); i++) {
			const { data } = await axios
				.get(`${api}/products/${randomProductId()}`)
				.catch((error) => console.warn(error));

			const { id, price, stock } = data.product;
			const isProductInList = products.some(
				(product) => product.id === id,
			);
			console.log({ id, price, stock });
			// const productCountToSell = getRandomInt(3); // Para ventas pequeñas
			const productCountToSell = getRandomIntBetween(12,1); // Para ventas grandes
			console.log({productCountToSell});

			if (id !== null && price !== null && !isProductInList && productCountToSell <= stock) {
				products.push({
					product_id: id,
					count: productCountToSell,
					price,
				});
			}
		}

		const retail_sale = {
			sale_date,
			pay_date,
			payment_status: "complete",
			// branch_id: randomBranchId(),
			branch_id: 3,
			amount: getAmountTotal(products),
			products,
		};

		// Verificar que por lo menos haya un producto en el array
		if (products.length > 0) {
			console.log("Saving sale...");
			const resp = await axios.post(`${api}/sales`, retail_sale);
			console.log(resp.data.retailSale);
		} else {
			console.log("No product in list... Next!");
		}

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


const deletePurchaseOrder = async(purchaseToDelete) => {

};

const deleteRetailSales = async(salesToDelete) => {
	// const allRetailSales = await axios/api/sales
	for (let i = 0; i < salesToDelete; i++) {



	}
};

// fillProductsTable();
// fillPurchasOrderTable(1);
fillRetailSaleTable(20);
