const qandaController = {};

qandaController.get = (req, res) => {
	res.json({
		something: 'else'
	});
};

export default qandaController;