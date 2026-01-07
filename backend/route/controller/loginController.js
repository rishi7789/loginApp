const users = [{
    email: 'rishi@gmail.com',
    password: 'rishi@123'
}]

const loginController = (req, res) => {
    try {
        const { email, password } = req.body;
        const user = users.find((u) => u.email === email && u.password === password);

        if (!user) {
            return res.status(400).json({
                status: 400,
                message: 'Invalid email or password'
            });
        }
        else {
            return res.status(200).json({
                status: 200,
                message: 'Login successful',
                user: user
            });
        }

    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Internal server error'
        });
    }
};

export default loginController;