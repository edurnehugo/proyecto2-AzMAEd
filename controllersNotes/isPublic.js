

const toPublicNote = async (req, res, next) => {
  let connection;
    try {
        const 
    const { id } = req.params;

    const tweet = await getTweetById(id);

    res.send({
      status: 'ok',
      data: tweet,
    });
  } catch (error) {
    next(error);
  }
};
