const Users = require("../models/Users");

const getAllUsers = async (req, res) => {
    try {
        const users = await Users.find();

        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getSpecUser = async (req, res) => {
    const roll = req.params.roll;

    try {
        const user = await Users.findOne({ roll: roll });

        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// const createNewUsers = async (req, res) => {
//     console.log(req.body);
//     const newUsers = new Users({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password,
//         admin: req.body.admin
//     })
//     try {
//         await newUsers.save();

//         res.status(201).json(newUsers);

//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }

// }

const updateUsers = async (req, res) => {
    const roll = req.params.roll;
    try {
        await Users.findOneAndUpdate({
            roll: roll,
        },
            {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                admin: req.body.admin
            }
        )
        res.status(200).json("Update Successfully");

    } catch (error) {
        res.status(401).json({ message: error.message });
    }

}

const deleteUsers = async (req, res) => {
    const roll = req.params.roll;

    try {
        await Users.findOneAndRemove({ roll: roll });
        res.status(200).json({ message: "Delete Successfully" });

    } catch (error) {
        res.status(402).json({ message: error.message });
    }
}
// const isAdmin = async (req, res) => {
//     try {
//         await Users.findOneAndUpdate({ roll: req.params.roll }, { admin: true });
//         res.status(200).json({ message: "You are an admin" });

//     } catch (error) {
//         res.status(402).json({ message: error.message });
//     }
// }
// const isMember = async (req, res) => {
//     const roll = req.params.roll;

//     try {
//         await Users.findOneAndUpdate({ roll: roll }, { admin: false });
//         res.status(200).json({ message: "You are only an user" });

//     } catch (error) {
//         res.status(402).json({ message: error.message });
//     }
// }


module.exports.getAllUsers = getAllUsers;
//module.exports.createNewUsers = createNewUsers;
module.exports.getSpecUser = getSpecUser;
module.exports.updateUsers = updateUsers;
module.exports.deleteUsers = deleteUsers;
//module.exports.isAdmin = isAdmin;
//module.exports.isMember = isMember;