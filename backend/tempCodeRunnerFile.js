  app.post('/signup', async (req, res) => {
    try {
            const user = new users({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            await user.save();
            res.json({
                success:1,
                message:"User registered successfully"
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success:0,
                message:"Error registering user"
            });
        }
    });