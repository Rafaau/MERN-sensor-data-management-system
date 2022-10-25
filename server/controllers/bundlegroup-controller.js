const BundleGroup = require("../models/bundlegroup-model")
const ReadingBundle = require("../models/readingbundle-model")
const SensorData = require("../models/sensordata-model")

getBundleGroupsByUserId = async (req, res) => {
    await BundleGroup.find({ userId: req.params.userId }, (err, bundles) => {
        if (err) {
            return res
                .status(400)
                .json({ success: false, error: err })
        }

        if (!bundles.length) {
            return res
                .status(404)
                .json({ success: false, error: "Bundle groups not found" })
        }

        return res
            .status(200)
            .json({ success: true, data: bundles })
    }).catch(err => console.log(err))
}

createBundleGroup = async (req, res) => {
    const body = req.body

    if (!body) {
        return res
            .status(400)
            .json({ success: false, error: "You must provide bundle group data" })
    }

    const bundleGroup = new BundleGroup(body)

    if (!bundleGroup) {
        return res
            .status(400)
            .json({ success: false, error: err })
    }

    bundleGroup
        .save()
        .then(() => {
            return res
                .status(201)
                .json({ success: true, data: bundleGroup })
        }).catch(error => {
            return res
                .status(400)
                .json({ success: false, message: "Bundle group not created" })
        })
}

deleteBundleGroup = async (req, res) => {
    await BundleGroup.findOneAndDelete({ _id: req.params._id }, (err, group) => {
        if (err) {
            return res
                .status(400)
                .json({ succcess: false, error: err })
        }

        if (!group) {
            return res
                .status(404)
                .json({ success: false, error: "Bundle group not found" })
        }

        return res
            .status(200)
            .json({ success: true, data: group })
    }).catch(err => console.log(err))
}

module.exports = {
    getBundleGroupsByUserId,
    createBundleGroup,
    deleteBundleGroup,
}