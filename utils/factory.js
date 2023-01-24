exports.findAllModel = async (Model, req, res) => {
	try {
		const models = await Model.findAll();
		res.status(200).json({ models });
	} catch (err) {
		res.status(404).json(err.message);
	}
};

exports.findModel = async (Model, req, res) => {
	try {
		const model = await Model.findOne({
			where: { id: req.params.id },
		});
		res.status(200).json(model);
	} catch (err) {
		const statusCode = err.statusCode || 500;
		res.status(statusCode).json(err.message);
	}
};

exports.createModel = async (Model, req, res) => {
	try {
		const model = await Model.create(req.body);
		res.status(200).json(model);
	} catch (err) {
		const statusCode = err.statusCode || 500;
		res.status(statusCode).json(err.message);
	}
};

exports.updateModel = async (Model, req, res) => {
	try {
		const model = await Model.update(req.body, {
			where: { id: req.params.id },
		});
		res.status(200).json(model);
	} catch (err) {
		const statusCode = err.statusCode || 500;
		res.status(statusCode).json(err.message);
	}
};

exports.deleteModel = async (Model, req, res) => {
	try {
		const model = await Model.destroy({
			where: { id: req.params.id },
		});
		res.status(200).json(model);
	} catch (err) {
		const statusCode = err.statusCode || 500;
		res.status(statusCode).json(err.message);
	}
};
