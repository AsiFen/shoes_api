
export default function ShoesDB(db) {
    const handleDatabaseError = (error) => {
        //console.error(error);
        return error;
    };

    const all = async () => {
        try {
            return await db.any('SELECT * FROM shoes');
        } catch (error) {
            return handleDatabaseError(error);
        }
    };

    const getBrandName = async () => {
        try {
            return await db.any('SELECT DISTINCT brand FROM shoes');
        } catch (error) {
            return handleDatabaseError(error);
        }
    };

    const shoe_name = async (brand) => {
        try {
            return await db.any('SELECT * FROM shoes WHERE brand = $1', [brand]);
        } catch (error) {
            return handleDatabaseError(error);
        }
    };

    const allSizes = async (size) => {
        try {
            return await db.any('SELECT * FROM shoes WHERE shoe_size = $1', [size]);
        } catch (error) {
            return handleDatabaseError(error);
        }
    };

    const getAllSizes = async () => {
        try {
            return await db.any('SELECT DISTINCT shoe_size FROM shoes');
        } catch (error) {
            return handleDatabaseError(error);
        }
    };

    const getAllColor = async () => {
        try {
            return await db.any('SELECT DISTINCT color FROM shoes');
        } catch (error) {
            return handleDatabaseError(error);
        }
    };

    const filterByColors = async (color) => {
        try {
            let results = await db.any('SELECT * FROM shoes WHERE color = $1', [color]);
            return results
        } catch (error) {
            return handleDatabaseError(error);
        }
    };


    const getBrandAndSize = async (shoe_size, brand) => {
        try {
            let results = await db.any('SELECT * FROM shoes WHERE shoe_size = $1 AND brand = $2', [shoe_size, brand]);
            return results;
        } catch (error) {
            return handleDatabaseError(error);
        }
    };

    const update = async (stock_no, shoe_id) => {
        try {
            await db.none('UPDATE shoes SET stock = $1 WHERE shoe_id = $2', [stock_no, shoe_id]);
        } catch (error) {
            return handleDatabaseError(error);
        }
    };

    const add_shoes = async (shoe_details) => {
        try {
            const data = [
                shoe_details.brand,
                shoe_details.shoe_name,
                shoe_details.color,
                (shoe_details.shoe_size),
                shoe_details.price,
                (shoe_details.stock),
                shoe_details.img_url
            ]
            await db.none('INSERT INTO shoes (brand, shoe_name, color, shoe_size, price, stock, img_url) VALUES ($1, $2, $3, $4, $5, $6, $7)', data);
            
        } catch (error) {
            return error
        }
    };

    return {
        all,
        update,
        allSizes,
        add_shoes,
        shoe_name,
        getAllSizes,
        getAllColor,
        getBrandName,
        filterByColors,
        getBrandAndSize
    };
}
