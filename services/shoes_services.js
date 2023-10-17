export default function ShoesDB(db) {

    async function all() {
        try {
            const results = await db.any('SELECT * FROM shoes');
            console.log(results);
            return results;
        } catch (error) {
            return false
        }
    }

    async function shoe_name(brand) {
        try {
            const results = await db.any('SELECT shoe_name FROM shoes WHERE brand = $1', [brand])
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
            return results;
        } catch (error) {
            return false
        }
    }

    async function update(stock_no, shoe_id) {
        try {
            await db.none('UPDATE shoes SET stock = $1 WHERE shoe_id =$2', [stock_no, shoe_id])
        } catch (error) {
            return false
        }
    }

    async function add_shoes(shoe_details) {
        try {
            let data = [
                shoe_details.brand,
                shoe_details.shoe_name,
                shoe_details.color,
                shoe_details.shoe_size,
                shoe_details.price,
                shoe_details.quantity,
               shoe_details.img_url]

            await db.none('INSERT INTO shoes (brand, shoe_name, color, shoe_size, price, stock, img_url) VALUES ($1, $2, $3, $4, $5, $6)', [data])

        } catch (error) {
            return false
        }
    }

    return {
        all,
        update,
        allSizes,
        add_shoes,
        shoe_name,
        getBrandAndSize
    }
}