export default function Router(shoesDB) {

    async function show(req, res) {
        let data = await shoesDB.all();
        console.log(data, '------------------------------');
        res.json( data )
        //res.end;
    }

    async function brand_name(req, res) {
        let brand = req.params.brandname;
        let shoe_name = await shoesDB.shoe_name(brand);
        res.json(shoe_name);
        res.end;
    }

    async function allSize(req, res) {
        let size = req.params.size;
        let all_shoes = await shoesDB.allSizes(size);
        res.json(all_shoes)
        res.end;
    }


    async function brand_and_size(req, res) {
        let size = req.params.size;
        let brand = req.params.brand;
        let getBrandAndSize = await shoesDB.getBrandAndSize(size, brand)
        res.json({
            getBrandAndSize
        })
        res.end;
    }

    async function update_stock() {
        let shoe_id = req.params.id;
        let stock = req.body.stock_number;
        shoesDB.update(shoe_id, stock);
        res.end;

    }


    async function add() {
        let data = {
            brand: req.body.brand,
            sheo_name: req.body.shoe_name,
            color: req.body.color,
            shoe_size: req.body.size,
            price: req.body.price,
            stock: req.body.quantity,
            img_url: req.body.img_url
        }

       await shoesDB.add(data)
    }
    return {
        add,
        show,
        allSize,
        brand_name,
        update_stock,
        brand_and_size,
    }
}