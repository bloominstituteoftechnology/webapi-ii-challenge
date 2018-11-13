const post = (req, res) => {
    const title = req.params.title;
    const contents = req.params.contents;

    res.json({title: title})
    res.json({contents: contents})
}

module.exports = post;