export default function Router(shoesDB) {
    async function show(req, res) {
        const data = await shoesDB.all();
        res.json(data);
    }

    async function brand_name(req, res) {
        const brand = req.params.brandname;
        const shoe_name = await shoesDB.shoe_name(brand);
        res.json(shoe_name);
    }

    async function getBrand(req, res) {
        const brandnames = await shoesDB.getBrandName();
        res.json(brandnames);
    }

    async function allSize(req, res) {
        const size = req.params.size;
        const all_shoes = await shoesDB.allSizes(size);
        res.json(all_shoes);
    }

    async function getAllColors(req, res) {
        const allColors = await shoesDB.getAllColor();
        res.json(allColors);
    }

    async function filterByColor(req, res) {
        const colour = req.params.color;
        let colors = await shoesDB.filterByColors(colour);
        res.json(colors)

    }

    async function getAllsize(req, res) {
        const allShoeSizes = await shoesDB.getAllSizes();
        res.json(allShoeSizes);
    }

    async function brand_and_size(req, res) {
        const size = req.params.size;
        const brand = req.params.brandname;
        const getBrandAndSize = await shoesDB.getBrandAndSize(size, brand);
        console.log(getBrandAndSize);
        res.json(getBrandAndSize);
    }

    async function update_stock(req, res) {
        const shoe_id = req.params.id;
        const stock = req.body.stock_number;
        await shoesDB.update(shoe_id, stock);
        res.end();
    }

    async function add(req, res) {
        const shoeDetails = {
            brand: req.body.brand,
            shoe_name: req.body.shoe_name,
            color: req.body.color,
            shoe_size: req.body.size,
            price: req.body.price,
            stock: req.body.quantity,
            img_url: req.body.img_url
        };

        await shoesDB.add_shoes(shoeDetails);
        res.end();
    }

    

    return {
        add,
        show,
        allSize,
        getBrand,
        brand_name,
        getAllsize,
        update_stock,
        getAllColors,
        filterByColor,
        brand_and_size,
    };
}
