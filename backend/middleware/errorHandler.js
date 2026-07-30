function errorHandler(error, request, response, next) {
    console.error(error);

    if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
        return response.status(400).json({
            error: "Bad Request",
            message: "Invalid JSON"
        });
    }

    response.status(500).json({
        error: "Internal Server Error",
        message: "Something went wrong"
    });
}

module.exports = errorHandler;