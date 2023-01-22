export const getBestTimeOfDay = (photos) => {
    let bestTimes = {}

    photos.map((photo) => {
        if (bestTimes.hasOwnProperty(photo.bestTimeOfDay))
            bestTimes[photo.bestTimeOfDay] += 1
        else {
            bestTimes[photo.bestTimeOfDay] = 1
        }
    })

    let max = 0;
    let bestTime = ""
    for (let dayTime in bestTimes) {
        if (bestTimes[dayTime] > max) {
            max = bestTimes[dayTime]
            bestTime = dayTime
        }
    }

    return bestTime;
}

export const getConditions = (photos)=>{
    let conditions =[]

    photos.map((photo)=>{
        if(!conditions.includes(photo.condition[0])){
            (conditions).push(photo.condition[0])
        }
    })
    return conditions.slice(0, 3);
}

export const getTransportation = (photos) => {
    let transportation = []

    photos.map((photo) => {
        if(!transportation.includes(photo.transportation[0])){
            (transportation).push(photo.transportation[0])
        }
    })
    return transportation.flat().slice(0, 3);
}