export default function Router(shoesDB) {

    async function show(req, res) {
        let data = await shoesDB.all();
        // res.json{(data)}
        res.end;
    }

    async function brand_name(req, res) {
        let brand = req.params.brandname;
        let shoe_name = await shoesDB.shoe_name(brand);
        res.send(shoe_name);
        res.end;
    }

    async function allSize(req, res) {
        let size = req.params.size;
        console.log(size);
        let all_shoes = await shoesDB.allSizes(size);
        res.send(all_shoes)
        res.end;
    }


    async function brand_and_size(req, res) {
        let size = req.params.size;
        let brand = req.params.brand;

    }


    return {
        show,
        brand_name,
        allSize,
        brand_and_size,
    }
}