export function isMongoId(id) {
    // check if id is a mongo id
    return !(id.length !== 24 && id !== 'all');
}
