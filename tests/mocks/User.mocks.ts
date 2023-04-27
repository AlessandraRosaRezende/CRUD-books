const user = {
    id: 1,
    name: 'Jon Doe',
    email: 'jondoe@email.com',
    password: 'JonDoe'
};

const users = [
    user,
    {
        id: 2,
        name: 'Jane Doe',
        email: 'janedoe@email.com',
        password: 'JaneDoe'
    }
];

const validLoginBody = { email: 'jondoe@email.com', password: 'JonDoe'};
const invalidPasswordLoginBody = { email: 'jondoe@email.com', password: 'Jon'};
const invalidEmailLoginBody = { email: 'invalid_email', password: 'JonDoe'};

export { user, users, invalidEmailLoginBody, invalidPasswordLoginBody, validLoginBody };