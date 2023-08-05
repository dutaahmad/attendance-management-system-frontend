export const SYSTEM_ATTENDANCE_COORDINATE = {
    latitude: -7.455836,
    longitude: 109.283747
}

const earthRadius = 6371 //in Kilometers

export function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

export function calculateDistance(lat1, long1, lat2, long2) {

    let a = (
        (Math.sin(deg2rad(lat2 - lat1) / 2) * Math.sin(deg2rad(lat2 - lat1) / 2))
        +
        (Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)))
        *
        (Math.sin(deg2rad(long2 - long1) / 2) * Math.sin(deg2rad(long2 - long1) / 2))
    )

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return (earthRadius * c)
}