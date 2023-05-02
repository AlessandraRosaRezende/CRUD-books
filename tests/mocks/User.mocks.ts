const user = {
    id: 1,
    name: 'Jon Doe',
    email: 'jondoe@email.com',
    password: 'JonDoe'
};

const wrongPassUser = {
    id: 1,
    name: 'Jon Doe',
    email: 'jondoe@email.com',
    password: 'xxxxxxxxxx'
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

const validLoginBody = { email: 'admin@admin.com', password: 'secret_admin' };
const invalidPasswordLoginBody = { email: 'jondoe@email.com', password: 'Jon'};
const invalidEmailLoginBody = { email: 'invalid_email', password: 'JonDoe'};
const userRegistered = { ...user, password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'}

export { 
    user, 
    users, 
    invalidEmailLoginBody, 
    invalidPasswordLoginBody, 
    validLoginBody,
    wrongPassUser,
    userRegistered
};
