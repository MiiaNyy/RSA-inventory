function mapErrorMessages (errors, itemName) {
    return errors.map(item => item.param === itemName ? item.msg : '')
}

module.exports = mapErrorMessages;
