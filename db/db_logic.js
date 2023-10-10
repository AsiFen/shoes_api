export default function ShoesDB(db) {
    async function all() {
        try {
            const results = await db.any('SELECT * FROM shoes');
            return results;
            console.log(results, "i");
        } catch (error) {
            return false
        }
    }
    return {
        all
    }
}