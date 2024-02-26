const objectId = (value, helpers) => {
    if(!value.match(/^[0-9a-fA-F]{24}$/)) {
        return helpers.message("{{#label}} must be valid id")
    }

    return value;
}

const endTimeNotBeforStartTime = (value, helpers) => {
    const startTime = helpers.state.ancestors[0].start_time;
    const startHour = startTime.hour + (startTime.ampm === 'PM' && startTime.hour !== 12 ? 12 : 0);
    const startMinutes = startTime.minutes;
    const endHour = value.hour + (value.ampm === 'PM' && value.hour !== 12 ? 12 : 0);
    const endMinutes = value.minutes;

    const startTimeInMinutes = startHour * 60 + startMinutes;
    const endTimeInMinutes = endHour * 60 + endMinutes;

    if (endTimeInMinutes <= startTimeInMinutes) {
        return helpers.message("{{#label}} should be after the start time")
    }

    return value;
}

module.exports = {objectId, endTimeNotBeforStartTime}