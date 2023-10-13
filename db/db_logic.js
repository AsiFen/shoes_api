export default function ShoesDB(db) {
    async function all() {
        try {
            const results = await db.any('SELECT * FROM shoes');
            return results;
        } catch (error) {
            return false
        }
    }

    async function shoe_name(brand) {
        try {
            const results = await db.any('SELECT shoe_name FROM shoes WHERE brand = $1', [brand])
            //  console.log(results, 'i');
            return results;
        } catch (error) {
            return false
        }
    }

    async function allSizes(size) {
        try {
            const results = await db.any('SELECT * FROM shoes WHERE shoe_size = $1', [size])
            return results;
        } catch (error) {
            return false
        }
    }

    async function getBrandAndSize(shoe_size, brand) {
        try {
            const results = await db.any('SELECT * FROM shoes WHERE shoe_size = $1 AND brand = $2', [shoe_size, brand])
        } catch (error) {
            return false

        }
    }

    return {
        all,
        shoe_name,
        allSizes,
        getBrandAndSize,
    }
}