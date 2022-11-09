const ReadingBundle = require("../models/readingbundle-model")

getBundles = async (req, res) => {
    await ReadingBundle.find({}, (err, bundles) => {     
        if (err) {
            return res
                .status(400)
                .json({ success: false, error: err })
        }
        
        if (!bundles.length) {
            return res
                .status(404)
                .json({ success: false, error: "Bundles not found"})
        }

        return res
            .status(200)
            .json({ success: true, data: bundles })
    }).catch(err => console.log(err))
}

getBundleByName = async (req, res) => {
    await ReadingBundle.findOne({ name: req.params.name }, (err, bundle) => {
        if (err) {
            return res
                .status(400)
                .json({ success: false, error: err })
        }

        if (!bundle) {
            return res
                .status(404)
                .json({ success: false, error: "Bundle not found" })
        }

        return res
            .status(200)
            .json({ success: true, data: bundle })
    }).catch(err => console.log(err))
}

getBundlesByUserId = async (req, res) => {
    await ReadingBundle.find({ userId: req.params.userId }, (err, bundles) => {
        if (err) {
            return res
                .status(400)
                .json({ success: false, error: err })
        }

        if (!bundles.length) {
            return res
                .status(404)
                .json({ success: false, error: "Bundles not found" })
        }

        return res
            .status(200)
            .json({ success: true, data: bundles })
    }).catch(err => console.log(err))
}

getBundlesByGroupId = async (req, res) => {
    await ReadingBundle.find({ groupId: req.params.groupId }, (err, bundles) => {
        if (err) {
            return res
                .status(400)
                .json({ success: false, error: err })
        }

        if (!bundles.length) {
            return res
                .status(404)
                .json({ success: false, error: "Bundles not found" })
        }

        return res
            .status(200)
            .json({ success: true, data: bundles })
    }).catch(err => console.log(err))
}

getBundleById = async (req, res) => {
    await ReadingBundle.findOne({ _id: req.params._id }, (err, bundle) => {
        if (err) {
            return res
                .status(400)
                .json({ success: false, error: err })
        }

        if (!bundle) {
            return res
                .status(404)
                .json({ success: false, error: "Bundle not found" })
        }

        return res
            .status(200)
            .json({ success: true, data: bundle})
    }).catch(err => console.log(err))
}

getBundlesByShared = async (req, res) => {
    await ReadingBundle.find({ isShared: true }, (err, bundles) => {
        if (err) {
            return res
                .status(400)
                .json({ success: false, error: err })
        }

        if (!bundles.length) {
            return res
                .status(404)
                .json({ success: false, error: "Bundles not found" })
        }

        return res
            .status(200)
            .json({ success: true, data: bundles })
    }).catch(err => console.log(err))
}

createBundle = async (req, res) => {
    const body = req.body

    if (!body) {
        return res
            .status(400)
            .json({ success: false, error: "You must provide a bundle data" })
    }

    const bundle = new ReadingBundle(body)

    if (!bundle) {
        return res
            .status(400)
            .json({ success: false, error: err })
    }

    bundle
        .save()
        .then(() => {
            return res
                .status(201)
                .json({
                    success: true,
                    id: bundle._id,
                    message: "Bundle created!"
                })
        }).catch(error => {
            return res
                .status(400)
                .json({ 
                    success: false,
                    message: "Bundle not created"
                })
        })
}

updateBundle = async (req, res) => {
    const body = req.body
    if (!body) {
        return res
            .status(400)
            .json({ success: false, error: "You must provide a bundle to update" })
    }

    ReadingBundle.findOne({ _id: req.params._id }, (err, bundle) => {
        if (err) {
            return res
                .status(404)
                .json({ success: false, error: "Bundle not found" })
        }

        bundle.groupId = body.groupId
        bundle.isShared = body.isShared

        bundle
            .save()
            .then(() => {
                return res
                    .status(200)
                    .json({ 
                        success: true,
                        data: bundle,
                        message: "Bundle updated"
                    })
            }).catch(error => {
                return res
                    .status(400)
                    .json({ 
                        success: false, 
                        message: "Bundle not updated"    
                    })
            })
    })
}

deleteBundle = async (req, res) => {
    await ReadingBundle.findOneAndDelete({ _id: req.params._id }, (err, bundle) => {
        if (err) {
            return res
                .status(400)
                .json({ success: false, error: err })
        }

        if (!bundle) {
            return res
                .status(404)
                .json({ success: false, error: "Bundle not found" })
        }

        return res
            .status(200)
            .json({ success: true, data: bundle})
    }).catch(err => console.log(err))
}

module.exports = {
    getBundles,
    getBundleByName,
    getBundlesByUserId,
    getBundlesByGroupId,
    getBundleById,
    getBundlesByShared,
    createBundle,
    updateBundle,
    deleteBundle,
}