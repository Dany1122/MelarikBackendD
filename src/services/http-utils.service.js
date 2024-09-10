const httpResponse = async (res, statusCode, success, params = {}) => {
    params.success = success;

    return res.status(statusCode).json(params);
};

module.exports = {
    httpResponse
}