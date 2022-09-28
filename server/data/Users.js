import bcrypt from "bcryptjs";
const users = [
    {
        name: "Admin",
        email: "augustinegodspower40@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true
    },
    {
        name: "User",
        email: "augustinegodspower20@gmail.com",
        password: bcrypt.hashSync("567890", 10),
    }
];

export default users;