const moment = require('moment')

const formatDate = (dateString) => {
    const formats = ['DD-MM-YYYY', 'MM-DD-YYYY', 'YYYY-MM-DD', 'DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY/MM/DD'];

    for(let format of formats) {
        const momentDate = moment(dateString, format, true)

        if(momentDate.isValid()) {
            return momentDate.format('YYYY-MM-DD')
        }
    }

    return null;
}

module.exports = formatDate