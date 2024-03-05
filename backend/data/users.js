import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'obi wan kenobi ',
        email: 'BenKenobi@email.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Jar Jar Binks',
        email: 'binks@email.com',
        password: bcrypt.hashSync('123456', 10),
    },
];

export default users;